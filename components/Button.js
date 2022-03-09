import React from 'react';
import { FcGoogle } from 'react-icons/fc';

function Button({ text, type, isGoogleSignIn, onClick }) {
    return (
        <button
            type={type}
            className={`group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-md my-2 ${
                isGoogleSignIn
                    ? 'bg-white text-slate-400 outline outline-slate-100 '
                    : 'bg-primary text-white ' +
                      'hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            }`}
            onClick={onClick}
        >
            {isGoogleSignIn && <FcGoogle className="scale-150 mr-3" />}
            {text}
        </button>
    );
}

export default Button;
