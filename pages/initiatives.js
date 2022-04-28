import Head from "next/head";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getSession } from "next-auth/react";
import ProtectedRoute from "../components/ProtectedRoute";
import { GrantAccess, redirectToLogin } from "../middleware/ProtectedRoute";
import { Input, SearchBar} from "../components/Input";
import {Featured, Initiative, TopOrganizers} from "../components/explore/ExploreComponents";
import {FiFilter} from "react-icons/fi";
function InitiativesPage({ sessionFromProp }) {
  const session = sessionFromProp;
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
                <div className="space-y-2">
                    <div className="flex justify-between w-full">
                        <span className="text-xl font-bold w-1/8 py-2"> Active Initiatives </span>
                        <div className="flex flex-row justify-between items-center space-x-3 w-2/5">
                          <SearchBar />
                          <FiFilter className="text-2xl hover:cursor-pointer hover:text-gray-500"/>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="grid min-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 justify-items-center">
                    <Initiative />
                    <Initiative />
                    <Initiative />
                    <Initiative />
                    <Initiative />
                    <Initiative />
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between w-full">
                        <span className="text-xl font-bold w-1/8 py-2">Find New Initiatives</span>
                        <div className="flex flex-row justify-between items-center space-x-3 w-2/5">
                          <SearchBar />
                          <FiFilter className="text-2xl hover:cursor-pointer hover:text-gray-500"/>
                        </div>
                      </div>
                    <hr />
                </div>
                <div className="grid min-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 justify-items-center">
                    <Initiative />
                    <Initiative />
                    <Initiative />
                    <Initiative />
                    <Initiative />
                    <Initiative />
                </div>
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
