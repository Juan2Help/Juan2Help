import { useState } from "react";
import {
  getProviders,
  signIn as signIntoProviders,
  useSession,
  signOut,
} from "next-auth/react";
import Head from "next/head";
import Button from "../../components/Button";
import { Input } from "../../components/Input";
import ErrorMessage from "../../components/ErrorMessage";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

function Signin({ providers }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [errorState, setErrorState] = useState({
    error: false,
    message: "",
    errorType: "",
  });
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const { email, password } = userDetails;
  const { error, message, errorType } = errorState;

  const handleSubmit = async (e) => {
    e.preventDefault();

    //check if fields are empty
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // try to sign in
    try {
      const result = await signIntoProviders("credentials", {
        redirect: false,
        email: email,
        password: password,
        callbackUrl: "/explore",
      });

      if (result.error) {
        const errorResponse = JSON.parse(result.error);
        setErrorState({
          error: true,
          message: errorResponse.message,
          errorType: errorResponse.type,
        });
        return;
      }

      //if no error, redirect to home page
      router.push("/explore");
    } catch (err) {
      console.error("Error: ", err);
    }

    return;
  };

  const handleChange = (e) => {
    // Grab values from form and create local state
    const { name, value } = e.target;

    setUserDetails({ ...userDetails, [name]: value });

    // checks if current field has error, if so, remove error
    if (errorType === name) {
      setErrorState({
        error: false,
        message: "",
        errorType: "",
      });
    }
  };

  console.log(providers);

  if (session) {
    return (
      <>
        <Head>
          <title>Welcome back {session.user.name}!</title>
        </Head>
        <div className="min-h-screen flex items-center justify-center text-neutral bg-white">
          <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>You are already signed in as {session.user.name}!</div>
              <Button text="Signout" onClick={() => signOut()} />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center text-neutral bg-white">
        <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-6">
            <div className="flex flex-col items-center">
              <Image
                className="mx-auto"
                src="/icon.png"
                alt="Juan2Help"
                height={100}
                width={100}
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <form
              className="mt-8 space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md space-y-4">
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  onChange={handleChange}
                  hasError={errorType === "email"}
                />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                  onChange={handleChange}
                  hasError={errorType === "password"}
                />
                <ErrorMessage
                  text={error ? "Error: " + message : ""}
                  isInformation={error}
                  hasError={error}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="accent-primary h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    {" "}
                    Remember me{" "}
                  </label>
                </div>

                <div className="text-sm font-medium text-primary hover:text-primary">
                  <Link href="/auth/forgot-password">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <Button type="submit" text="Log In" />
                <div className="divider text-gray-300 text-xs">OR</div>
                <Button
                  type="button"
                  text="Sign in with Google"
                  isGoogleSignIn={true}
                  onClick={() =>
                    signIntoProviders(providers.google.id, {
                      callbackUrl: "/explore",
                    })
                  }
                />
              </div>
            </form>
            <div className="w-full text-sm font-medium text-gray-400 text-center">
              Don&apos;t have an account?{` `}
              <span className="font-semibold text-primary hover:text-primary">
                <Link href="/auth/signup">Sign Up</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default Signin;
