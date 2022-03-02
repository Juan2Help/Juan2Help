import { useState } from "react";
import {
  getProviders,
  signIn as signIntoProviders,
  useSession,
  signOut,
} from "next-auth/react";
import Head from "next/head";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ErrorMessage from "../../components/ErrorMessage";
import Link from "next/link";

function signin({ providers }) {
  //get session
  const { data: session } = useSession();
  const [errorState, setErrorState] = useState({ error: false, message: "" });
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const { email, password } = userDetails;
  const { error, message } = errorState;

  console.log("providers", providers);
  console.log("session", session);

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
      });

      console.log("result", result);
      if (result.error) {
        setErrorState({ error: true, message: result.error });
      }
    } catch (err) {
      console.error("Error: ", err);
    }

    return;
  };

  const handleChange = (e) => {
    // Grab values from form and create local state
    const { name, value } = e.target;

    setUserDetails({ ...userDetails, [name]: value });
    console.log(name, value);
    console.log("userDetails", userDetails);
  };

  if (session) {
    return (
      <>
        <Head>
          <title>Welcome back {session.user.name}!</title>
        </Head>
        <div className="min-h-screen flex items-center justify-center">
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-6">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
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
                />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                  onChange={handleChange}
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
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    {" "}
                    Remember me{" "}
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {" "}
                    Forgot your password?{" "}
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <Button type="submit" text="Log In" />
                <div className="w-full text-xs text-gray-400 font-medium text-center mt-0">
                  - OR -
                </div>
                <Button
                  type="button"
                  text="Sign in with Google"
                  isGoogleSignIn={true}
                  onClick={() => signIntoProviders(providers.google.id)}
                />
              </div>
            </form>
            <div className="w-full text-sm font-medium text-gray-400 text-center">
              Don't have an account?{" "}
              <span className="font-semibold text-indigo-600 hover:text-indigo-500">
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

export default signin;
