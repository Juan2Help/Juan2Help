import { useState } from 'react';
import {
    getProviders,
    signIn as signIntoProviders,
    useSession,
    signOut,
} from 'next-auth/react';
import Head from 'next/head';
import Button from '../components/Button';
import { Input, TextArea, Slider } from '../components/Input';
// import Slider from '../components/Slider';
import ErrorMessage from '../components/ErrorMessage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    MdAccountCircle,
    MdThumbUp,
    MdOutlineFastfood,
    MdOutlineMedication,
    MdNature,
    MdBloodtype,
    MdOutlineLocalFireDepartment,
} from 'react-icons/md';
import {
    FiThumbsUp,
    FiSend,
    FiBookmark,
    FiMessageCircle,
    FiBell,
    FiCompass,
    FiCopy,
    FiSearch,
    FiCalendar,
    FiPlus,
    FiHeart,
    FiCrosshair,
    FiArrowRight,
    FiArrowLeft,
} from 'react-icons/fi';
import { FaBookmark, FaChalkboardTeacher, FaHeart } from 'react-icons/fa';
import Image from 'next/image';

function Causes() {
    return (
        <div className="flex flex-col space-y-2">
            <span className="text-lg font-bold">Causes</span>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="flex flex-col justify-center items-center p-4 text-purple-700 bg-purple-100 rounded-full space-y-2">
                        <MdOutlineFastfood className="text-2xl" />
                    </div>
                    <span className="font-bold text-xs text-purple-700">
                        Food
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="flex flex-col justify-center items-center p-4 text-purple-700 bg-purple-100 rounded-full space-y-2">
                        <MdOutlineMedication className="text-2xl" />
                    </div>
                    <span className="font-bold text-xs text-purple-700">
                        Medicine
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="flex flex-col justify-center items-center p-4 text-purple-700 bg-purple-100 rounded-full space-y-2">
                        <MdNature className="text-2xl" />
                    </div>
                    <span className="font-bold text-xs text-purple-700">
                        Nature
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="flex flex-col justify-center items-center p-4 text-purple-700 bg-purple-100 rounded-full space-y-2">
                        <FaChalkboardTeacher className="text-2xl" />
                    </div>
                    <span className="font-bold text-xs text-purple-700">
                        Teach
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="flex flex-col justify-center items-center p-4 text-purple-700 bg-purple-100 rounded-full space-y-2">
                        <FiCrosshair className="text-2xl" />
                    </div>
                    <span className="font-bold text-xs text-purple-700">
                        More
                    </span>
                </div>
            </div>
        </div>
    );
}

function Date() {
    return (
        <div className="w-full flex flex-row space-x-4">
            <div className="flex-1 space-y-2">
                <span className="font-bold text-md">Start date</span>
                <Input type="date" />
            </div>
            <div className="flex-1 space-y-2">
                <span className="font-bold text-md">End date</span>
                <Input type="date" />
            </div>
        </div>
    );
}

function Participants() {
    return (
        <div class="w-full">
            <label for="step" class="text-lg font-bold">
                Participants
                <div className="flex flex-row space-x-4 items-center">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        class="range range-primary range-sm flex"
                    />
                    <input
                        type="number"
                        placeholder="1000"
                        className="px-2 py-3 bg-white w-20 font-medium"
                    />
                </div>
            </label>
        </div>
    );
}

function AddInitiative() {
    return (
        <div className="bg-white min-h-screen w-screen p-4 flex flex-col space-y-6">
            <div className="text-xl flex flex-row w-full items-center space-x-2">
                <Link href="/explore">
                    <FiArrowLeft />
                </Link>
                <span className="font-bold">New Initiative</span>
            </div>
            <div className="flex flex-col space-y-4">
                <Input
                    id="title"
                    name="text"
                    type="text"
                    required
                    placeholder="Initiative Title"
                    className="min-h-96"
                />
                <TextArea
                    id="description"
                    name="text"
                    type="text"
                    rows="7"
                    required
                    placeholder="Initiative Description"
                />
            </div>
            <Date />
            <Causes />
            <Input
                id="location"
                name="location"
                type="text"
                placeholder="Location"
            />
            <Participants />
            <Button text="Deploy" />
        </div>
    );
}

export default AddInitiative;
