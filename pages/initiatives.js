import Head from "next/head";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getSession } from "next-auth/react";
import ProtectedRoute from "../components/ProtectedRoute";
import { GrantAccess, redirectToLogin } from "../middleware/ProtectedRoute";
import { SearchBar } from "../components/Input";
import { Featured, Initiative } from "../components/explore/ExploreComponents";
import { FiFilter } from "react-icons/fi";
import { GoPlus, GoCheck } from "react-icons/go";
import { useState } from "react";

function InitiativesPage({ sessionFromProp }) {
  const session = sessionFromProp;
  const [OnActive, setOpenState] = useState(false);
  return (
    <ProtectedRoute session={session}>
      <div className="bg-base-100 min-h-screen flex flex-col items-center justify-between text-neutral overflow-clip">
        <div className="flex flex-col items-center">
          <Head>
            <title>Search Initiatives</title>
          </Head>
          <Header session={session} />
          <div className="flex flex-row w-screen xl:max-w-7xl px-4 xl:px-8">
            <Sidebar active="initiatives" />
            <div className="w-full sm:w-sm md:w-xl lg:w-2xl xl:w-10/12 flex flex-col space-y-6">
                <Featured />
                <div className = "flex flex-row w-full h-14 font-semibold items-center" >
                  <button class = "flex items-center justify-center w-1/2 h-full border-b-2  border-gray-300 hover:bg-gray-200 rounded-tl-lg cursor-pointer  hover:border-gray-400 active:border-violet-700 active:border-b-4 active:text-violet-700 active"  onClick={() => setOpenState(!OnActive)}>
                    <div className = "flex flex-row items-center space-x-2 ">
                      <GoCheck />
                      <span>Active Initiatives</span>
                    </div>
                  </button>
                  <button class = "flex items-center justify-center w-1/2 h-full border-b-2 border-gray-300 hover:bg-gray-200 rounded-tl-lg cursor-pointer hover:border-gray-400 active:border-violet-700 active:border-b-4 active:text-violet-700"  onClick={() => setOpenState(!OnActive)}>
                    <div className = "flex flex-row items-center space-x-2">
                      <GoPlus/>
                      <span>Find Initiatives</span>
                    </div>
                  </button >
                </div>
                {/*Search bar and filter*/}
                <div className="flex justify-between w-full">
                    <div className="flex flex-row w-full justify-between items-center space-x-3">
                      <SearchBar />
                      <FiFilter className="text-2xl hover:cursor-pointer hover:text-gray-500"/>
                    </div>
                </div>
                {OnActive && (
                  <>
                    <span className="text-xl font-bold text-center"> Active Initiatives </span>
                    <hr />
                    <div className="grid min-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 justify-items-center">
                        <Initiative />
                        <Initiative />
                        <Initiative />
                        <Initiative />
                        <Initiative />
                        <Initiative />
                    </div>
                  </>
                )}
                {!OnActive && (
                  <>
                    <span className="text-xl font-bold text-center"> Find Initiatives </span>
                    <hr />
                    <div className="grid min-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 justify-items-center">
                        <Initiative />
                        <Initiative />
                        <Initiative />
                        <Initiative />
                        <Initiative />
                        <Initiative />
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
      <Navbar active="initiatives" />
    </ProtectedRoute>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!GrantAccess(context, session)) return redirectToLogin(context);
  return {
    props: {
      sessionFromProp: session,
    },
  };
}

export default InitiativesPage;
