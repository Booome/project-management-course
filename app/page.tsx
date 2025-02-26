"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Page() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center">
      <h1 className="mb-4 text-2xl font-bold">Login to continue</h1>
      <Button className="uppercase" onClick={() => signIn("cognito")}>
        Login
      </Button>
    </div>
  );
}
