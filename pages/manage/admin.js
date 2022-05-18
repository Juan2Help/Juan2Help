import Head from 'next/head';
import { React } from 'react';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import {
  ModeratorList,
  ModeratorModal,
  NGODetails,
  OrganizationList,
} from '../../components/manage/ManageComponents';
import Sidebar from '../../components/Sidebar';
import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../components/ProtectedRoute';
import { GrantAccess, redirectToLogin } from '../../middleware/ProtectedRoute';
import { fetchOrganizationList } from '../../middleware/helper';
import Button from '../../components/Button';

function Admin({ sessionFromProp, organizationDetails, handledOrganizations }) {
  const session = sessionFromProp;

  const [handledModerators, setHandledModerators] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState({});
  const [selectedModerator, setSelectedModerator] = useState('');
  const [newData, setNewData] = useState(false);

  const router = useRouter();

  console.log('Handled Orgs:', handledOrganizations);

  //fetch data for moderator list
  const fetchModeratorData = async () => {
    const req = await fetch('/api/organizations/moderator-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        NGOid: selectedOrganization.id,
      }),
    });
    const fetchedModerators = await req.json();
    setHandledModerators(fetchedModerators);
  };

  // HANDLER FUNCTIONS
  const onClickOrganizationHandler = (e) => {
    setSelectedOrganization(
      handledOrganizations.find((org) => org.id === e.currentTarget.id)
    );
    setHandledModerators([]);
  };

  const onClickModeratorHandler = (e) => {
    setSelectedModerator(e.currentTarget.id);
  };

  const editOrganizationHandler = (e) => {
    router.push(`/manage/Organization/edit/${selectedOrganization}`);
  };

  const deleteOrganizationHandler = async (e) => {
    try {
      const req = await fetch('/api/organizations/delete-organization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          NGOid: selectedOrganization.id,
        }),
      });
      const body = await req.json();
      setNewData(true);
    } catch (error) {
      console.log(error);
    }

    window.location.reload(false);
    handledOrganizations.filter((org) => org.id !== selectedOrganization.id);
    setSelectedOrganization({});
  };

  const editModeratorHandler = (e) => {
    router.push(`/manage/moderator/edit/${selectedModerator}`);
  };

  const deleteModeratorHandler = async (e) => {
    try {
      const req = await fetch('/api/organizations/delete-moderator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          id: selectedModerator,
          NGOid: selectedOrganization.id,
        }),
      });
      const body = await req.json();
      fetchModeratorData();
    } catch (error) {
      console.log(error);
    }
  };

  // END OF HANDLER FUNCTIONS

  return (
    <ProtectedRoute session={session} authority={2} router={router}>
      <div className="flex flex-col min-h-screen justify-between overflow-clip">
        <div className="flex flex-col items-center">
          <Head>
            <title>Admin Dashboard</title>
          </Head>
          <Header session={session} />
          <div className="flex flex-row w-screen xl:max-w-7xl px-4 xl:px-8">
            <Sidebar active="explore" />
            <div className="relative w-full sm:w-sm md:w-xl lg:w-2xl xl:w-10/12 flex flex-col space-y-6">
              <NGODetails
                router={router}
                session={session}
                details={organizationDetails}
              />
              <span className="text-lg font-bold">Active Organizations</span>
              <OrganizationList
                organizations={handledOrganizations}
                onClickHandler={onClickOrganizationHandler}
              />
              <div className="divider text-xs text-gray-400">END</div>
              {Object.keys(selectedOrganization).length != 0 ? (
                <>
                  <NGODetails
                    router={router}
                    session={session}
                    details={selectedOrganization}
                    override={true}
                    onClickHandler={fetchModeratorData}
                  />

                  <>
                    <div className="flex flex-row gap-10">
                      <Button
                        onClick={fetchModeratorData}
                        text="Load Moderators"
                      />
                      <Button
                        onClick={deleteOrganizationHandler}
                        text="Delete Organization"
                      />
                    </div>
                  </>

                  <div className="flex flex-col space-y-2">
                    <span className="text-lg font-bold">Moderator List</span>
                    <ModeratorList
                      onClickHandler={onClickModeratorHandler}
                      moderators={handledModerators}
                      admin={true}
                      id={selectedOrganization.id}
                    />
                  </div>
                  <div className="divider text-xs text-gray-400">END</div>
                </>
              ) : (
                <>
                  <div className="flex flex-col space-y-2 text-center">
                    <span className="text-lg text-gray-500">
                      Please Select an Organization
                    </span>
                  </div>
                  <div className="divider text-xs text-gray-400">END</div>
                </>
              )}
            </div>
          </div>
        </div>
        <Navbar />
        <ModeratorModal
          editHandler={editModeratorHandler}
          deleteHandler={deleteModeratorHandler}
          admin={true}
        />
      </div>
    </ProtectedRoute>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!GrantAccess(context, session, 8)) return redirectToLogin(context);
  return {
    props: {
      sessionFromProp: session,
      organizationDetails: {
        name: 'Juan 2 Help Admin',
        description: 'Administrator of Juan 2 Help',
      },
      handledOrganizations: await fetchOrganizationList(),
    },
  };
}

export default Admin;
