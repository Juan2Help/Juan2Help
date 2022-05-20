import Head from 'next/head';
import Link from 'next/link';
import { React, useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import {
  FiChevronLeft,
  FiEdit3,
  FiAtSign,
  FiMail,
  FiMapPin,
  FiPhone,
  FiCalendar,
} from 'react-icons/fi';
import { getSession } from 'next-auth/react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { GrantAccess, redirectToLogin } from '../../middleware/ProtectedRoute';
import { fetchUserDetails } from '../../middleware/helper';
import Image from 'next/image';
import { Initiative } from '../../components/explore/ExploreComponents';
import { fetchJSON } from '../../middleware/helper';
import Header from '../../components/Header';

const getInitiatives = async (type, session) => {
  const req = await fetch(`/api/initiatives/get-initiatives`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      page: 1,
      type: type,
      userId: session?.user?._id,
    }),
  });
  const data = await req.json();
  return data;
};

function Profile({ sessionFromProp, userDetails, bookmarkList }) {
  const session = sessionFromProp;
  const [isOpen, setOpenState] = useState(false);
  const [avatar, setAvatar] = useState(faker.image.avatar());
  const [activeInitiatives, setActiveInitiatives] = useState([]);

  const initializeData = async () => {
    setActiveInitiatives(await getInitiatives('3', session));
  };

  useEffect(() => {
    initializeData();
  }, []);

  return (
    <ProtectedRoute session={session}>
      <div className="flex flex-col min-h-screen justify-between overflow-clip">
        <div className="flex flex-col items-center">
          <Head>
            <title>Welcome Profile!</title>
          </Head>
          <Header session={session} />
          <div className="flex flex-col w-screen xl:max-w-7xl px-4 xl:px-8 gap-4">
            {/* User details */}
            <div className="w-full flex flex-row justify-center items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="rounded-full overflow-clip h-40 w-40">
                  <Image
                    alt="avatar"
                    src={avatar || '/images/avatar.png'}
                    className="min-h-full min-w-full"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="w-full p-2 flex-col text-center justify-center">
                  <div className="flex flex-row gap-2 relative">
                    <h2 className="font-bold text-3xl">{userDetails?.name}</h2>
                    <button
                      onClick={() => setOpenState(!isOpen)}
                      className="p-1 rounded-full bg-purple-100 text-primary"
                    >
                      <FiEdit3 />
                    </button>
                    {isOpen && (
                      <div className="absolute top-10 overflow-clip right-0 w-fit rounded-md shadow-lg bg-white divide-y divide-gray-100">
                        <Link href="/u/edit/profile" passHref>
                          <div className="flex py-2 px-4 hover:bg-purple-300 cursor-pointer">
                            <span className=" text-gray-700 text-sm text-left">
                              Edit Profile
                            </span>
                          </div>
                        </Link>
                        {/* <Link href="/settings">
                    <div className="flex py-2 px-4 hover:bg-purple-300 cursor-pointer">
                      <Link href="/u/edit/account">
                        <span className=" text-gray-700 text-sm text-left">
                          Edit Account
                        </span>
                      </Link>
                    </div>
                  </Link> */}
                      </div>
                    )}
                  </div>
                  <h3 className="text-gray-400 text-sm">
                    {'@' +
                      userDetails?.name.split(' ').join('').toLocaleLowerCase()}
                  </h3>
                  <h3 className="text-neutral text-sm p-2">
                    {userDetails?.bio || 'This user has no bio.'}
                  </h3>
                </div>
              </div>
              <div className="sm:flex hidden flex-col bg-white rounded-xl p-2 ">
                <ul>
                  <li className="text-neutral text-sm gap-3 flex flex-row items-center p-2">
                    <FiAtSign />
                    <span>
                      {userDetails?.name
                        .split(' ')
                        .join('')
                        .toLocaleLowerCase()}
                    </span>
                  </li>
                  <li className="text-neutral text-sm gap-3 flex flex-row items-center p-2">
                    <FiMail />
                    <span>{userDetails?.email}</span>
                  </li>
                  <li className="text-neutral text-sm gap-3 flex flex-row items-center p-2">
                    <FiMapPin />
                    <span>{userDetails?.location?.address}</span>
                  </li>
                  <li className="text-neutral text-sm gap-3 flex flex-row items-center p-2">
                    <FiPhone />
                    <span>{userDetails?.mobileNumber}</span>
                  </li>
                  <li className="text-neutral text-sm gap-3 flex flex-row items-center p-2">
                    <FiCalendar />
                    <span>{userDetails?.birthday}</span>
                  </li>
                </ul>
              </div>
            </div>
            <hr />
            {/* Active Initiatives */}
            <div className="grid min-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 justify-items-center">
              {activeInitiatives?.map((initiative) => (
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
    </ProtectedRoute>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userId = context.params.slug;
  console.log('userId', userId);

  if (!GrantAccess(context, session)) return redirectToLogin(context);

  return {
    props: {
      sessionFromProp: session,
      userDetails: await fetchUserDetails(userId[0]),
      bookmarkList: await fetchJSON(
        `${process.env.NEXTAUTH_URL}/api/user/list-bookmarks`,
        { id: session.user._id }
      ),
    },
  };
}

export default Profile;
