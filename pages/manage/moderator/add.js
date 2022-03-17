import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { Input } from '../../../components/Input';
import Button from '../../../components/Button';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../../components/ProtectedRoute';
import ConfirmAction from '../../../components/manage/ConfirmAction';

function add() {
    const { data: session } = useSession();
    const [initiativeData, setInitiativeData] = useState({});
    const router = useRouter();

    // submit initiative data to api
    const handleSubmit = async (e) => {
        //prevent default
        e.preventDefault();

        // add user email and NGO to initiative data
        initiativeData.publisher = session.user.email;
        initiativeData.NGOname = session.user.NGOname;
        // send a POST request to the api to create a new initiative
        const response = await fetch('/api/add-initiative', {
            method: 'POST',
            body: JSON.stringify(initiativeData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        //check if response is ok
        if (response.ok) {
            //redirect to login
            router.push('/initiative/manage');
        } else {
            const error = await response.json();
            console.log('error', error);
            setErrorState({ error: true, message: error.message });
        }

        return;
    };

    const getParticipants = (participants) => {
        setInitiativeData({ ...initiativeData, participants });
    };

    const handleChange = (e) => {
        // Grab values from form and create local state
        const { name, value } = e.target;
        if (name === 'publish') {
            setInitiativeData({
                ...initiativeData,
                [name]: value === 'on',
            });
            return;
        }
        setInitiativeData({ ...initiativeData, [name]: value });
    };
    return (
        <ProtectedRoute session={session} modOnly={true} router={router}>
            <Head>
                <title>Add Moderator</title>
            </Head>
            <div className="bg-white min-h-screen w-screen px-4 flex flex-col">
                <div className="bg-white sticky top-0 text-xl py-4 z-50 flex flex-row w-full items-center space-x-2">
                    <Link href="/explore">
                        <FiArrowLeft />
                    </Link>
                    <span className="font-bold">New Moderator</span>
                </div>
                <form className="space-y-5 pb-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-2">
                        <span className="font-bold text-md">
                            Select moderator
                        </span>
                        <Input
                            id="moderator_name"
                            name="moderator_name"
                            type="text"
                            required
                            placeholder="Moderator Name"
                            className="min-h-96"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <span className="font-bold text-md">Select role</span>
                        <select
                            class="select select-bordered w-full bg-white"
                            onChange={handleChange}
                            name="causeType"
                        >
                            <option disabled selected>
                                Select role
                            </option>
                            <option value="Level 1">Level 1</option>
                            <option value="Level 2">Level 2</option>
                            <option value="Level 3">Level 3</option>
                            <option value="Level 4">Level 4</option>
                        </select>
                    </div>
                    <div>
                        <label for="confirm-action" name="tile">
                            <div className="btn btn-primary btn-block text-white">
                                Save
                            </div>
                        </label>
                    </div>
                </form>
                <ConfirmAction />
            </div>
        </ProtectedRoute>
    );
}

export default add;
