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
import { MdAccountCircle, MdThumbUp } from 'react-icons/md';
import {
    FiThumbsUp,
    FiSend,
    FiBookmark,
    FiMessageCircle,
    FiBell,
} from 'react-icons/fi';
import { FaBookmark } from 'react-icons/fa';
import Image from 'next/image';

function Post_old() {
    const userName = '';
    const postTime = '';
    const postLocation = '';
    const isBookmarked = true;
    return (
        <div className="bg-white rounded-2xl w-screen sm:w-96">
            <div className="flex flex-row space-x-2 p-4">
                <div className="h-10 w-10 rounded-full text-purple-700 text-5xl flex items-center justify-center">
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
                    <span className="text-purple-700">
                        <FaBookmark />
                    </span>
                ) : (
                    <FiBookmark />
                )}
            </div>
        </div>
    );
}

function Post() {
    const userName = '';
    const postTime = '';
    const postLocation = '';
    const isBookmarked = true;
    const isLiked = true;
    return (
        <div className="bg-white rounded-2xl w-screen sm:w-96 p-4 space-y-4">
            <div className="flex flex-row space-x-2">
                <div className="h-10 w-10 rounded-full text-purple-700 text-5xl flex items-center justify-center">
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
                    <MdThumbUp className="text-purple-700" />
                ) : (
                    <FiThumbsUp />
                )}
                <FiMessageCircle />
                <FiSend />
                <div className="flex-auto"></div>
                {isBookmarked ? (
                    <FaBookmark className="text-purple-700" />
                ) : (
                    <FiBookmark />
                )}
            </div>
        </div>
    );
}

function Header() {
    return (
        <div className="sticky top-0 flex flex-row items-center justify-center w-screen z-50 backdrop-filter backdrop-blur-sm bg-slate-100/95">
            <div className="flex flex-row items-center justify-center relative p-4 lg:max-w-screen-lg md:max-w-screen-sm w-screen">
                <h1 className="text-purple-700 font-bold text-3xl flex-auto">
                    JUAN2HELP
                </h1>
                <div className="flex flex-row items-center justify-center space-x-2">
                    <div className="rounded-full p-2 bg-purple-100 text-purple-700 text-xl">
                        <FiMessageCircle />
                    </div>
                    <div className="rounded-full p-2 bg-purple-100 text-purple-700 text-xl">
                        <FiBell />
                    </div>
                    <div className="text-purple-700 text-4xl">
                        <MdAccountCircle />
                    </div>
                </div>
            </div>
        </div>
    );
}

function MyFeed() {
    return (
        <div className="min-h-screen flex justify-center pb-4">
            <div className="min-h-full md:px-6 lg:px-8">
                <div className="max-w-screen-md space-y-4">
                    <Post />
                    <Post />
                </div>
            </div>
        </div>
    );
}

function Feed() {
    return (
        <div className="bg-slate-100">
            <Head>
                <title>Welcome Home!</title>
            </Head>
            <Header />
            <MyFeed />
            <Navbar active="feed" />
        </div>
    );
}

export default Feed;
