import { useState } from 'react';
import {
    getProviders,
    signIn as signIntoProviders,
    useSession,
    signOut,
} from 'next-auth/react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    MdAccountCircle,
    MdThumbUp,
    MdOutlineFastfood,
    MdOutlineMedication,
    MdNature,
    MdOutlineLocalFireDepartment,
} from 'react-icons/md';
import {
    FiThumbsUp,
    FiSend,
    FiBookmark,
    FiMessageCircle,
    FiBell,
    FiHeart,
    FiCrosshair,
    FiArrowRight,
} from 'react-icons/fi';
import { FaBookmark, FaChalkboardTeacher } from 'react-icons/fa';
import Image from 'next/image';
import Header from '../components/Header';

function Post() {
    const userName = '';
    const postTime = '';
    const postLocation = '';
    const isBookmarked = true;
    return (
        <div className="bg-white rounded-2xl w-screen sm:w-96">
            <div className="flex flex-row space-x-2 p-4">
                <div className="h-10 w-10 rounded-full text-primary text-5xl flex items-center justify-center">
                    <MdAccountCircle />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold">{userName || 'John Doe'}</span>
                    <span className="text-xs">
                        {postTime + postLocation || '4h · Pasay City'}
                    </span>
                </div>
            </div>
            <div className="h-96 w-full sm:h-96 sm:w-96 bg-slate-500 relative">
                <Image
                    src="https://i.pinimg.com/originals/bb/03/86/bb0386babaccc66c484292d2c50973a8.png"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="flex flex-row space-x-4 text-2xl p-4 text-gray-700">
                <FiThumbsUp />
                <FiMessageCircle />
                <FiSend />
                <div className="flex-auto"></div>
                {isBookmarked ? (
                    <span className="text-primary">
                        <FaBookmark />
                    </span>
                ) : (
                    <FiBookmark />
                )}
            </div>
        </div>
    );
}

function Post2() {
    const userName = '';
    const postTime = '';
    const postLocation = '';
    const isBookmarked = true;
    const isLiked = true;
    return (
        <div className="bg-white rounded-2xl w-screen sm:w-96 p-4 space-y-4">
            <div className="flex flex-row space-x-2">
                <div className="h-10 w-10 rounded-full text-primary text-5xl flex items-center justify-center">
                    <MdAccountCircle />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold">{userName || 'John Doe'}</span>
                    <span className="text-xs">
                        {postTime + postLocation || '4h · Pasay City'}
                    </span>
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-bold">Post Title</span>
                <p className="text-sm text-gray-700 truncate overflow-hidden max-h-6">
                    Chase the pig around the house cats are the world so lasers
                    are tiny mice chase little red dot someday it will be mine!
                    for bawl under human beds. Eat prawns daintily with a claw
                    then lick paws clean wash down prawns with a lap of
                    carnation milk then retire to the warmest spot on the couch
                    to claw at the fabric before taking a catnap pee in the shoe
                    for love and coo around
                </p>
            </div>
            <div className="h-72 w-full sm:h-72 sm:w-full bg-slate-500 relative rounded-3xl overflow-clip">
                <Image
                    src="https://i.pinimg.com/originals/bb/03/86/bb0386babaccc66c484292d2c50973a8.png"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="flex flex-row space-x-4 text-2xl p-2 text-gray-700">
                {isLiked ? (
                    <MdThumbUp className="text-primary" />
                ) : (
                    <FiThumbsUp />
                )}
                <FiMessageCircle />
                <FiSend />
                <div className="flex-auto"></div>
                {isBookmarked ? (
                    <FaBookmark className="text-primary" />
                ) : (
                    <FiBookmark />
                )}
            </div>
        </div>
    );
}

function Feed() {
    return (
        <div className="min-h-screen flex justify-center pb-4">
            <div className="min-h-full md:px-6 lg:px-8">
                <div className="max-w-screen-md space-y-4">
                    <Post2 />
                </div>
            </div>
        </div>
    );
}

