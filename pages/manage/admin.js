import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { Input, TextArea } from '../../components/Input';
import Button from '../../components/Button';
import { getSession, useSession } from 'next-auth/react';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { GrantAccess } from '../../middleware/ProtectedRoute';

function edit({ sessionFromProp }) {
  const session = sessionFromProp;

  const [organizationDetails, setOrganizationDetails] = useState({});
  const router = useRouter();

  // submit initiative data to api
  const handleSubmit = async (e) => {
    //prevent default
    e.preventDefault();
    // add initiative id and session user email to data
    const data = {
      ...organizationDetails,
    };

    // send a POST request to the api to create a new initiative
    const response = await fetch('/api/organizations/add', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      //redirect to login
      router.push('/manage');
    } else {
      const error = await response.json();
      console.log('error', error);
    }
    return;
  };

  const handleChange = (e) => {
    // Grab values from form and create local state
    const { name, value } = e.target;
    setOrganizationDetails({ ...organizationDetails, [name]: value });
  };

  return (
    <>
      <div className="bg-white min-h-screen w-screen px-4 flex flex-col">
        <div className="bg-white sticky top-0 text-xl py-4 z-50 flex flex-row w-full items-center space-x-2">
          <Link href="/explore">
            <FiArrowLeft />
          </Link>
          <span className="font-bold">Add Partner Organization</span>
        </div>
        <form className="space-y-5 pb-4" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Organization Name"
              className="min-h-96"
              onChange={handleChange}
            />
            <TextArea
              id="description"
              name="description"
              type="text"
              rows="7"
              required
              placeholder="Organization Description"
              onChange={handleChange}
            />
            <Input
              id="moderator"
              name="moderator"
              type="text"
              required
              placeholder="Moderator Email"
              className="min-h-96"
              onChange={handleChange}
            />
          </div>

          <Button text="Deploy" />
        </form>
      </div>
    </>
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

export default edit;
