import Link from "next/link";
import React, { useState } from "react";
import { FiBell, FiMessageCircle } from "react-icons/fi";
import { MdManageSearch } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { GoSignOut } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { faker } from "@faker-js/faker";
import { useEffect } from "react/cjs/react.production.min";

function Header({ session }) {
  const hasMessage = false;
  const hasNotification = true;
  const [isOpen, setOpenState] = useState(false);

  return (
    <div className="sticky top-0 flex flex-row items-center justify-center w-screen z-50 backdrop-filter backdrop-blur-sm bg-slate-100/95">
      <div className="flex flex-row items-center justify-center relative py-4 px-4 xl:px-8 xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-sm w-screen">
        <Link href="/explore">
          <h1 className="cursor-pointer w-1/12 text-primary font-bold text-3xl flex-auto">
            JUAN2HELP
          </h1>
        </Link>
        <div className="flex flex-row items-center justify-center space-x-2">
          <div className="rounded-full flex items-center justify-center h-10 w-10 bg-purple-100 text-primary text-xl">
            <div className="indicator flex">
              {hasMessage && (
                <div className="indicator-item badge-xs badge-secondary badge">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 z-[51]"></span>
                </div>
              )}
              <FiMessageCircle />
            </div>
          </div>
          <div className="rounded-full flex items-center justify-center h-10 w-10 bg-purple-100 text-primary text-xl">
            <div className="indicator">
              {hasNotification && (
                <div className="indicator-item badge-xs badge-secondary badge">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 z-[51]"></span>
                </div>
              )}
              <FiBell />
            </div>
          </div>
          <div className="relative">
            <button
              className="h-10 w-10 flex cursor-pointer rounded-full hover:ring-2 hover:ring-offset-2 hover:ring-purple-600"
              onClick={() => setOpenState(!isOpen)}
            >
              <img className="rounded-full" src={faker.image.avatar()} />
            </button>
            {isOpen && (
              <div className="object-left-bottom absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white divide-y divide-gray-100">
                <div className="text-gray-700 block px-4 py-2 text-sm text-left">
                  You are logged in as
                  <br />
                  <h2 className="font-bold">{session?.user?.name}</h2>
                </div>
                <div>
                  <Link href={`/u/${session?.user?._id}`}>
                    <div className="flex px-4 py-2 hover:bg-purple-300 cursor-pointer">
                      <FaUserCircle className="text-lg" />
                      <span className=" text-gray-700 text-sm text-left pl-2">
                        Your Profile
                      </span>
                    </div>
                  </Link>
                  <Link href="/">
                    <div className="flex px-4 py-2 hover:bg-purple-300 cursor-pointer">
                      <IoMdSettings className="text-lg" />
                      <span className=" text-gray-700 text-sm text-left pl-2">
                        Settings
                      </span>
                    </div>
                  </Link>
                  {session?.user?.role >= 2 && (
                    <>
                      <Link
                        href={
                          session?.user?.role === 8
                            ? "/manage/admin"
                            : "/manage"
                        }
                      >
                        <div className="flex px-4 py-2 hover:bg-purple-300 cursor-pointer">
                          <MdManageSearch className="text-lg" />
                          <span className=" text-gray-700 text-sm text-left pl-2">
                            Manage{" "}
                            {session?.user.role === 8 ? "App" : "Initiatives"}
                          </span>
                        </div>
                      </Link>
                    </>
                  )}
                  <div
                    className="flex items-end px-4 py-2 text-left cursor-pointer hover:bg-purple-300"
                    onClick={() => signOut()}
                  >
                    <GoSignOut className="text-lg pt-1px" />
                    <span className=" text-gray-700 text-sm text-left pl-2">
                      Sign out
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
