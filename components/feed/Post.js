import React from 'react';
import {
  FiAlertTriangle,
  FiBookmark,
  FiLink,
  FiMessageCircle,
  FiMoreHorizontal,
  FiSend,
  FiShare2,
  FiThumbsUp,
} from 'react-icons/fi';
import moment from 'moment';
import { faker } from '@faker-js/faker';
import Image from 'next/image';

function ModalToggle() {
  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
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
            <a>Why you&apos;re seeing this post</a>
            <hr />
          </div>
          <ul className="bg-base-100 w-full space-y-4 mt-4">
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
  const fake = {
    author: {
      name: faker.name.findName(),
      avatar: faker.image.avatar(),
    },
    post: {
      time: moment(faker.date.recent(), 'YYYYMMDD').fromNow(),
      location: faker.address.city(),
      title: faker.name.title(),
      image: `https://api.lorem.space/image/album?w=1500&h=1500&r=${Math.random()}`,
      content: faker.lorem.lines(3),
      isBookmarked: Math.random() > 0.5,
    },
  };
  return (
    <>
      <div className="bg-white rounded-2xl w-full pb-full flex flex-col p-4 space-y-4 mb-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row space-x-2">
            <div className="h-10 w-10 text-primary text-5xl flex items-center justify-center">
              <Image
                alt="avatar"
                src={fake.author.avatar || "/images/avatar.png"}
                className="rounded-full"
                layout="fill"
                
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">
                {fake.author.name || 'John Doe'}
              </span>
              <span className="text-xs">
                {[fake.post.time, fake.post.location].join(' · ') ||
                  '4h · Pasay City'}
              </span>
            </div>
          </div>
          <div className="p-2">
            <label htmlFor="my-modal-4" className="text-xl">
              <FiMoreHorizontal />
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold">{fake.post.title}</span>
          <p className="text-sm text-gray-700 break-all line-clamp-3">
            {fake.post.content}
          </p>
        </div>
        <div className="grow w-full sm:w-full bg-slate-500 relative rounded-3xl overflow-clip">
          <Image
            alt="cover"
            src={fake.post.image || "/images/avatar.png"}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-row space-x-4 text-2xl p-2 text-gray-700">
          <label className="swap swap-rotate">
            <input type="checkbox" value={fake.post.isBookmarked} />
            <FiThumbsUp className="swap-on text-white fill-primary stroke-1" />
            <FiThumbsUp className="swap-off" />
          </label>
          <FiMessageCircle />
          <FiSend />
          <div className="flex-auto"></div>
          <label className="swap swap-flip">
            <input type="checkbox" value={fake.post.isBookmarked} />
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
