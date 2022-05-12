import Link from 'next/link';
import { React } from 'react';
import { faker } from '@faker-js/faker';
import { MdVerified } from 'react-icons/md';

function SuggestedPerson() {
    const fake = {
        avatar: faker.image.avatar(),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        initiative: faker.company.companyName(1),
        isVerified: Math.random() > 0.5,
    };

    return (
        <div className="flex flex-row items-center justify-between space-x-2">
            <div className="flex flex-row items-center space-x-4">
                <div className="avatar">
                    <div className="w-10">
                        <img src={fake.avatar} className="rounded-full" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row space-x-2 items-center">
                        <span className="text-xs font-bold">
                            {fake.name || 'Jane Doe'}
                        </span>
                        <MdVerified
                            className={`${
                                fake.isVerified ? 'shown' : 'hidden'
                            } text-primary`}
                        />
                    </div>
                    <span className="text-gray-400 text-xs">
                        Organizer at {fake.initiative}.
                    </span>
                </div>
            </div>
            <div className="flex flex-col items-center text-xs font-medium text-primary">
                <label className="swap text-right">
                    <input type="checkbox" />
                    <div className="swap-off">Follow</div>
                    <div className="swap-on">Unfollow</div>
                </label>
            </div>
        </div>
    );
}

function Suggestions() {
    return (
        <div className="w-full space-y-6 xl:ml-10">
            <div className="flex flex-row items-center justify-between">
                <span className="text-gray-400 text-md font-bold">
                    Suggestions for you
                </span>
                <Link href="">
                    <span className="font-medium text-primary text-xs">
                        See All
                    </span>
                </Link>
            </div>
            <div className="flex flex-col space-y-4">
                <SuggestedPerson />
                <SuggestedPerson />
                <SuggestedPerson />
                <SuggestedPerson />
                <SuggestedPerson />
            </div>
        </div>
    );
}

export default Suggestions;
