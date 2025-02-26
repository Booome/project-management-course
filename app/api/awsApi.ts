import {
  CognitoIdentityClient,
  GetCredentialsForIdentityCommand,
  GetIdCommand,
} from "@aws-sdk/client-cognito-identity";
import { Signer } from "@aws-sdk/rds-signer";
import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function createPrismaClient(request: NextRequest) {
  let token = await getToken({ req: request });

  const cognitoClient = new CognitoIdentityClient({
    region: process.env.AWS_REGION,
  });
  const identityPoolId = process.env.COGNITO_IDENTITY_POOL_ID!;
  const identityProvider = process.env.COGNITO_IDENTITY_PROVIDER!;
  const logins = {
    [identityProvider]: token?.id_token as string,
  };

  // const credentials: CognitoIdentityCredentials = await fromCognitoIdentityPool(
  //   {
  //     client: cognitoClient,
  //     identityPoolId,
  //     logins,
  //   },
  // )();

  const getIdCommand = new GetIdCommand({
    IdentityPoolId: identityPoolId,
    Logins: logins,
  });
  const { IdentityId: identityId } = await cognitoClient.send(getIdCommand);

  const getCredentialsCommand = new GetCredentialsForIdentityCommand({
    IdentityId: identityId,
    Logins: logins,
  });
  const { Credentials: credentials } = await cognitoClient.send(
    getCredentialsCommand,
  );
  if (!credentials) {
    throw new Error("No credentials found");
  }

  const databaseEndpoint = process.env.DATABASE_ENDPOINT!;
  const databasePort = parseInt(process.env.DATABASE_PORT!);

  const signer = new Signer({
    region: process.env.AWS_REGION,
    hostname: databaseEndpoint,
    port: databasePort,
    username: process.env.DATABASE_IAM_USER!,
    credentials: {
      accessKeyId: credentials!.AccessKeyId!,
      secretAccessKey: credentials!.SecretKey!,
      sessionToken: credentials!.SessionToken!,
    },
  });
  const authToken = await signer.getAuthToken();
  const iamUser = process.env.DATABASE_IAM_USER!;
  const databaseName = process.env.DATABASE_NAME!;

  const databaseUrl = `postgresql://${iamUser}:${encodeURIComponent(authToken)}@${databaseEndpoint}:${databasePort}/${databaseName}?schema=public`;

  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });
}
