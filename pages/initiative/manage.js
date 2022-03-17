import Head from 'next/head';
import { React } from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import {
    InitiativeList,
    ModalToggle,
    ModeratorList,
} from '../../components/manage/ManageComponents';
import Sidebar from '../../components/Sidebar';

function manage() {
    return (
        <div className="flex flex-col min-h-screen justify-between overflow-clip">
            <div className="flex flex-col items-center">
                <Head>
                    <title>Manage Initiatives</title>
                </Head>
                <Header />
                <div className="flex flex-row w-screen xl:max-w-7xl px-4 xl:px-8 pb-10">
                    <Sidebar active="explore" />
                    <div className="relative w-full sm:w-sm md:w-xl lg:w-2xl xl:w-10/12 flex flex-col space-y-4">
                        <div className="flex flex-col space-y-2">
                            <span className="text-lg font-bold">
                                Active Initiatives
                            </span>
                            <InitiativeList />
                        </div>
                        <div className="divider text-xs text-gray-400">END</div>
                        <div className="fle xlfex-col space-y-2">
                            <span className="text-lg font-bold">
                                Moderator List
                            </span>
                            <ModeratorList />
                        </div>
                    </div>
                </div>
            </div>
            <Navbar />
            <ModalToggle />
        </div>
    );
}

export default manage;
