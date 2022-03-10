import React from 'react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FiCrosshair } from 'react-icons/fi';
import {
    MdNature,
    MdOutlineFastfood,
    MdOutlineMedication,
} from 'react-icons/md';

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

export default Causes;
