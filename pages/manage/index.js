import Head from 'next/head';
import { React } from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import {
    InitiativeList,
    ModeratorList,
    ModalToggle,
} from '../../components/manage/ManageComponents';
import Sidebar from '../../components/Sidebar';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function index() {
    const { data: session } = useSession();
    const [handledInitiatives, setHandledInitiatives] = useState([]);
    const [selectedInitiative, setSelectedInitiative] = useState('');
    const [newData, setNewData] = useState(false);

    let test = '';

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const req = await fetch('/api/handled-initiatives', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    email: session.user.email,
                }),
            });
            const fetchedInitiatives = await req.json();
            setHandledInitiatives(fetchedInitiatives);
        };
        console.log(session);
        if (session?.user?.isModerator) fetchData();
    }, [session, newData]);

    const onClickHandler = (e) => {
        setSelectedInitiative(e.currentTarget.id);
        console.log(e.currentTarget.id);
        console.log(selectedInitiative);
    };

    const editHandler = (e) => {
        router.push(`/initiative/edit/${selectedInitiative}`);
    };

    const deleteHandler = async (e) => {
        try {
            const req = await fetch('/api/delete-initiative', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    email: session.user.email,
                    id: selectedInitiative,
                }),
            });
            const body = await req.json();
            setNewData(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen justify-between overflow-clip">
            <div className="flex flex-col items-center">
                <Head>
                    <title>Manage Initiatives</title>
                </Head>
                <Header />
                <div className="flex flex-row w-screen xl:max-w-7xl px-4 xl:px-8">
                    <Sidebar active="explore" />
                    <div className="relative w-full sm:w-sm md:w-xl lg:w-2xl xl:w-10/12 flex flex-col space-y-6">
                        <span className="text-lg font-bold">
                            Active Initiatives
                        </span>
                        <InitiativeList
                            initiatives={handledInitiatives}
                            onClickHandler={onClickHandler}
                        />
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
            <ModalToggle
                editHandler={editHandler}
                deleteHandler={deleteHandler}
            />
        </div>
    );
}

export default index;
