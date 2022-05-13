import Head from "next/head";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getSession } from "next-auth/react";
import ProtectedRoute from "../components/ProtectedRoute";
import { GrantAccess, redirectToLogin } from "../middleware/ProtectedRoute";
import { Initiative } from "../components/explore/ExploreComponents";
import { fetchJSON } from "../middleware/helper";

function Bookmarks({ sessionFromProp, socket, bookmarks, bookmarkList }) {
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
                {bookmarks?.map((initiative) => (
                  <Initiative
                    key={initiative.id}
                    initiativeData={initiative}
                    bookmarkList={bookmarkList}
                  />
                ))}
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
      bookmarks: await fetchJSON(
        `${process.env.NEXTAUTH_URL}/api/user/get-bookmarks`,
        { id: session.user._id }
      ),
      bookmarkList: await fetchJSON(
        `${process.env.NEXTAUTH_URL}/api/user/list-bookmarks`,
        { id: session.user._id }
      ),
    },
  };
}

export default Bookmarks;
