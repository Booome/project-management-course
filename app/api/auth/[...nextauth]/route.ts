import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
  InitiateAuthResponse,
} from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
import NextAuth, { AuthOptions } from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";

const authOptions: AuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID!,
      clientSecret: process.env.COGNITO_CLIENT_SECRET!,
      issuer: process.env.COGNITO_ISSUER!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      const now = Math.ceil(Date.now() / 1000);

      if (account) {
        token = {
          ...token,
          id_token: account.id_token,
          account_expires_at: account.expires_at,
          refresh_token: account.refresh_token,
        };
      }

      if (
        token.account_expires_at &&
        now >= (token.account_expires_at as number)
      ) {
        console.log("Refreshing token: ", token);
        const refreshToken = await refreshCognitoToken(
          token.refresh_token as string,
        );
        if (!refreshToken) {
          throw new Error("Failed to refresh token");
        }
        console.log("Refreshed token:", refreshToken);
        token = {
          ...token,
          id_token: refreshToken.IdToken,
          account_expires_at: refreshToken.ExpiresIn,
          refresh_token: refreshToken.RefreshToken,
        };
        console.log("Refreshed token:", token);
      }

      return token;
    },
  },
};

async function refreshCognitoToken(refreshToken: string) {
  const params: InitiateAuthCommandInput = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthFlow: "REFRESH_TOKEN_AUTH",
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
      SECRET_HASH: process.env.SECRET_HASH!,
    },
  };
  const initiateAuthCommand = new InitiateAuthCommand(params);
  const client = new CognitoIdentityProviderClient({
    region: process.env.AWS_REGION,
  });
  const response: InitiateAuthResponse = await client.send(initiateAuthCommand);

  return response.AuthenticationResult;
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
