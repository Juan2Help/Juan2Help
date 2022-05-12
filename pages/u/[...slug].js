import Head from "next/head";
import Link from "next/link";
import { React, useState } from "react";
import { faker } from "@faker-js/faker";
import {
  FiChevronLeft,
  FiMoreVertical,
  FiAtSign,
  FiMail,
  FiMapPin,
  FiPhone,
  FiCalendar,
} from "react-icons/fi";
import { getSession } from "next-auth/react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { GrantAccess, redirectToLogin } from "../../middleware/ProtectedRoute";
import { fetchUserDetails } from "../../middleware/helper";

function profile({ sessionFromProp, userDetails }) {
  const session = sessionFromProp;
  const [isOpen, setOpenState] = useState(false);

  return (
    <ProtectedRoute session={session}>
      <div className="flex flex-col min-h-screen justify-between overflow-clip">
        <div className="flex flex-col items-center">
          <Head>
            <title>Welcome Profile!</title>
          </Head>
          <div className="flex flex-col w-screen xl:max-w-7xl px-4 xl:px-8">
            <div className="relative w-full py-4 flex flex-row justify-between text-lg">
              <Link href={`/explore`}>
                <div className="p-1 rounded-full bg-purple-100 text-primary cursor-pointer">
                  <FiChevronLeft />
                </div>
              </Link>
              <button
                onClick={() => setOpenState(!isOpen)}
                className="p-1 rounded-full bg-purple-100 text-primary"
              >
                <FiMoreVertical />
              </button>
              {isOpen && (
                <div class="absolute top-12 overflow-clip right-0 w-fit rounded-md shadow-lg bg-white divide-y divide-gray-100">
                  <Link href="/u/edit/profile">
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
            <div className="w-full flex flex-col justify-center items-center gap-4">
              <div className="rounded-full overflow-clip h-40 w-40">
                <img
                  src={faker.image.avatar()}
                  className="min-h-full min-w-full"
                />
              </div>
              <div className="w-full p-2 flex flex-col text-center justify-center">
                <h2 className="font-bold text-3xl">{userDetails?.name}</h2>
                <h3 className="text-gray-400 text-sm">
                  {"@" +
                    userDetails?.name.split(" ").join("").toLocaleLowerCase()}
                </h3>
                <h3 className="text-neutral text-sm p-2">
                  {userDetails?.bio || "This user has no bio."}
                </h3>
                <hr className="mt-2" />
              </div>
              <div className="flex flex-col bg-white rounded-xl p-2">
                <ul>
                  <li className="text-neutral text-sm gap-3 flex flex-row items-center p-2">
                    <FiAtSign />
                    <span>
                      {userDetails?.name
                        .split(" ")
                        .join("")
                        .toLocaleLowerCase()}
                    </span>
                  </li>
                  <li className="text-neutral text-sm gap-3 flex flex-row items-center p-2">
                    <FiMail />
                    <span>{userDetails?.email}</span>
                  </li>
                  <li className="text-neutral text-sm gap-3 flex flex-row items-center p-2">
                    <FiMapPin />
                    <span>{userDetails?.location}</span>
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
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userId = context.params.slug;
  console.log("userId", userId);

  if (!GrantAccess(context, session)) return redirectToLogin(context);

  return {
    props: {
      sessionFromProp: session,
      userDetails: await fetchUserDetails(userId[0]),
    },
  };
}

export default profile;
