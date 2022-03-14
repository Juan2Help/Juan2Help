import Link from 'next/link';
import React from 'react';
import {
    FiBookmark,
    FiCalendar,
    FiCompass,
    FiCopy,
    FiSearch,
} from 'react-icons/fi';

function Sidebar({ active }) {
    return (
        <div className="sticky h-fit top-[72px] hidden xl:flex xl:flex-col xl:w-4/12 space-y-2">
            <div>
                <Link href="/explore">
                    <button
                        className={`relative rounded-xl btn btn-lg btn-ghost gap-4 capitalize ${
                            active == 'explore' &&
                            `font-bold text-purple-700 after:content-[''] after:bg-purple-700 after:left-1.5 after:h-1/3 after:w-1 after:rounded-full after:absolute`
                        }`}
                    >
                        <FiCompass className="text-3xl" />
                        Explore
                    </button>
                </Link>
            </div>
            <div>
                <Link href="/feed">
                    <button
                        className={`relative rounded-xl btn btn-lg btn-ghost gap-4 capitalize ${
                            active == 'feed' &&
                            `font-bold text-purple-700 after:content-[''] after:bg-purple-700 after:left-1.5 after:h-1/3 after:w-1 after:rounded-full after:absolute`
                        }`}
                    >
                        <FiCopy className="text-3xl" />
                        Feed
                    </button>
                </Link>
            </div>
            <div>
                <Link href="/search">
                    <button
                        className={`relative rounded-xl btn btn-lg btn-ghost gap-4 capitalize ${
                            active == 'search' &&
                            `font-bold text-purple-700 after:content-[''] after:bg-purple-700 after:left-1.5 after:h-1/3 after:w-1 after:rounded-full after:absolute`
                        }`}
                    >
                        <FiSearch className="text-3xl" />
                        Search
                    </button>
                </Link>
            </div>
            <div>
                <Link href="/schedule">
                    <button
                        className={`relative rounded-xl btn btn-lg btn-ghost gap-4 capitalize ${
                            active == 'schedule' &&
                            `font-bold text-purple-700 after:content-[''] after:bg-purple-700 after:left-1.5 after:h-1/3 after:w-1 after:rounded-full after:absolute`
                        }`}
                    >
                        <FiCalendar className="text-3xl" />
                        Schedule
                    </button>
                </Link>
            </div>
            <div>
                <Link href="/bookmarks">
                    <button
                        className={`relative rounded-xl btn btn-lg btn-ghost gap-4 capitalize ${
                            active == 'bookmarks' &&
                            `font-bold text-purple-700 after:content-[''] after:bg-purple-700 after:left-1.5 after:h-1/3 after:w-1 after:rounded-full after:absolute`
                        }`}
                    >
                        <FiBookmark className="text-3xl" />
                        Bookmarks
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;
