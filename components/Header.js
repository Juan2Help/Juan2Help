import Link from "next/link";
import React, { useState } from "react";
import { FiBell, FiMessageCircle } from "react-icons/fi";
import { MdManageSearch } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { GoSignOut } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { faker } from "@faker-js/faker";
import { useEffect } from "react";
import { Notification } from "./Notifications";
import { useRecoilState } from "recoil";
import { notificationsState } from "../atoms/notificationsAtom";
import { fetchJSON } from "../middleware/helper";

function Header({ session, socket }) {
  const [hasMessage, setHasMessage] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [notifications, setNotifications] = useRecoilState(notificationsState);

  const getNotification = async () => {
    const data = await fetchJSON("/api/user/get-notifications", {
      id: session.user._id,
    });

    if (data.length > 0) {
      setNotifications(data);
    }
  };

  const handleNotificationClick = async () => {
    if (hasNotification) {
      setHasNotification(false);
      await getNotification();
    }
  };

  useEffect(() => {
    if (notifications.length === 0) {
      getNotification();
    }
  }, []);

  useEffect(() => {
    socket?.emit("newUser", {
      userID: session?.user?._id,
    });

    const listener = (data) => setHasNotification(true);
    console.log("SOCKET INITIALIZED:", socket);
    socket?.on("getNotification", listener);

    return () => socket?.off("getNotification", listener);
  }, [socket]);

  return (
    <div className="sticky top-0 flex flex-row items-center justify-center w-screen z-50 backdrop-filter backdrop-blur-sm bg-slate-100/95">
      <div className="flex flex-row items-center justify-center relative py-4 px-4 xl:px-8 xl:max-w-screen-xl w-screen">
        <Link href="/explore">
          <h1 className="cursor-pointer w-1/12 text-primary font-bold text-3xl flex-auto">
            JUAN2HELP
          </h1>
        </Link>
        <div className="flex flex-row items-center justify-center space-x-2">
          <div className="rounded-full flex items-center justify-center h-10 w-10 bg-purple-100 text-primary text-xl">
            <div className="indicator flex cursor-pointer">
              {hasMessage && (
                <div className="indicator-item badge-xs badge-secondary badge">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 z-[51] cursor-pointer"></span>
                </div>
              )}
              <FiMessageCircle />
            </div>
          </div>
          <div className="dropdown dropdown-end ">
            <label tabIndex="0">
              <div
                className="rounded-full flex items-center justify-center h-10 w-10 bg-purple-100 text-primary text-xl"
                onClick={handleNotificationClick}
              >
                <div className="indicator">
                  {hasNotification && (
                    <div className="indicator-item badge-xs badge-secondary badge">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 z-[51] cursor-pointer"></span>
                    </div>
                  )}
                  <FiBell />
                </div>
              </div>
            </label>
            <div
              tabindex="0"
              class="dropdown-content menu p-2 rounded-box w-96 mt-2 shadow-lg bg-white max-h-[80vh] overflow-scroll"
            >
              <div className="flex flex-col p-2 gap-4">
                <div className="flex flex-row items-center justify-between">
                  <div className="font-bold text-xl">Notifications</div>
                  <div className="flex flex-row gap-1">
                    <div class="bg-purple-100 text-primary rounded-full py-1 px-3 text-md font-medium">
                      All
                    </div>
                    <div class="bg-gray-200 rounded-full py-1 px-3 text-md font-medium">
                      Unread
                    </div>
                  </div>
                </div>
                <hr />
              </div>
              <div className="px-2 flex flex-row items-center justify-between">
                <div className="font-medium">New</div>
                <div className="text-primary text-xs">See All</div>
              </div>
              <ul>
                {/* sort by time and map */}
                {notifications.map((notification) => (
                  <Notification
                    key={notification._id}
                    notificationData={notification}
                  />
                ))}
              </ul>
              <div className="px-2 flex flex-row items-center justify-between">
                <div className="font-medium">Earlier</div>
              </div>
              <ul>
                <li>
                  <Notification />
                </li>
                <li>
                  <Notification />
                </li>
                <li>
                  <Notification />
                </li>
              </ul>
            </div>
          </div>
          <div class="dropdown dropdown-end">
            <label tabindex="0">
              <div className="className=h-10 w-10 flex cursor-pointer rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-purple-600">
                <img className="rounded-full" src={faker.image.avatar()} />
              </div>
            </label>
            <ul
              tabindex="0"
              class="dropdown-content menu menu-compact p-2 mt-2 w-56 rounded-md shadow-lg bg-white divide-y divide-gray-200"
            >
              <div className="text-gray-700 px-4 py-2 text-sm text-left ">
                You are logged in as
                <h2 className="font-bold">{session?.user?.name}</h2>
              </div>
              <div>
                <li>
                  <Link href={`/u/${session?.user?._id}`}>
                    <div className="flex px-4 py-2 hover:bg-purple-300 cursor-pointer">
                      <FaUserCircle className="text-lg" />
                      <span className=" text-gray-700 text-sm text-left">
                        Your Profile
                      </span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <div className="flex px-4 py-2 hover:bg-purple-300 cursor-pointer">
                      <IoMdSettings className="text-lg" />
                      <span className=" text-gray-700 text-sm text-left">
                        Settings
                      </span>
                    </div>
                  </Link>
                </li>
                {session?.user?.role >= 2 && (
                  <li>
                    <Link
                      href={
                        session?.user?.role === 8 ? "/manage/admin" : "/manage"
                      }
                    >
                      <div className="flex px-4 py-2 hover:bg-purple-300 cursor-pointer">
                        <MdManageSearch className="text-lg" />
                        <span className=" text-gray-700 text-sm text-left">
                          Manage{" "}
                          {session?.user.role === 8 ? "App" : "Initiatives"}
                        </span>
                      </div>
                    </Link>
                  </li>
                )}
                <li>
                  <div
                    className="flex items-end px-4 py-2 text-left cursor-pointer hover:bg-purple-300"
                    onClick={() => signOut()}
                  >
                    <GoSignOut className="text-lg pt-1px" />
                    <span className=" text-gray-700 text-sm text-left">
                      Sign out
                    </span>
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
