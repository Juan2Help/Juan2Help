import Head from 'next/head';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Post from '../components/feed/Post';

function MyFeed() {
    return (
        <div className="min-h-screen flex justify-center pb-4">
            <div className="min-h-full md:px-6 lg:px-8">
                <div className="max-w-screen-md">
                    <Post />
                    <Post />
                </div>
            </div>
        </div>
    );
}

function Feed() {
    return (
        <div className="bg-base-100 min-h-screen flex flex-col items-center justify-between text-neutral">
            <Head>
                <title>Welcome Home!</title>
            </Head>
            <Header />
            <MyFeed />
            <Navbar active="feed" />
            <input type="checkbox" id="my-modal-4" class="modal-toggle" />
        </div>
    );
}

export default Feed;
