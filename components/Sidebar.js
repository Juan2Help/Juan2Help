import Link from 'next/link';
import React from 'react';
import {
  FiBookmark,
  FiCalendar,
  FiCompass,
  FiCopy,
  FiSearch,
} from 'react-icons/fi';
import { RiHandHeartLine } from 'react-icons/ri';
function Sidebar({ active }) {
  return (
    <div className="sticky h-fit top-[72px] hidden md:flex md:flex-col xl:flex xl:flex-col xl:w-4/12 space-y-2">
      <div>
        <Link href="/explore" passHref>
          <button
            className={`relative rounded-xl btn btn-lg btn-ghost gap-4 capitalize ${
              active == 'explore' &&
              `font-bold text-purple-700 after:content-[''] after:bg-purple-700 after:left-1.5 after:h-1/3 after:w-1 after:rounded-full after:absolute`
            }`}
          >
            <FiCompass className="text-3xl" />
            <span className="hidden xl:inline">Explore</span>
          </button>
        </Link>
      </div>
      <div>
        <button
          className={`relative rounded-xl btn btn-lg btn-ghost gap-4 capitalize ${
            active == 'feed' &&
            `font-bold text-purple-700 after:content-[''] after:bg-purple-700 after:left-1.5 after:h-1/3 after:w-1 after:rounded-full after:absolute`
          }`}
        >
          <FiCopy className="text-3xl" />
          <span className="hidden xl:inline">Feed</span>
        </button>
      </div>
      <div>
        <Link href="/initiatives" passHref>
          <button
            className={`relative rounded-xl btn btn-lg btn-ghost gap-4 capitalize ${
              active == 'initiatives' &&
              `font-bold text-purple-700 after:content-[''] after:bg-purple-700 after:left-1.5 after:h-1/3 after:w-1 after:rounded-full after:absolute`
            }`}
          >
            <RiHandHeartLine className="text-3xl" />
            <span className="hidden xl:inline">Initiatives</span>
          </button>
        </Link>
      </div>
      <div>
<<<<<<< HEAD
        <Link href="/initiatives" passHref>
        <button
          className={`relative rounded-xl btn btn-lg btn-ghost gap-4 capitalize ${
            active == 'initiatives' &&
            `font-bold text-purple-700 after:content-[''] after:bg-purple-700 after:left-1.5 after:h-1/3 after:w-1 after:rounded-full after:absolute`
          }`}
        >
          <RiHandHeartLine className="text-3xl" />
          <span className="hidden xl:inline">Initiatives</span>
        </button>
        </Link>
      </div>
      <div>
=======
>>>>>>> 35cdc60deb578e521d38baf4348ad201d3da422b
        <Link href="/bookmarks" passHref>
          <button
            className={`relative rounded-xl btn btn-lg btn-ghost gap-4 capitalize ${
              active == 'bookmarks' &&
              `font-bold text-purple-700 after:content-[''] after:bg-purple-700 after:left-1.5 after:h-1/3 after:w-1 after:rounded-full after:absolute`
            }`}
          >
            <FiBookmark className="text-3xl" />
            <span className="hidden xl:inline">Bookmarks</span>
          </button>
        </Link>
      </div>
      <div>
        <button
          className={`relative rounded-xl btn btn-lg btn-ghost gap-4 capitalize ${
            active == 'schedule' &&
            `font-bold text-purple-700 after:content-[''] after:bg-purple-700 after:left-1.5 after:h-1/3 after:w-1 after:rounded-full after:absolute`
          }`}
        >
          <FiCalendar className="text-3xl" />
          <span className="hidden xl:inline">Schedule</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
