import React from 'react';
import { FiBell, FiMessageCircle } from 'react-icons/fi';
import { MdAccountCircle } from 'react-icons/md';

function Header() {
    const hasMessage = false;
    const hasNotification = true;
    return (
        <div className="sticky top-0 flex flex-row items-center justify-center w-screen z-50 backdrop-filter backdrop-blur-sm bg-slate-100/95">
            <div className="flex flex-row items-center justify-center relative p-4 xl:max-w-screen-xl xl:px-0 lg:max-w-screen-lg md:max-w-screen-sm w-screen">
                <h1 className="text-primary font-bold text-3xl flex-auto">
                    JUAN2HELP
                </h1>
                <div className="flex flex-row items-center justify-center space-x-2">
                    <div className="rounded-full flex items-center justify-center h-10 w-10 bg-purple-100 text-primary text-xl">
                        <div className="indicator">
                            {hasMessage && (
                                <span class="indicator-item badge-xs badge-secondary badge"></span>
                            )}
                            <FiMessageCircle />
                        </div>
                    </div>
                    <div className="rounded-full flex items-center justify-center h-10 w-10 bg-purple-100 text-primary text-xl">
                        <div className="indicator">
                            {hasNotification && (
                                <span class="indicator-item badge-xs badge-secondary badge"></span>
                            )}
                            <FiBell />
                        </div>
                    </div>
                    <div className="text-primary text-4xl">
                        <MdAccountCircle />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
