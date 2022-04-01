import Link from 'next/link';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { FiArrowLeft } from 'react-icons/fi';
import { Input, TextArea } from '../../../components/Input';
import Button from '../../../components/Button';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { GrantAccess } from '../../../middleware/ProtectedRoute';

function profile({ sessionFromProp }) {
  const session = sessionFromProp;

  const handleSubmit = async (e) => {};

  return (
    <ProtectedRoute session={session} authority={4}>
      <Head>
        <title>Edit Profile</title>
      </Head>
      <div className="bg-white min-h-screen w-screen px-4 flex flex-col">
        <div className="bg-white sticky top-0 text-xl py-4 z-50 flex flex-row w-full items-center space-x-2">
          <Link href={`/u/${session?.user?.username}`}>
            <FiArrowLeft className="cursor-pointer" />
          </Link>
          <span className="font-bold">Edit Profile</span>
        </div>
        <form className="space-y-5 pb-4" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Name</span>
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Name"
              className="min-h-96"
              defaultValue={session?.user?.name}
            />
            <span className="font-semibold">Bio</span>
            <TextArea
              id="bio"
              name="bio"
              type="text"
              rows="3"
              placeholder="Bio"
              defaultValue={session?.user?.bio}
            />
            <span className="font-semibold">Location</span>
            <Input
              id="location"
              name="location"
              type="text"
              required
              placeholder="Location"
              className="min-h-96"
              defaultValue={session?.user?.location}
            />
            <span className="font-semibold">Phone Number</span>
            <Input
              id="phone"
              name="phone"
              type="text"
              placeholder="Phone"
              className="min-h-96"
              defaultValue={session?.user?.phone}
            />
            <span className="font-semibold">Birthday</span>
            <Input
              id="date"
              type="date"
              name="birthday"
              placeholder="Birthday"
              defaultValue={session?.user?.birthday}
            />
            <span className="font-semibold">Hobbies</span>
            <TextArea
              id="hobbies"
              name="hobbies"
              type="text"
              rows="3"
              placeholder="Hobbies"
              defaultValue={session?.user?.bio}
            />
          </div>

          <Button text="Save" />
        </form>
      </div>
    </ProtectedRoute>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  GrantAccess(context, session);
  return {
    props: {
      sessionFromProp: session,
    },
  };
}

export default profile;
