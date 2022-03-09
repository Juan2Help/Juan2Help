import { React } from 'react';
import Link from 'next/link';
import {
    FiCalendar,
    FiCompass,
    FiCopy,
    FiPlus,
    FiSearch,
} from 'react-icons/fi';

function Navbar({ active }) {
    return (
        <div className="sticky w-screen bottom-0 p-4 bg-white rounded-t-3xl flex flex-row items-center space-x-4 md:hidden">
            <Link href="/explore">
                <div
                    className={`relative flex flex-row flex-auto space-x-2 justify-center items-center p-4 rounded-md ${
                        active == 'explore'
                            ? `bg-purple-50 text-purple-700 after:content-[''] after:bg-purple-700 after:bottom-1.5 after:h-1 after:w-1/3 after:rounded-full after:absolute`
                            : 'text-gray-300'
                    }`}
                >
                    <FiCompass className="text-2xl" />
                </div>
            </Link>
            <Link href="/feed">
                <div
                    className={`relative flex flex-row flex-auto space-x-2 justify-center items-center p-4 rounded-md ${
                        active == 'feed'
                            ? `bg-purple-50 text-purple-700 after:content-[''] after:bg-purple-700 after:bottom-1.5 after:h-1 after:w-1/3 after:rounded-full after:absolute`
                            : 'text-gray-300'
                    }`}
                >
                    <FiCopy className="text-2xl" />
                </div>
            </Link>
            <Link href="/add-initiative">
                <div className="text-white p-4 rounded-full bg-purple-700">
                    <FiPlus className="text-2xl" />
                </div>
            </Link>
            <Link href="/search">
                <div
                    className={`relative flex flex-row flex-auto space-x-2 justify-center items-center p-4 rounded-md ${
                        active == 'search'
                            ? `bg-purple-50 text-purple-700 after:content-[''] after:bg-purple-700 after:bottom-1.5 after:h-1 after:w-1/3 after:rounded-full after:absolute`
                            : 'text-gray-300'
                    }`}
                >
                    <FiSearch className="text-2xl" />
                </div>
            </Link>
            <Link href="/schedule">
                <div
                    className={`relative flex flex-row flex-auto space-x-2 justify-center items-center p-4 rounded-md ${
                        active == 'schedule'
                            ? `bg-purple-50 text-purple-700 after:content-[''] after:bg-purple-700 after:bottom-1.5 after:h-1 after:w-1/3 after:rounded-full after:absolute`
                            : 'text-gray-300'
                    }`}
                >
                    <FiCalendar className="text-2xl" />
                </div>
            </Link>
        </div>
    );
}

export default Navbar;
