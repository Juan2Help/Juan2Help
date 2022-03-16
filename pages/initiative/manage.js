import Head from "next/head";
import { React } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import {
  InitiativeList,
  ModalToggle,
} from "../../components/manage/ManageComponents";
import Sidebar from "../../components/Sidebar";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

function manage() {
  const { data: session } = useSession();
  const [handledInitiatives, setHandledInitiatives] = useState([]);
  const [currentModal, setCurrentModal] = useState("");
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
    if (session) fetchData();
  }, session);

  const onClickHandler = (e) => {
    setCurrentModal(e.currentTarget.id);
  };

  return (
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
              onClickHandler={onClickHandler}
            />
            <div className="divider text-xs text-gray-400">END</div>
          </div>
        </div>
      </div>
      <Navbar />
      <ModalToggle />
    </div>
  );
}

export default manage;
