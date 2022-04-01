import Head from "next/head";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Post from "../components/feed/Post";
import Sidebar from "../components/Sidebar";
import Suggestions from "../components/feed/Suggestions";
import ProtectedRoute from "../components/ProtectedRoute";
import { getSession, useSession } from "next-auth/react";
import { GrantAccess, redirectToLogin } from "../middleware/ProtectedRoute";

function MyFeed() {
  return (
    <div className="w-full min-h-screen flex justify-center pb-4">
      <div className="w-full min-h-full md:px-6 lg:px-0">
        <div className="w-full">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </div>
  );
}

function Feed({ sessionFromProp }) {
  const session = sessionFromProp;

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-between text-neutral overflow-clip">
        <Head>
          <title>Welcome Home!</title>
        </Head>
        <Header session={session} />
        <div className="flex flex-row w-screen xl:max-w-7xl px-4 xl:px-8">
          <Sidebar active="feed" />
          <div className="relative w-full sm:w-sm md:w-xl lg:w-2xl xl:w-3/5 flex flex-col space-y-6">
            <MyFeed />
          </div>
          <div className="sticky top-[72px] h-fit hidden xl:flex xl:w-2/5">
            <Suggestions />
          </div>
        </div>
        <Navbar active="feed" />
        <input type="checkbox" id="my-modal-4" class="modal-toggle" />
      </div>
    </>
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

export default Feed;
