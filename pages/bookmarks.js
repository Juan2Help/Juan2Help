import Head from "next/head";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getSession } from "next-auth/react";
import ProtectedRoute from "../components/ProtectedRoute";
import { GrantAccess, redirectToLogin } from "../middleware/ProtectedRoute";
import { Initiative } from "../components/explore/ExploreComponents";
import Image from "next/image";
function PlaceHolderInitiative() {
  return (
    <div className="flex flex-col items-center rounded-xl bg-gray-200 w-72 h-80 overflow-hidden flex-none hover:ring-2 hover:ring-offset-2 hover:ring-purple-600">
      <div className="h-36 w-full sm:w-96 bg-slate-500 relative cursor-pointer ">
        <Image
          src="https://i.pinimg.com/originals/bb/03/86/bb0386babaccc66c484292d2c50973a8.png"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <span>This is a test</span>
    </div>
  );
}
function Bookmarks({ sessionFromProp, socket }) {
  const session = sessionFromProp;

  return (
    <ProtectedRoute session={session}>
      <div className="bg-base-100 min-h-screen flex flex-col items-center justify-between text-neutral overflow-clip">
        <div className="flex flex-col items-center">
          <Head>
            <title>Bookmarked Initiatives</title>
          </Head>
          <Header session={session} socket={socket} />
          <div className="flex flex-row w-screen xl:max-w-7xl px-4 xl:px-8">
            <Sidebar active="bookmarks" />
            <div className="flex flex-row w-full items-center space-x-4 p-2">
              <div className="grid min-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 justify-items-center">
                <PlaceHolderInitiative/>
                <PlaceHolderInitiative/>
                <PlaceHolderInitiative/>
                <PlaceHolderInitiative/>
                <PlaceHolderInitiative/>
                <PlaceHolderInitiative/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navbar active="bookmarks" />
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

export default Bookmarks;
