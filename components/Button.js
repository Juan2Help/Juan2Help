import React from 'react';
import { FcGoogle } from 'react-icons/fc';

function Button({ text, type, isGoogleSignIn, onClick }) {
    let btn_dynamic = isGoogleSignIn
        ? 'bg-white text-slate-400 outline outline-slate-100 '
        : 'bg-indigo-600 text-white ' +
          'hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
    return (
        <button
            type={type}
            className={
                'group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-md my-2 ' +
                btn_dynamic
            }
            onClick={onClick}
        >
            {isGoogleSignIn && <FcGoogle className="scale-150 mr-3" />}
            {text}
        </button>
    );
}

export default Button;
