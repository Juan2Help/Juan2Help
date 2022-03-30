import Head from 'next/head';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useSession } from 'next-auth/react';
import ProtectedRoute from '../components/ProtectedRoute';

function Settings() {
    const { data: session } = useSession();
    return (
        <ProtectedRoute session={session}>
            <ProtectedRoute session={session}>
            <div className="bg-base-100 min-h-screen flex flex-col items-center justify-between text-neutral overflow-clip">
                <div className="flex flex-col items-center">
                    <Head>
                        <title>Juan2Help</title>
                    </Head>
                    <Header />
                    <div className="flex flex-row w-screen xl:max-w-7xl px-4 xl:px-8">
                        <Sidebar active="explore" />
                        <div className = "flex text-center text-3xl">
                            Settings
                        </div>
                    </div>
                </div>
            </div>
            <Navbar active="explore" />
        </ProtectedRoute>
        </ProtectedRoute>
    );
}

export default Settings;