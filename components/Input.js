import React from "react";

function Input({
  id,
  name,
  type,
  autoComplete,
  required,
  placeholder,
  hasError,
  onChange,
  value,
}) {
  const fail =
    "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-md font-medium focus:ring-red-500 focus:outline-none focus:border-red-500 block w-full px-4 py-3 dark:bg-red-100 dark:border-red-400 focus:border-purple-700 focus:z-10";
  const nofail =
    "appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 font-medium rounded-md focus:outline-none focus:ring-purple-700 focus:border-purple-700 focus:z-10 sm:text-sm";
  let variant = hasError ? fail : nofail;
  let isClicked = false;

  return (
    <div>
      <label htmlFor={name} className="sr-only">
        {placeholder}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className={!isClicked ? variant : nofail}
        placeholder={placeholder}
        onClick={() => {
          isClicked = !isClicked;
        }}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

function TextArea({
  id,
  name,
  autoComplete,
  required,
  placeholder,
  hasError,
  rows,
  onChange,
}) {
  const fail =
    "resize-none bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-md font-medium focus:ring-red-500 focus:outline-none focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400 focus:border-purple-700 focus:z-10";
  const nofail =
    "resize-none appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 font-medium rounded-md focus:outline-none focus:ring-purple-700 focus:border-purple-700 focus:z-10 sm:text-sm";
  let variant = hasError ? fail : nofail;
  let isClicked = false;

  return (
    <div>
      <textarea
        id={id}
        name={name}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className={!isClicked ? variant : nofail}
        onChange={onChange}
      />
    </div>
  );
}

function Date({ handleChange }) {
  return (
    <div className="w-full flex flex-row space-x-4">
      <div className="flex-1 space-y-2">
        <span className="font-bold text-md">Start date</span>
        <Input type="date" name="startDate" onChange={handleChange} />
      </div>
      <div className="flex-1 space-y-2">
        <span className="font-bold text-md">End date</span>
        <Input type="date" name="endDate" onChange={handleChange} />
      </div>
    </div>
  );
}

export { Input, TextArea, Date };
