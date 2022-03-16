import Head from 'next/head';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Causes from '../components/Causes';
import {
    Featured,
    Initiatives,
    TopOrganizers,
} from '../components/explore/ExploreComponents';

function Explore() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-between text-neutral overflow-clip">
            <div className="flex flex-col items-center">
                <Head>
                    <title>Welcome Explore!</title>
                </Head>
                <Header />
                <div className="flex flex-row w-screen xl:max-w-7xl px-4 xl:px-8">
                    <Sidebar active="explore" />
                    <div className="relative w-full sm:w-sm md:w-xl lg:w-2xl xl:w-10/12 flex flex-col space-y-6">
                        <Featured />
                        <TopOrganizers />
                        <Causes />
                        <Initiatives />
                    </div>
                </div>
            </div>
            <Navbar active="explore" />
        </div>
    );
}

export default Explore;
