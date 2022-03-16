import faker from '@faker-js/faker';
import Image from 'next/image';
import React from 'react';
import moment from 'moment';
import { FiArrowRight, FiBookmark, FiMapPin } from 'react-icons/fi';
import { MdOutlineLocalFireDepartment } from 'react-icons/md';

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

function Initiative() {
    const fake = {
        author: {
            name: faker.name.findName(),
            avatar: faker.image.avatar(),
        },
        initiative: {
            date: moment(faker.date.soon(10, 'MON, 14 MAR 2022'))
                .format('ddd, DD MMM YYYY')
                .toUpperCase(),
            location: faker.address.city(),
            title: faker.name.title(),
            content: faker.lorem.lines(3),
            participants: Math.floor(Math.random() * 100),
            isBookmarked: Math.random() > 0.5,
        },
    };
    return (
        <div className="rounded-xl bg-white w-72 overflow-hidden flex-none">
            <div className="h-36 w-full sm:w-96 bg-slate-500 relative">
                <Image
                    src="https://i.pinimg.com/originals/bb/03/86/bb0386babaccc66c484292d2c50973a8.png"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="flex flex-col p-4 space-y-2">
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-400">
                        {fake.initiative.date}
                    </span>
                    <span className="text-md font-bold truncate h-fit">
                        {fake.initiative.title.toUpperCase()}
                    </span>
                    <div className="text-gray-300 text-xs font-bold flex flex-row space-x-2 items-center">
                        <FiMapPin />
                        <span>{fake.initiative.location}</span>
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-2">
                    <span className="text-sm font-medium text-gray-300">
                        {fake.initiative.participants} joined
                    </span>
                    <div class="avatar-group -space-x-5">
                        <div class="avatar">
                            <div class="w-8">
                                <img src={faker.image.avatar()} />
                            </div>
                        </div>
                        <div class="avatar">
                            <div class="w-8">
                                <img src={faker.image.avatar()} />
                            </div>
                        </div>
                        <div class="avatar">
                            <div class="w-8">
                                <img src={faker.image.avatar()} />
                            </div>
                        </div>
                    </div>
                    <div className="flex-auto"></div>
                    <label class="swap swap-flip">
                        <input
                            type="checkbox"
                            value={fake.initiative.isBookmarked}
                        />
                        <FiBookmark className="swap-on text-primary fill-current" />
                        <FiBookmark className="swap-off" />
                    </label>
                </div>
                <progress
                    class="progress w-full progress-primary"
                    value={fake.initiative.participants}
                    max="100"
                ></progress>
            </div>
        </div>
    );
}

function InitiativeCarousel() {
    return (
        <div className="flex flex-row space-x-4 overflow-x-scroll pb-2 scrollbar-none">
            <Initiative />
            <Initiative />
            <Initiative />
            <Initiative />
        </div>
    );
}

function Nearby() {
    return (
        <>
            <div className="w-full xl:w-1/2 overflow-clip space-y-2">
                <div className="flex flex-row justify-between items-center">
                    <span className="text-xl font-bold">
                        Nearby Initiatives
                    </span>
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

export { Featured, Initiatives, Nearby, InitiativeCarousel, TopOrganizers };
