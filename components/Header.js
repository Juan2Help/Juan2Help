import Link from 'next/link';
import React from 'react';
import { FiBell, FiMessageCircle } from 'react-icons/fi';
import { MdAccountCircle } from 'react-icons/md';

function Header() {
    const hasMessage = false;
    const hasNotification = true;
    return (
        <div className="sticky top-0 flex flex-row items-center justify-center w-screen z-50 backdrop-filter backdrop-blur-sm bg-slate-100/95">
            <div className="flex flex-row items-center justify-center relative py-4 px-4 xl:px-8 xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-sm w-screen">
                <Link href="/explore">
                    <h1 className="cursor-pointer w-1/12 text-primary font-bold text-3xl flex-auto">
                        JUAN2HELP
                    </h1>
                </Link>
                <div className="flex flex-row items-center justify-center space-x-2">
                    <div className="rounded-full flex items-center justify-center h-10 w-10 bg-purple-100 text-primary text-xl">
                        <div className="indicator flex">
                            {hasMessage && (
                                <div class="indicator-item badge-xs badge-secondary badge">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 z-[51]"></span>
                                </div>
                            )}
                            <FiMessageCircle />
                        </div>
                    </div>
                    <div className="rounded-full flex items-center justify-center h-10 w-10 bg-purple-100 text-primary text-xl">
                        <div className="indicator">
                            {hasNotification && (
                                <div class="indicator-item badge-xs badge-secondary badge">
                                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 z-[51]"></span>
                                </div>
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
