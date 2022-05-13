import faker from "@faker-js/faker";
import Image from "next/image";
import React from "react";
import moment from "moment";
import { FiArrowRight, FiBookmark, FiMapPin } from "react-icons/fi";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import Link from "next/link";
function OrganizerTile({ name }) {
  return (
    <div className="min-w-[6rem] w-32 p-4 rounded-lg bg-white flex flex-col items-center space-y-2">
      <div className="w-full pb-full">
        <img
          src="https://i.pinimg.com/originals/bb/03/86/bb0386babaccc66c484292d2c50973a8.png"
          className="rounded-xl"
          objectFit="cover"
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
    <div className="hidden md:block space-y-2">
      <div className="flex flex-row justify-between items-center">
        <span className="text-xl font-bold">Top Organizers</span>
        <div className="text-sm text-primary font-bold space-x-2 flex flex-row items-center">
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

function Initiative({ initiativeData }) {
  console.log(initiativeData)
  let initiativeLocation =
    typeof initiativeData?.location === "string"
      ? initiativeData?.location
      : initiativeData?.location?.address;
  const fake = {
    author: {
      name: initiativeData?.publisherName,
      avatar: faker.image.avatar(),
    },
    initiative: {
      date: moment(initiativeData?.startDate)
        .format("ddd, DD MMM YYYY")
        .toUpperCase(),
      location: initiativeLocation,
      title: initiativeData?.title?.toUpperCase(),
      content: initiativeData?.description,
      participants: initiativeData?.participantsList?.length,
      isBookmarked: Math.random() > 0.5,
    },
  };
  return (
    
      <div className="rounded-xl bg-white w-72 overflow-hidden flex-none hover:ring-2 hover:ring-offset-2 hover:ring-purple-600">
        <div className="h-36 w-full sm:w-96 bg-slate-500 relative cursor-pointer ">
          <Link href={`/i/${initiativeData._id}`}>
            <Image
              src="https://i.pinimg.com/originals/bb/03/86/bb0386babaccc66c484292d2c50973a8.png"
              layout="fill"
              objectFit="cover"
            />
          </Link>
        </div>
        <div className="flex flex-col p-4 space-y-2">
          <div className="flex flex-col"> 
            <span className="text-xs font-bold text-gray-400 ">
              {fake.initiative.date}
            </span>
            <span className="text-md font-bold truncate h-fit">
              {fake.initiative.title}
            </span>
            <div className="text-gray-300 text-xs font-bold flex flex-row space-x-2 items-center">
              <FiMapPin />
              <span>{fake.initiative.location}</span>
            </div>
          </div>
          
          <div className="flex flex-row items-center space-x-2">
            <span className="text-sm font-medium text-gray-300">
              {fake.initiative.participants}/{initiativeData.participants} joined 
            </span>
            <div className="avatar-group -space-x-5">
              <div className="avatar">
                <div className="w-8">
                  <img src={faker.image.avatar()} />
                </div>
              </div>
              <div className="avatar">
                <div className="w-8">
                  <img src={faker.image.avatar()} />
                </div>
              </div>
              <div className="avatar">
                <div className="w-8">
                  <img src={faker.image.avatar()} />
                </div>
              </div>
            </div>
            <div className="flex-auto"></div>
            <label className="swap swap-flip">
              <input type="checkbox" value={fake.initiative.isBookmarked} />
              <FiBookmark className="swap-on text-primary fill-current" />
              <FiBookmark className="swap-off" />
            </label>
          </div>
          <progress
            className="progress w-full progress-primary"
            value={fake.initiative.participants}
            max="100"
          ></progress>
          <div className={`relative my-2 max-w-xs h-4 text-center text-xs font-bold text-gray-800 bg-yellow-200 rounded-full
            ${initiativeData?.causeType == "Nature" && `bg-green-400`} 
            ${initiativeData?.causeType == "Teach" && `bg-red-300`}
            ${initiativeData?.causeType == "Food" && `bg-yellow-300`}
            ${initiativeData?.causeType == "Medicine" && `bg-blue-300`}
            ${initiativeData?.causeType == null && `bg-black`}`}>
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
      <div className="w-full xl:w-1/2 overflow-clip space-y-2">
        <div className="flex flex-row justify-between items-center">
          <span className="text-xl font-bold">Nearby Initiatives</span>
          <div className="text-sm text-primary font-bold space-x-2 flex flex-row items-center">
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
