import { React } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { getSession } from 'next-auth/react';
import ProtectedRoute from '../components/ProtectedRoute';
import { GrantAccess, redirectToLogin } from '../middleware/ProtectedRoute';
import Suggestions from '../components/feed/Suggestions';
import { FiArrowLeft } from 'react-icons/fi';
import { NotificationList } from '../components/Notifications';

function notifications({ sessionFromProp }) {
  const session = sessionFromProp;

  return (
    <ProtectedRoute session={session}>
      <div className="bg-base-100 min-h-screen flex flex-col items-center justify-between text-neutral overflow-clip">
        <div className="flex flex-col items-center">
          <Head>
            <title>Notifications</title>
          </Head>
          <div className="sm:block hidden">
            <Header session={session} />
          </div>
          <div className="flex flex-row w-screen xl:max-w-7xl p-4 xl:px-8 gap-4">
            <Sidebar />
            <div className="relative w-full sm:w-sm md:w-xl lg:w-2xl xl:w-3/5 flex flex-col gap-5">
              <div className="font-bold text-xl flex gap-4 items-center">
                <div className="sm:hidden block">
                  <FiArrowLeft />
                </div>
                <div>Notifications</div>
              </div>
              <hr />
              <NotificationList session={session} />
            </div>
            <div className="sticky top-[72px] h-fit hidden xl:flex xl:w-2/5">
              <Suggestions />
            </div>
          </div>
        </div>
      </div>
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

export default notifications;
