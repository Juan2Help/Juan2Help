import React, { useState } from "react";
import { Input } from "../Input";

function Participants({ getParticipants }) {
  const [sliderValue, setSliderValue] = useState(0);

  const changeValue = (e) => {
    setSliderValue(e.target.value);
    getParticipants(Number(e.target.value));
  };

  return (
    <div class="w-full">
      <label for="step" class="text-md font-bold">
        Participants
        <div className="flex flex-row space-x-4 items-center">
          <input
            name="participants"
            type="range"
            min="10"
            max="1000"
            value={sliderValue}
            class="range range-primary range-sm flex"
            onChange={changeValue}
          />
          <div className="w-28 text-right">
            <Input
              type="number"
              placeholder="1000"
              value={sliderValue}
              onChange={changeValue}
            />
          </div>
        </div>
      </label>
    </div>
  );
}

export default Participants;
