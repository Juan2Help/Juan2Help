import Head from 'next/head';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Post from '../components/feed/Post';
import Sidebar from '../components/Sidebar';
import Suggestions from '../components/feed/Suggestions';

function MyFeed() {
    return (
        <div className="w-full min-h-screen flex justify-center pb-4">
            <div className="w-full min-h-full md:px-6 lg:px-0">
                <div className="w-full">
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                </div>
            </div>
        </div>
    );
}

function Feed() {
    return (
        <div className="bg-base-100 w-full min-h-screen flex flex-col items-center justify-between text-neutral overflow-clip">
            <Head>
                <title>Welcome Home!</title>
            </Head>
            <Header />
            <div className="flex flex-row w-screen xl:max-w-7xl px-4 xl:px-8">
                <Sidebar active="feed" />
                <div className="relative w-full sm:w-sm md:w-xl lg:w-2xl xl:w-3/5 flex flex-col space-y-6">
                    <MyFeed />
                </div>
                <div className="sticky top-[72px] h-fit hidden xl:flex xl:w-2/5">
                    <Suggestions />
                </div>
            </div>
            <Navbar active="feed" />
            <input type="checkbox" id="my-modal-4" class="modal-toggle" />
        </div>
    );
}

export default Feed;
