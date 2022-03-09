import { React } from 'react';

function Slider() {
    return (
        <div className="flex flex-row space-x-2 items-center">
            <input
                type="range"
                id="participants"
                min="0"
                step="1"
                max="5"
                defaultValue="0"
                class="w-full h-2 bg-purple-100 appearance-none rounded-xl"
            />
            <input
                type="number"
                placeholder={1000}
                className="w-16 border rounded-md px-2 py-1 font-medium text-gray-300 text-xl"
            />
        </div>
    );
}

export default Slider;
