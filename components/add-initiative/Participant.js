import React, { useState } from "react";
import { Input } from "../Input";

function Participants({ getParticipants, defaultValue }) {
  const [sliderValue, setSliderValue] = useState(0);

  const changeValue = (e) => {
    setSliderValue(e.target.value);
    getParticipants(Number(e.target.value));
  };

  return (
    <div className="w-full">
      <label htmlFor="step" className="text-md font-bold">
        Participants
        <div className="flex flex-row space-x-4 items-center">
          <input
            name="participants"
            type="range"
            min="10"
            max="1000"
            value={sliderValue}
            className="range range-primary range-sm flex"
            onChange={changeValue}
          />
          <div className="w-28 text-right">
            <Input
              type="number"
              placeholder={sliderValue}
              value={sliderValue}
              onChange={changeValue}
              defaultValue={defaultValue}
            />
          </div>
        </div>
      </label>
    </div>
  );
}

export default Participants;
