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
import { useState, useEffect } from "react";

function InitiativesPage({
  sessionFromProp,
  newInitiativeData,
  activeInitiativeData,
}) {
  const session = sessionFromProp;
  const [Tab, setTab] = useState(0);

  const [activeInitiatives, setActiveInitiatives] =
    useState(activeInitiativeData);
  const [newInitiatives, setNewInitiatives] = useState(newInitiativeData);

  const handleSearchBarChange = (e) => {
    const { value } = e.target;
    value = value.toLowerCase();
    if (value.length > 0) {
      setActiveInitiatives(
        activeInitiativeData.filter(
          (initiative) =>
            initiative.title.toLowerCase().includes(value) ||
            initiative.causeType.toLowerCase().includes(value) ||
            initiative.location.toLowerCase().includes(value)
        )
      );
      setNewInitiatives(
        newInitiativeData.filter(
          (initiative) =>
            initiative.title.toLowerCase().includes(value) ||
            initiative.causeType.toLowerCase().includes(value) ||
            initiative.location.toLowerCase().includes(value)
        )
      );
    } else {
      setActiveInitiatives(activeInitiativeData);
      setNewInitiatives(newInitiativeData);
    }
  };

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
              <div className="flex flex-row w-full h-14 items-center">
                <button
                  class={
                    Tab
                      ? "flex items-center font-semibold justify-center w-1/2 h-full cursor-pointer rounded-tl-lg hover:bg-gray-200 hover:border-gray-400  text-black border-b-2  border-gray-300"
                      : " flex items-center justify-center font-semibold w-1/2 h-full cursor-pointer rounded-tl-lg hover:bg-gray-200 hover:border-gray-400 border-violet-700 border-b-4 text-violet-700"
                  }
                  onClick={() => setTab(0)}
                >
                  <div className="flex flex-row items-center space-x-2 ">
                    <GoCheck />
                    <span>Active Initiatives</span>
                  </div>
                </button>
                <button
                  class={
                    !Tab
                      ? "flex items-center font-semibold justify-center w-1/2 h-full cursor-pointer rounded-tl-lg hover:bg-gray-200 hover:border-gray-400  text-black border-b-2  border-gray-300"
                      : " flex items-center justify-center font-semibold w-1/2 h-full cursor-pointer rounded-tl-lg hover:bg-gray-200 hover:border-gray-400 border-violet-700 border-b-4 text-violet-700"
                  }
                  onClick={() => setTab(1)}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <GoPlus />
                    <span>Join New Initiatives</span>
                  </div>
                </button>
              </div>
              {/*Search bar and filter*/}
              <div className="flex justify-between w-full">
                <div className="flex flex-row w-full justify-between items-center space-x-3">
                  <SearchBar handleChange={handleSearchBarChange} />
                  <FiFilter className="text-2xl hover:cursor-pointer hover:text-gray-500" />
                </div>
              </div>
              {Tab == 0 && (
                <>
                  <div className="grid min-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 justify-items-center">
                    {activeInitiatives.map((initiative) => (
                      <Initiative
                        key={initiative.id}
                        initiativeData={initiative}
                      />
                    ))}
                  </div>
                </>
              )}
              {Tab == 1 && (
                <>
                  <div className="grid min-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 justify-items-center">
                    {newInitiatives.map((initiative) => (
                      <Initiative
                        key={initiative.id}
                        initiativeData={initiative}
                      />
                    ))}
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

  //grab total number of pages from /api/initiatives/get-initiatives
  const getInitiatives = async (type) => {
    const req = await fetch(
      `${process.env.NEXTAUTH_URL}/api/initiatives/get-initiatives`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: 1,
          type: type,
          userId: session?.user?._id,
        }),
      }
    );
    const data = await req.json();
    return data;
  };

  return {
    props: {
      sessionFromProp: session,
      newInitiativeData: await getInitiatives("1"),
      activeInitiativeData: await getInitiatives("3"),
    },
  };
}

export default InitiativesPage;
