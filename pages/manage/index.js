import Head from "next/head";
import { React } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import {
  InitiativeList,
  ModeratorList,
  InitiativeModal,
  ModeratorModal,
} from "../../components/manage/ManageComponents";
import Sidebar from "../../components/Sidebar";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProtectedRoute from "../../components/ProtectedRoute";

function index() {
  const { data: session } = useSession();
  const [handledInitiatives, setHandledInitiatives] = useState([]);
  const [handledModerators, setHandledModerators] = useState([]);
  const [selectedInitiative, setSelectedInitiative] = useState("");
  const [selectedModerator, setSelectedModerator] = useState("");
  const [newData, setNewData] = useState(false);

  const router = useRouter();

  // DATA FETCHING
  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch("/api/handled-initiatives", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
        }),
      });
      const fetchedInitiatives = await req.json();
      setHandledInitiatives(fetchedInitiatives);
    };
    console.log(session);
    if (session?.user?.role >= 2) fetchData();

    // log fetchedInitiatives
    console.log(handledInitiatives);
  }, [session, newData]);

  //fetch data for moderator list
  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch("/api/organizations/moderator-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          NGOid: session.user.NGOid,
          email: session.user.email,
        }),
      });
      const fetchedModerators = await req.json();
      setHandledModerators(fetchedModerators);
      console.log("FETCHED MODS:", fetchedModerators);
    };

    if (session?.user?.role >= 2) fetchData();
    // log fetchedModerators
    console.log(handledModerators);
  }, [session, newData]);

  // END OF DATA FETCHING

  // HANDLER FUNCTIONS
  const onClickInitiativeHandler = (e) => {
    setSelectedInitiative(e.currentTarget.id);
    console.log(e.currentTarget.id);
    console.log(selectedInitiative);
  };

  const onClickModeratorHandler = (e) => {
    setSelectedModerator(e.currentTarget.id);
  };

  const editInitiativeHandler = (e) => {
    router.push(`/manage/initiative/edit/${selectedInitiative}`);
  };

  const deleteInitiativeHandler = async (e) => {
    try {
      const req = await fetch("/api/delete-initiative", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          id: selectedInitiative,
        }),
      });
      const body = await req.json();
      setNewData(true);
    } catch (error) {
      console.log(error);
    }
  };

  const editModeratorHandler = (e) => {
    router.push(`/manage/moderator/edit/${selectedModerator}`);
  };

  const deleteModeratorHandler = async (e) => {
    try {
      const req = await fetch("/api/organizations/delete-moderator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          id: selectedModerator,
          NGOid: session.user.NGOid,
        }),
      });
      const body = await req.json();
      setNewData(true);
    } catch (error) {
      console.log(error);
    }
  };

  // END OF HANDLER FUNCTIONS

  return (
    <ProtectedRoute session={session} authority={2}>
      <div className="flex flex-col min-h-screen justify-between overflow-clip">
        <div className="flex flex-col items-center">
          <Head>
            <title>Manage Initiatives</title>
          </Head>
          <Header />
          <div className="flex flex-row w-screen xl:max-w-7xl px-4 xl:px-8">
            <Sidebar active="explore" />
            <div className="relative w-full sm:w-sm md:w-xl lg:w-2xl xl:w-10/12 flex flex-col space-y-6">
              <span className="text-lg font-bold">Active Initiatives</span>
              <InitiativeList
                initiatives={handledInitiatives}
                onClickHandler={onClickInitiativeHandler}
              />
              <div className="divider text-xs text-gray-400">END</div>
              {session?.user?.role >= 4 && (
                <>
                  <div className="fle xlfex-col space-y-2">
                    <span className="text-lg font-bold">Moderator List</span>
                    <ModeratorList
                      onClickHandler={onClickModeratorHandler}
                      moderators={handledModerators}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <Navbar />
        <InitiativeModal
          editHandler={editInitiativeHandler}
          deleteHandler={deleteInitiativeHandler}
        />
        <ModeratorModal
          editHandler={editModeratorHandler}
          deleteHandler={deleteModeratorHandler}
        />
      </div>
    </ProtectedRoute>
  );
}

export default index;
