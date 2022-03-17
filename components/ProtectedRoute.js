import React from "react";
import { signIn } from "next-auth/react";
import Button from "./Button";

function ProtectedRoute({ children, session, authority = 1, router }) {
  const goBack = () => {
    router.push("/explore");
  };

  if (session?.user?.role < authority) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>"You have no permission to perform the action."</div>
              <Button text={"Go back"} onClick={() => goBack()} />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {session ? (
        children
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>"You are not signed in."</div>
              <Button text={"Sign In"} onClick={() => signIn()} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProtectedRoute;
