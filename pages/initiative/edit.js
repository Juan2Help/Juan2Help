import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import Participants from '../../components/add-initiative/Participant';
import { Input, TextArea, Date } from '../../components/Input';
import Button from '../../components/Button';

function edit() {
    return (
        <div className="bg-white min-h-screen w-screen px-4 flex flex-col">
            <Head>
                <title>Edit Initiative</title>
            </Head>
            <div className="bg-white sticky top-0 text-xl py-4 z-50 flex flex-row w-full items-center space-x-2">
                <Link href="/explore">
                    <FiArrowLeft />
                </Link>
                <span className="font-bold">New Initiative</span>
            </div>
            <form className="space-y-5 pb-4">
                <div className="flex flex-col space-y-4">
                    <Input
                        id="title"
                        name="text"
                        type="text"
                        required
                        placeholder="Initiative Title"
                        className="min-h-96"
                    />
                    <TextArea
                        id="description"
                        name="text"
                        type="text"
                        rows="7"
                        required
                        placeholder="Initiative Description"
                    />
                </div>
                <Date />
                <Input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Location"
                />
                <div className="space-y-2">
                    <span className="font-bold text-md">Select cause</span>
                    <select class="select select-bordered w-full bg-white">
                        <option disabled selected>
                            Select cause
                        </option>
                        <option>Food</option>
                        <option>Medicine</option>
                        <option>Nature</option>
                        <option>Teach</option>
                    </select>
                </div>
                <Participants />
                <label class="label cursor-pointer">
                    <span class="font-bold text-md">Publish initiative</span>
                    <input type="checkbox" class="toggle toggle-primary" />
                </label>
                <Button text="Deploy" />
            </form>
        </div>
    );
}

export default edit;
