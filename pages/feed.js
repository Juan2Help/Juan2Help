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
import Header from '../components/Header';
import Post from '../components/Post';

function Post_old() {
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

function MyFeed() {
    return (
        <div className="min-h-screen flex justify-center pb-4">
            <div className="min-h-full md:px-6 lg:px-8">
                <div className="max-w-screen-md">
                    <Post />
                    <Post />
                </div>
            </div>
        </div>
    );
}

function Feed() {
    return (
        <div className="bg-slate-100 text-neutral">
            <Head>
                <title>Welcome Home!</title>
            </Head>
            <Header />
            <MyFeed />
            <Navbar active="feed" />
            <input type="checkbox" id="my-modal-4" class="modal-toggle" />
        </div>
    );
}

export default Feed;
