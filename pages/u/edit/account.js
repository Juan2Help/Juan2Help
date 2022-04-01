import Link from 'next/link';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { FiArrowLeft } from 'react-icons/fi';
import { Input, TextArea } from '../../../components/Input';
import Button from '../../../components/Button';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { GrantAccess } from '../../../middleware/ProtectedRoute';

function account({ sessionFromProp }) {
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
            <span className="font-semibold">Username</span>
            <Input
              id="username"
              name="username"
              type="text"
              required
              placeholder="Username"
              className="min-h-96"
              defaultValue={session?.user?.username}
            />
            <span className="font-semibold">Email</span>
            <Input
              id="email"
              name="email"
              type="text"
              required
              placeholder="Email"
              className="min-h-96"
              defaultValue={session?.user?.email}
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

export default account;
