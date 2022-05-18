import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import Head from 'next/head';
import { getSession, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import ConfirmAction from '../../../../components/manage/ConfirmAction';
import Button from '../../../../components/Button';
import { GrantAccess } from '../../../../middleware/ProtectedRoute';

function EditModerator({ sessionFromProp }) {
  const session = sessionFromProp;

  const [moderatorData, setModeratorData] = useState({});
  const router = useRouter();

  // submit initiative data to api
  const handleSubmit = async (e) => {
    //prevent default
    e.preventDefault();

    // add user email, NGO, and id to initiative data
    moderatorData.email = session.user.email;
    moderatorData.NGOid = session.user.NGOid;
    moderatorData.id = router.query.slug[0];

    // send a POST request to the api to create a new initiative
    const response = await fetch('/api/organizations/edit-moderator', {
      method: 'POST',
      body: JSON.stringify(moderatorData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    //check if response is ok
    if (response.ok) {
      //redirect to login
      router.push(session?.user?.role === 8 ? '/manage/admin' : '/manage');
    } else {
      const error = await response.json();
      console.log('error', error);
    }

    return;
  };

  const handleChange = (e) => {
    // Grab values from form and create local state
    const { name, value } = e.target;
    setModeratorData({ ...moderatorData, [name]: value });
  };
  return (
    <ProtectedRoute session={session} modOnly={4} router={router}>
      <Head>
        <title>Add Moderator</title>
      </Head>
      <div className="bg-white min-h-screen w-screen px-4 flex flex-col">
        <div className="bg-white sticky top-0 text-xl py-4 z-50 flex flex-row w-full items-center space-x-2">
          <Link href="/manage" passHref>
            <FiArrowLeft className="cursor-pointer hover:text-gray-500" />
          </Link>
          <span className="font-bold">Edit Role of Moderator</span>
        </div>
        <form className="space-y-5 pb-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <span className="font-bold text-md">Select role</span>
            <select
              className="select select-bordered w-full bg-white"
              onChange={handleChange}
              name="role"
            >
              <option disabled selected>
                Select role
              </option>
              <option value="2">Level 1</option>
              <option value="4">Level 2</option>
            </select>
          </div>
          <div>
            <Button text="Save" />
          </div>
        </form>
        {/* <ConfirmAction /> */}
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

export default EditModerator;
