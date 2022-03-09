import React from 'react';

function ErrorMessage({ text, isInformation, hasError }) {
    const def = 'mt-2 text-sm text-error dark:text-red-500 font-medium';
    return (
        <p className={hasError ? def : 'hidden'}>
            {isInformation ? (
                <svg
                    className="inline w-4 h-4 mr-2 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    x="0"
                    y="0"
                    viewBox="0 0 1200 1200"
                >
                    <path d="M1196.1,600.9c-0.3,324.7-262.4,590.1-590.3,589.9c-325.7-0.2-589.6-263.1-589.5-590.2C16.4,273.1,281.4,11.1,606.3,11   C931.9,10.9,1196.1,275.3,1196.1,600.9z M708.1,730.1c0-72.7-0.1-145.3,0.1-218c0.1-27.5-9.7-50.8-30-68.9   c-32-28.6-69.2-34.6-109.1-20.5c-38.1,13.5-63.6,50.1-63.4,91.5c0.8,144.8,0.4,289.6,0.2,434.4c0,81.8,70.1,95.6,103.6,95.5   c50.4-0.2,99.9-40.8,98.9-99.1C707.1,873.4,708.1,801.7,708.1,730.1z M715,265.5c-0.1-60.4-48.3-108.5-108.8-108.5   c-60.6,0-109,48.5-108.9,109.1c0.1,59.9,49,108.7,109,108.7C666.7,374.8,715,326.2,715,265.5z" />
                </svg>
            ) : (
                <></>
            )}
            {text}
        </p>
    );
}

export default ErrorMessage;
