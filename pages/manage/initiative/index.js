import { faker } from '@faker-js/faker';
import moment from 'moment';
import Image from 'next/image';
import { React } from 'react';
import { FiArrowLeft, FiMoreHorizontal, FiBookmark } from 'react-icons/fi';

function Header() {
    return (
        <>
            <div className="absolute h-56 w-full sm:w-96 bg-slate-500">
                <Image
                    src="https://i.pinimg.com/originals/bb/03/86/bb0386babaccc66c484292d2c50973a8.png"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="-top-20 sticky flex flex-row justify-between p-4">
                <div className="p-2 rounded-full bg-purple-100">
                    <FiArrowLeft />
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
        <div className="p-4 flex flex-col mt-40">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <span className="text-lg font-bold">
                        {fake.initiative.title}
                    </span>
                    <div className="flex flex-row items-center space-x-2">
                        <span className="text-sm text-gray-400 font-bold inline">
                            {fake.author.name}
                        </span>
                        <span>·</span>
                        <label class="swap text-xs font-bold">
                            <input
                                type="checkbox"
                                value={fake.initiative.isBookmarked}
                            />
                            <span className="swap-on text-primary">Follow</span>
                            <span className="swap-off text-primary">
                                Unfollow
                            </span>
                        </label>
                    </div>
                </div>
                <label class="swap swap-flip text-lg">
                    <input
                        type="checkbox"
                        value={fake.initiative.isBookmarked}
                    />
                    <FiBookmark className="swap-on text-primary fill-current" />
                    <FiBookmark className="swap-off" />
                </label>
            </div>
        </div>
    );
}

function index() {
    return (
        <div className="flex relative flex-col min-h-screen">
            <Header />
            <Body />
        </div>
    );
}

export default index;
