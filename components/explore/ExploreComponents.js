import faker from '@faker-js/faker';
import Image from 'next/image';
import React from 'react';
import moment from 'moment';
import { FiArrowRight, FiBookmark, FiMapPin } from 'react-icons/fi';
import { MdOutlineLocalFireDepartment } from 'react-icons/md';
import Link from 'next/link';
import { fetchJSON } from '../../middleware/helper';
function OrganizerTile({ name }) {
  return (
    <div className="min-w-[6rem] w-32 p-4 rounded-lg bg-white flex flex-col items-center gap-2">
      <div className="w-full pb-full">
        <Image
          alt=""
          src="https://i.pinimg.com/originals/bb/03/86/bb0386babaccc66c484292d2c50973a8.png"
          className="rounded-xl"
          objectFit="cover"
          width={128}
          height={128}
        />
      </div>
      <span className="text-xs font-bold uppercase break-normal h-12 text-ellipsis line-clamp-3 text-center">
        {name}
      </span>
    </div>
  );
}

function TopOrganizers() {
  return (
    <div className="hidden md:block gap-2">
      <div className="flex flex-row justify-between items-center">
        <span className="text-xl font-bold">Top Organizers</span>
        <div className="text-sm text-primary font-bold gap-2 flex flex-row items-center">
          <span>View all</span>
          <FiArrowRight className="inline" />
        </div>
      </div>
      <div className="flex flex-row space-x-4 max-w-full overflow-x-auto pb-2 scrollbar-none">
        <OrganizerTile name="Save Our Seas" />
        <OrganizerTile name="Philippine Red Cross" />
        <OrganizerTile name="Philippine Animal Welfare Society" />
        <OrganizerTile name="United Nations Volunteers" />
        <OrganizerTile name="Save Our Seas" />
        <OrganizerTile name="Philippine Red Cross" />
        <OrganizerTile name="Philippine Animal Welfare Society" />
        <OrganizerTile name="United Nations Volunteers" />
        <OrganizerTile name="Philippine Red Cross" />
        <OrganizerTile name="Philippine Animal Welfare Society" />
        <OrganizerTile name="United Nations Volunteers" />
      </div>
    </div>
  );
}

function Initiative({ initiativeData, bookmarkList }) {
  let initiativeLocation =
    typeof initiativeData?.location === 'string'
      ? initiativeData?.location
      : initiativeData?.location?.address;
  const data = {
    author: {
      name: initiativeData?.publisherName,
      avatar: faker.image.avatar(),
    },
    initiative: {
      date: moment(initiativeData?.startDate)
        .format('ddd, DD MMM YYYY')
        .toUpperCase(),
      location: initiativeLocation,
      title: initiativeData?.title?.toUpperCase(),
      content: initiativeData?.description,
      participantcount: initiativeData?.participantsList?.length,
      participants: initiativeData?.participants,
      isBookmarked: bookmarkList?.includes(initiativeData?._id),
    },
  };

  const onClickBookmark = async () => {
    const response = await fetchJSON('/api/user/add-bookmark', {
      initiativeID: initiativeData._id,
    });
  };

  const onClickUnbookmark = async () => {
    const response = await fetchJSON('/api/user/remove-bookmark', {
      initiativeID: initiativeData._id,
    });
  };

  return (
    <div className="rounded-xl bg-white w-72 overflow-hidden flex-none hover:ring-2 hover:ring-offset-2 hover:ring-purple-600">
      <div className="h-36 w-full sm:w-96 bg-slate-500 relative cursor-pointer ">
        <Link href={`/i/${initiativeData._id}`} passHref>
          <Image
            alt="initiative"
            src="https://i.pinimg.com/originals/bb/03/86/bb0386babaccc66c484292d2c50973a8.png"
            layout="fill"
            objectFit="cover"
          />
        </Link>
      </div>
      <div className="flex flex-col p-4 gap-2 flex-1">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-gray-400 ">
            {data.initiative.date}
          </span>
          <span className="text-md font-bold truncate h-fit">
            {data.initiative.title}
          </span>
          <div className="text-gray-300 text-xs font-bold grid grid-flow-row grid-cols-10 items-center">
            <FiMapPin className="col-span-1" />
            <div className="col-span-9 max-h-16 truncate">
              {data.initiative.location}
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between gap-2">
          <span className="text-sm font-medium text-gray-300">
            {data.initiative.participantcount}/{data.initiative.participants}{' '}
            joined
          </span>
          <label className="swap swap-flip">
            <input
              type="checkbox"
              defaultChecked={data.initiative.isBookmarked}
            />
            <FiBookmark
              className="swap-on text-primary fill-current"
              onClick={onClickUnbookmark}
            />
            <FiBookmark className="swap-off" onClick={onClickBookmark} />
          </label>
        </div>
        <progress
          className="progress w-full progress-primary"
          value={data.initiative.participantcount}
          max={data.initiative.participants}
        ></progress>
        <div
          className={`relative my-2 max-w-xs text-center text-xs font-bold text-gray-800 bg-yellow-200 rounded-full self-start px-2 py-1
            ${initiativeData?.causeType == 'Nature' && `bg-green-400`} 
            ${initiativeData?.causeType == 'Teach' && `bg-red-300`}
            ${initiativeData?.causeType == 'Food' && `bg-yellow-300`}
            ${initiativeData?.causeType == 'Medicine' && `bg-blue-300`}
            ${initiativeData?.causeType == null && `bg-transparent`}`}
        >
          <span>{initiativeData?.causeType}</span>
        </div>
      </div>
    </div>
  );
}

function InitiativeCarousel() {
  return (
    <div className="flex flex-row space-x-4 overflow-x-scroll pb-2 scrollbar-none p-1">
      {/* <Initiative />
      <Initiative />
      <Initiative />
      <Initiative /> */}
    </div>
  );
}

function Nearby() {
  return (
    <>
      <div className="w-full xl:w-1/2 overflow-clip gap-2">
        <div className="flex flex-row justify-between items-center">
          <span className="text-xl font-bold">Nearby Initiatives</span>
          <div className="text-sm text-primary font-bold gap-2 flex flex-row items-center">
            <span>View all</span>
            <FiArrowRight className="inline" />
          </div>
        </div>
        <InitiativeCarousel />
      </div>
    </>
  );
}

function Initiatives() {
  return (
    <div className="w-full flex flex-col space-y-4 xl:flex-row xl:space-y-0 xl:space-x-8">
      <Nearby />
      <Nearby />
    </div>
  );
}

function Featured() {
  return (
    <div className=" flex items-end bg-orange-200 h-52 xl:h-80 w-full rounded-xl">
      <span className="text-xl font-bold p-4">
        <MdOutlineLocalFireDepartment className="text-5xl" />
        Featured initiative appears here!
      </span>
    </div>
  );
}

export {
  Featured,
  Initiatives,
  Nearby,
  InitiativeCarousel,
  TopOrganizers,
  Initiative,
};
