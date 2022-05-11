import { React } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { getSession } from 'next-auth/react';
import ProtectedRoute from '../components/ProtectedRoute';
import { GrantAccess, redirectToLogin } from '../middleware/ProtectedRoute';
import Suggestions from '../components/feed/Suggestions';
import faker from '@faker-js/faker';
import moment from 'moment';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

function Notification() {
  const time = moment(faker.time.recent(10, '12:00'));
  const parsedTime =
    time.startOf('hour').fromNow()[0] != 'i'
      ? time.startOf('hour').fromNow()
      : time.endOf('day').fromNow();
  const fake = {
    notification: {
      name: faker.name.firstName(),
      message: faker.lorem.sentence(),
      time: parsedTime,
      avatar: faker.image.avatar(),
      href: faker.internet.domainName(),
      id: faker.datatype.uuid(),
    },
  };
  return (
    <>
      <Link href={fake.notification.href}>
        <div className="flex flex-row gap-3">
          <img
            src={fake.notification.avatar}
            alt="avatar"
            className="rounded-full w-12 h-12"
            object-fit="cover"
          />
          <div className="flex flex-col">
            <div>
              <span className="font-bold">{fake.notification.name}</span>{' '}
              <span className="text-sm">{fake.notification.message}</span>
            </div>
            <div>
              <span className="text-gray-500 text-xs font-bold">
                {fake.notification.time}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <hr />
    </>
  );
}

function notifications({ sessionFromProp }) {
  const session = sessionFromProp;

  return (
    <ProtectedRoute session={session}>
      <div className="bg-base-100 min-h-screen flex flex-col items-center justify-between text-neutral overflow-clip">
        <div className="flex flex-col items-center">
          <Head>
            <title>Welcome Explore!</title>
          </Head>
          <div className="sm:block hidden">
            <Header session={session} />
          </div>
          <div className="flex flex-row w-screen xl:max-w-7xl p-4 xl:px-8">
            <Sidebar active="feed" />
            <div className="relative w-full sm:w-sm md:w-xl lg:w-2xl xl:w-3/5 flex flex-col space-y-5">
              <div className="font-bold text-xl flex gap-4 items-center">
                <FiArrowLeft /> <div>Notifications</div>
              </div>
              <hr />
              <Notification />
              <Notification />
              <Notification />
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
