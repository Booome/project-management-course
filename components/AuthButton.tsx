import { User, UserX } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

export function AuthButton() {
  const { data: session } = useSession();

  console.log(session);

  return session?.user ? (
    <Button
      onClick={() => {
        signOut({
          redirect: false,
        });
        redirect(getCognitoLogoutUrl());
      }}
      variant="ghost"
      size="icon"
      className="[&_svg]:size-7"
    >
      <User />
    </Button>
  ) : (
    <Button
      onClick={() => signIn("cognito")}
      variant="ghost"
      size="icon"
      className="[&_svg]:size-7"
    >
      <UserX />
    </Button>
  );
}

function getCognitoLogoutUrl() {
  const logoutDestinationUrl = new URL(
    `${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/logout`,
  );

  logoutDestinationUrl.searchParams.set(
    "client_id",
    process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
  );
  logoutDestinationUrl.searchParams.set(
    "logout_uri",
    process.env.NEXT_PUBLIC_COGNITO_LOGOUT_URI!,
  );
  logoutDestinationUrl.searchParams.set(
    "redirect_uri",
    process.env.NEXT_PUBLIC_COGNITO_LOGOUT_REDIRECT_URI!,
  );

  return logoutDestinationUrl.toString();
}
