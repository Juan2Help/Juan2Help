import React from 'react';

function Input({
    id,
    name,
    type,
    autoComplete,
    required,
    placeholder,
    hasError,
    onChange,
}) {
    const fail =
        'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-md font-medium focus:ring-red-500 focus:outline-none focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400 focus:border-indigo-500 focus:z-10';
    const nofail =
        'appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 font-medium rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm';
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
            />
        </div>
    );
}

export default Input;
