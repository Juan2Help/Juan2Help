import Head from 'next/head';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Post from '../components/feed/Post';
import Sidebar from '../components/Sidebar';
import Suggestions from '../components/feed/Suggestions';
import ProtectedRoute from '../components/ProtectedRoute';
import { getSession, useSession } from 'next-auth/react';
import { GrantAccess, redirectToLogin } from '../middleware/ProtectedRoute';
import { FiSend } from 'react-icons/fi';

function PostInput({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="w-full min-h-full py-10 active:border-none ">
        <div className="flex flex-row space-y-2">
          <input
            className="w-full border-2 border-gray-200 rounded-lg p-2"
            placeholder="What's on your mind?"
          />
          {/* POST Button */}
          <div className="flex flex-row justify-end">
            <button className="cursor-pointer text-l px-5">
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function MyFeed() {
  return (
    <div className="w-full min-h-screen flex justify-center pb-4">
      <div className="w-full min-h-full md:px-6 lg:px-0">
        <div className="w-full">
          <PostInput />
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

function Feed({ sessionFromProp, socket }) {
  const session = sessionFromProp;

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-between text-neutral overflow-clip">
        <Head>
          <title>Welcome Home!</title>
        </Head>
        <Header session={session} socket={socket} />
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
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
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