function Initiative() {
    return (
        <div className="rounded-xl bg-white h-64 w-72 overflow-hidden flex-none">
            <div className="h-36 w-full sm:h-96 sm:w-96 bg-slate-500 relative">
                <Image
                    src="https://i.pinimg.com/originals/bb/03/86/bb0386babaccc66c484292d2c50973a8.png"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="flex flex-col p-4">
                <span className="text-xs font-bold text-gray-400">
                    SUN, 12 DEC 2021
                </span>
                <span className="text-lg font-bold">
                    NEVER GONNA GIVE YOU UP
                </span>
                <div className="flex flex-row items-center space-x-2">
                    <span className="text-sm font-medium text-gray-300">
                        69 joined
                    </span>
                    <div className="flex flex-row -space-x-4">
                        <div className="w-8 h-8 rounded-full bg-purple-300"></div>
                        <div className="w-8 h-8 rounded-full bg-purple-400"></div>
                        <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                    </div>
                    <div className="flex-auto"></div>
                    <FiHeart className="text-gray-400 text-2xl" />
                </div>
            </div>
        </div>
    );
}

function InitiativeCarousel() {
    return (
        <div className="flex flex-row space-x-4 overflow-x-auto pb-2">
            <Initiative />
            <Initiative />
        </div>
    );
}

function Nearby() {
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex flex-row justify-between items-center">
                <span className="text-xl font-bold">Nearby Initiatives</span>
                <div className="text-sm text-primary font-bold space-x-2 flex flex-row items-center">
                    <span>View all</span>
                    <FiArrowRight className="inline" />
                </div>
            </div>
            <InitiativeCarousel />
        </div>
    );
}

function Initiatives() {
    return (
        <div className="flex flex-col space-y-4 ">
            <Nearby />
        </div>
    );
}

function Featured() {
    return (
        <div className=" flex items-end bg-orange-200 h-52 w-full rounded-xl">
            <span className="text-xl font-bold p-4">
                <MdOutlineLocalFireDepartment className="text-5xl" />
                Featured initiative appears here!
            </span>
        </div>
    );
}

function Causes() {
    return (
        <div className="flex flex-col space-y-2">
            <span className="text-xl font-bold">Causes</span>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="flex flex-col justify-center items-center p-4 text-primary bg-purple-100 rounded-full space-y-2">
                        <MdOutlineFastfood className="text-2xl" />
                    </div>
                    <span className="font-bold text-xs text-primary">Food</span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="flex flex-col justify-center items-center p-4 text-primary bg-purple-100 rounded-full space-y-2">
                        <MdOutlineMedication className="text-2xl" />
                    </div>
                    <span className="font-bold text-xs text-primary">
                        Medicine
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="flex flex-col justify-center items-center p-4 text-primary bg-purple-100 rounded-full space-y-2">
                        <MdNature className="text-2xl" />
                    </div>
                    <span className="font-bold text-xs text-primary">
                        Nature
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="flex flex-col justify-center items-center p-4 text-primary bg-purple-100 rounded-full space-y-2">
                        <FaChalkboardTeacher className="text-2xl" />
                    </div>
                    <span className="font-bold text-xs text-primary">
                        Teach
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="flex flex-col justify-center items-center p-4 text-primary bg-purple-100 rounded-full space-y-2">
                        <FiCrosshair className="text-2xl" />
                    </div>
                    <span className="font-bold text-xs text-primary">More</span>
                </div>
            </div>
        </div>
    );
}

function Explore() {
    return (
        <div className="bg-slate-100 min-h-screen flex flex-col justify-between text-neutral">
            <Head>
                <title>Welcome Explore!</title>
            </Head>
            <Header />
            <div className="px-4 flex flex-col space-y-6">
                <Featured />
                <Causes />
                <Initiatives />
            </div>
            <Navbar active="explore" />
        </div>
    );
}

export default Explore;
