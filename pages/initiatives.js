import Head from "next/head";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getSession } from "next-auth/react";
import ProtectedRoute from "../components/ProtectedRoute";
import { GrantAccess, redirectToLogin } from "../middleware/ProtectedRoute";
import { Input, SearchBar } from "../components/Input";
import {
  Featured,
  Initiative,
  TopOrganizers,
} from "../components/explore/ExploreComponents";
import { FiFilter } from "react-icons/fi";
import { AiFillBackward, AiFillForward } from "react-icons/ai";
import { useState, useEffect } from "react";

function PageButton({ text, type, isGoogleSignIn, onClick, direction }) {
  return (
    <>
      <button
        type={type}
        className={`group relative w-1/8 flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-md my-2 ${
          "bg-primary text-white " +
          "hover:bg-primary hover:ring-2 hover:ring-offset-2 hover:ring-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        }`}
        onClick={onClick}
      >
        {direction === "-1" && <AiFillBackward />}
        {direction === "1" && <AiFillForward className="bottom-[0.5px]" />}
      </button>
    </>
  );
}

function InitiativesPage({ sessionFromProp, numberOfPages }) {
  const session = sessionFromProp;
  const [totalPages, setTotalPages] = useState(numberOfPages);
  const [currentPageActive, setCurrentPageActive] = useState(1);
  const [activeInitiatives, setActiveInitiatives] = useState([]);
  const [newInitiatives, setNewInitiatives] = useState([]);

  const loadNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const loadPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (session) {
      // send a post request to the server to get the new initiatives
      const getActiveInitiatives = async () => {
        const req = fetch("/api/initiatives/get-initiative", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: currentPageActive,
            type: "3",
          }),
        });
        const res = await req;
        const data = await res.json();
        setActiveInitiatives(data.initiatives);
      };
      getActiveInitiatives();
    }
  }, [currentPageActive]);

  print(activeInitiatives);

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
                  <span className="text-xl font-bold w-1/8 py-2">
                    {" "}
                    Active Initiatives{" "}
                  </span>
                  <div className="flex flex-row justify-between items-center space-x-3 w-2/5">
                    <SearchBar />
                    <FiFilter className="text-2xl hover:cursor-pointer hover:text-gray-500" />
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
              <div className="flex justify-between">
                <PageButton direction="-1" />
                <PageButton direction="1" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between w-full">
                  <span className="text-xl font-bold w-1/8 py-2">
                    Find New Initiatives
                  </span>
                  <div className="flex flex-row justify-between items-center space-x-3 w-2/5">
                    <SearchBar />
                    <FiFilter className="text-2xl hover:cursor-pointer hover:text-gray-500" />
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

  //grab total number of pages from /api/initiatives/get-initiatives
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/initiatives/get-initiatives`
  );
  const { pages } = await res.json();

  return {
    props: {
      sessionFromProp: session,
      numberOfPages: pages,
    },
  };
}

export default InitiativesPage;
