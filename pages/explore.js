import Head from "next/head";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Causes from "../components/Causes";
import { Featured, Initiatives } from "../components/explore/ExploreComponents";
import { useSession } from "next-auth/react";
import ProtectedRoute from "../components/ProtectedRoute";

function Explore() {
  const { data: session } = useSession();
  return (
    <ProtectedRoute session={session}>
      <div className="bg-base-100 min-h-screen flex flex-col items-center justify-between text-neutral">
        <div className="flex flex-col items-center">
          <Head>
            <title>Welcome Explore!</title>
          </Head>
          <Header />
          <div className="flex flex-row xl:max-w-screen-xl">
            <Sidebar active="explore" />
            <div className="w-screen sm:w-sm md:w-xl lg:w-2xl xl:w-10/12 px-4 xl:px-0 flex flex-col space-y-6">
              <Featured />
              <Causes />
              <Initiatives />
            </div>
          </div>
        </div>
        <Navbar active="explore" />
      </div>
    </ProtectedRoute>
  );
}

export default Explore;
