import Image from 'next/image';
import React from 'react';
import { FaBookmark } from 'react-icons/fa';
import {
    FiAlertTriangle,
    FiBookmark,
    FiLink,
    FiMessageCircle,
    FiMoreHorizontal,
    FiSend,
    FiShare,
    FiShare2,
    FiThumbsUp,
} from 'react-icons/fi';
import { MdAccountCircle, MdThumbUp } from 'react-icons/md';

function ModalToggle() {
    return (
        <>
            <input type="checkbox" id="my-modal-4" class="modal-toggle" />
            <label for="my-modal-4" class="modal cursor-pointer">
                <label class="modal-box relative" for="">
                    <div className="flex flex-row justify-around pb-4">
                        <div className="btn btn-outline btn-circle text-xl">
                            <FiLink />
                        </div>
                        <div className="btn btn-outline btn-circle text-xl">
                            <FiShare2 />
                        </div>
                        <div className="btn btn-outline btn-circle btn-error text-xl">
                            <FiAlertTriangle />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <hr />
                        <a>Why you're seeing this post</a>
                        <hr />
                    </div>
                    <ul class="bg-base-100 w-full space-y-4 mt-4">
                        <li>
                            <a>Hide</a>
                        </li>
                        <li>
                            <a>Unfollow</a>
                        </li>
                    </ul>
                </label>
            </label>
        </>
    );
}

function Post() {
    const userName = '';
    const postTime = '';
    const postLocation = '';
    const isBookmarked = true;
    const isLiked = true;
    return (
        <>
            <div className="bg-white rounded-2xl w-screen sm:w-96 p-4 space-y-4 mb-4">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row space-x-2">
                        <div className="h-10 w-10 rounded-full text-primary text-5xl flex items-center justify-center">
                            <MdAccountCircle />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">
                                {userName || 'John Doe'}
                            </span>
                            <span className="text-xs">
                                {postTime + postLocation || '4h · Pasay City'}
                            </span>
                        </div>
                    </div>
                    <div class="p-2">
                        <label for="my-modal-4" className="text-xl">
                            <FiMoreHorizontal />
                        </label>
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-bold">Post Title</span>
                    <p className="text-sm text-gray-700 truncate overflow-hidden max-h-6">
                        Chase the pig around the house cats are the world so
                        lasers are tiny mice chase little red dot someday it
                        will be mine! for bawl under human beds. Eat prawns
                        daintily with a claw then lick paws clean wash down
                        prawns with a lap of carnation milk then retire to the
                        warmest spot on the couch to claw at the fabric before
                        taking a catnap pee in the shoe for love and coo around
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
                    <label class="swap swap-rotate">
                        <input type="checkbox" value={isBookmarked} />
                        <FiThumbsUp className="swap-on text-white fill-primary stroke-1" />
                        <FiThumbsUp className="swap-off" />
                    </label>
                    <FiMessageCircle />
                    <FiSend />
                    <div className="flex-auto"></div>
                    <label class="swap swap-flip">
                        <input type="checkbox" value={isBookmarked} />
                        <FiBookmark className="swap-on text-primary fill-current" />
                        <FiBookmark className="swap-off" />
                    </label>
                </div>
            </div>
            <ModalToggle />
        </>
    );
}

export default Post;
