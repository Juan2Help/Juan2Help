import { faker } from '@faker-js/faker';
import moment from 'moment';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import { React } from 'react';
import {
  FiArrowLeft,
  FiMoreHorizontal,
  FiBookmark,
  FiClock,
  FiMapPin,
} from 'react-icons/fi';
import { GrantAccess } from '../../middleware/ProtectedRoute';
import Link from "next/link";

function Header() {
  return (
    <>
      <div className="flex-auto absolute h-56 w-full sm:w-96 bg-slate-500">
        <Image
          src="https://i.pinimg.com/originals/bb/03/86/bb0386babaccc66c484292d2c50973a8.png"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="-top-20 sticky flex flex-row justify-between p-4">
        <div className="p-2 rounded-full bg-purple-100">
          <Link href="/initiatives">
            <FiArrowLeft className="cursor-pointer hover:text-gray-500"/>
          </Link>
        </div>
        <div className="p-2 rounded-full bg-purple-100">
          <FiMoreHorizontal />
        </div>
      </div>
    </>
  );
}

function Body() {
  const fake = {
    author: {
      name: faker.name.findName(),
      avatar: faker.image.avatar(),
    },
    initiative: {
      date: moment(faker.date.soon(10, 'MON, 14 MAR 2022'))
        .format('DD MMM YYYY')
        .toUpperCase(),
      time: {
        start: moment(faker.time.recent(10, '12:00')).format('HH:mm'),
        end: moment(faker.time.recent(10, '12:00')).format('HH:mm'),
      },
      location: {
        city: faker.address.city(),
        address: faker.address.streetAddress(),
      },
      participants: {
        start: faker.random.number({ min: 1, max: 100 }),
        end: faker.random.number({ min: 1, max: 1000 }),
        current: faker.random.number({ min: 100, max: 1000 }),
      },
      title: faker.name.title(),
      description: faker.lorem.lines(8),
      isBookmarked: Math.random() > 0.5,
    },
  };
  return (
    <div className="p-4 flex flex-col mt-40 gap-4">
      {/* TITLE */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{fake.initiative.title}</span>
          <div className="flex flex-row items-center space-x-2">
            <span className="text-sm text-gray-400 font-bold inline">
              {fake.author.name}
            </span>
            <span>·</span>
            <label class="swap text-xs font-bold">
              <input type="checkbox" value={fake.initiative.isBookmarked} />
              <span className="swap-on text-primary">Follow</span>
              <span className="swap-off text-primary">Unfollow</span>
            </label>
          </div>
        </div>
        <label class="swap swap-flip text-lg">
          <input type="checkbox" value={fake.initiative.isBookmarked} />
          <FiBookmark className="swap-on text-primary fill-current" />
          <FiBookmark className="swap-off" />
        </label>
      </div>
      {/* CORRESPONDENCE */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-row items-center gap-4">
          <div className="p-2 text-primary text-2xl bg-violet-100 rounded-md">
            <FiClock />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400 font-medium overflow-clip truncate">
              {fake.initiative.date}
            </span>
            <span className="text-sm font-medium overflow-clip truncate">
              {fake.initiative.time.start} - {fake.initiative.time.end}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="p-2 text-primary text-2xl bg-violet-100 rounded-md">
            <FiMapPin />
          </div>
          <div className="flex flex-col overflow-clip truncate">
            <span className="text-sm text-gray-400 font-medium">
              {fake.initiative.location.city}
            </span>
            <span className="text-sm font-medium overflow-clip truncate">
              {fake.initiative.location.address}
            </span>
          </div>
        </div>
      </div>
      {/* Participants */}
      <div className="flex flex-col gap-2">
        <div className="text-xl font-bold">Participants</div>
        <div>
          <progress
            class="progress progress-primary w-full"
            value={fake.initiative.participants.current}
            max={fake.initiative.participants.end}
          />
        </div>
      </div>
      {/* Description */}
      <div className="flex flex-col gap-2">
        <div className="text-xl font-bold">Description</div>
        <div className="text-justify text-slate-700 text-sm">
          <p>{fake.initiative.description}</p>
        </div>
      </div>
      {/* Location */}
      <div className="flex flex-col gap-2">
        <div className="text-xl font-bold">Location</div>
        <div className="bg-primary w-full p-4 h-56 rounded-md font-bold text-white flex items-end">
          OPEN STREET MAP API FETCH
        </div>
      </div>
      {/* Join */}
      <button class="btn btn-primary btn-block font-bold text-white">
        Join
      </button>
    </div>
  );
}

function initiative({ sessionFromProp }) {
  const session = sessionFromProp;
  return (
    <div className="flex relative flex-col min-h-screen">
      <Header session={session} />
      <Body />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  GrantAccess(context, session);
  return {
    props: {
      sessionFromProp: session,
    },
  };
}

export default initiative;
