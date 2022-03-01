import React from "react";

function Input({
  id,
  name,
  type,
  autoComplete,
  required,
  placeholder,
  onChange,
}) {
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
        className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 font-medium rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
