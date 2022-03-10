import Image from 'next/image';
import React from 'react';
import { FiArrowRight, FiHeart } from 'react-icons/fi';
import { MdOutlineLocalFireDepartment } from 'react-icons/md';

function Initiative() {
    return (
        <div className="rounded-xl bg-white h-72 w-72 overflow-hidden flex-none">
            <div className="h-36 w-full sm:w-96 bg-slate-500 relative">
                <Image
                    src="https://i.pinimg.com/originals/bb/03/86/bb0386babaccc66c484292d2c50973a8.png"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="flex flex-col p-4 space-y-2">
                <span className="text-xs font-bold text-gray-400">
                    SUN, 12 DEC 2021
                </span>
                <span className="text-lg font-bold">
                    NEVER GONNA GIVE YOU UP
                </span>
                <div className="flex flex-row items-center space-x-2">
                    <span className="text-sm font-medium text-gray-300">
                        69 joined
                    </span>
                    <div class="avatar-group -space-x-5">
                        <div class="avatar">
                            <div class="w-8">
                                <img src="https://api.lorem.space/image/face?hash=4818" />
                            </div>
                        </div>
                        <div class="avatar">
                            <div class="w-8">
                                <img src="https://api.lorem.space/image/face?hash=40311" />
                            </div>
                        </div>
                        <div class="avatar">
                            <div class="w-8">
                                <img src="https://api.lorem.space/image/face?hash=84348" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-auto"></div>
                    <FiHeart className="text-gray-400 text-2xl" />
                </div>
                <progress
                    class="progress w-full progress-primary"
                    value="10"
                    max="100"
                ></progress>
            </div>
        </div>
    );
}

function InitiativeCarousel() {
    return (
        <div className="flex flex-row space-x-4 overflow-x-scroll pb-2">
            <Initiative />
            <Initiative />
        </div>
    );
}

function Nearby() {
    return (
        <div className="flex flex-col space-y-2 xl:w-1/2 xl:px-6">
            <div className="flex flex-row justify-between items-center">
                <span className="text-xl font-bold">Nearby Initiatives</span>
                <div className="text-sm text-primary font-bold space-x-2 flex flex-row items-center">
                    <span>View all</span>
                    <FiArrowRight className="inline" />
                </div>
            </div>
            <InitiativeCarousel />
        </div>
    );
}

function Initiatives() {
    return (
        <div className="flex flex-col space-y-4 xl:flex-row xl:justify-between xl:space-y-0 ">
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

export { Featured, Initiatives };
