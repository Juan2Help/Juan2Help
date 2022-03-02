import React from "react";
import Head from "next/head";
import { useSession, signOut, signIn } from "next-auth/react";
import Button from "../components/Button";

function index() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Welcome back {session?.user?.name}!</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center">
        <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              {session
                ? `You are signed in as ${session.user.name}`
                : "You are not signed in"}
            </div>
            <Button
              text={session ? "Sign Out" : "Sign In"}
              onClick={session ? () => signOut() : () => signIn()}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
