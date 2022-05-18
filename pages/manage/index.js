import Head from 'next/head';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import {
  InitiativeList,
  ModeratorList,
  InitiativeModal,
  ModeratorModal,
  NGODetails,
} from '../../components/manage/ManageComponents';
import Sidebar from '../../components/Sidebar';
import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../components/ProtectedRoute';
import { GrantAccess, redirectToLogin } from '../../middleware/ProtectedRoute';
import { fetchJSON, fetchNGODetails } from '../../middleware/helper';
import { useRecoilState } from 'recoil';
import { managedInitiatives } from '../../atoms/initiatives';

function Index({ sessionFromProp, organizationDetails, socket }) {
  const session = sessionFromProp;

  const [handledInitiatives, setHandledInitiatives] =
    useRecoilState(managedInitiatives);

  const [handledModerators, setHandledModerators] = useState([]);
  const [selectedInitiative, setSelectedInitiative] = useState('');
  const [selectedModerator, setSelectedModerator] = useState('');
  const [newData, setNewData] = useState(false);

  const router = useRouter();

  // DATA FETCHING
  useEffect(() => {
    const fetchData = async () => {
      const fetchedInitiatives = await fetchJSON('/api/handled-initiatives', {
        email: session.user.email,
      });
      setHandledInitiatives(fetchedInitiatives);
    };
    if (session?.user?.role >= 2) fetchData();

    // log fetchedInitiatives
    console.log('Fetched:', handledInitiatives);
  }, [
    newData,
    handledInitiatives,
    session.user.email,
    session.user?.role,
    setHandledInitiatives,
  ]);

  //fetch data for moderator list
  useEffect(() => {
    const fetchData = async () => {
      const fetchedModerators = await fetchJSON(
        '/api/organizations/moderator-list',
        {
          email: session.user.email,
          NGOid: session.user.NGOid,
        }
      );
      setHandledModerators(fetchedModerators);
    };

    if (session?.user?.role >= 4) fetchData();
    // log fetchedModerators
  }, [newData, session.user.NGOid, session.user.email, session.user?.role]);

  // END OF DATA FETCHING

  // HANDLER FUNCTIONS
  const onClickInitiativeHandler = (e) => {
    setSelectedInitiative(e.currentTarget.id);
  };

  const onClickModeratorHandler = (e) => {
    setSelectedModerator(e.currentTarget.id);
  };

  const editInitiativeHandler = (e) => {
    router.push(`/manage/initiative/edit/${selectedInitiative}`);
  };

  const manageInitiativeHandler = (e) => {
    router.push(`/i/${selectedInitiative}`);
  };

  const deleteInitiativeHandler = async (e) => {
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
      setNewData(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editModeratorHandler = (e) => {
    router.push(`/manage/moderator/edit/${selectedModerator}`);
  };

  const deleteModeratorHandler = async (e) => {
    try {
      const body = await fetchJSON('/api/organizations/delete-moderator', {
        email: session.user.email,
        id: selectedModerator,
        NGOid: session.user.NGOid,
      });
      setNewData(true);
      setNewData(false);
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
            <title>Manage Initiatives</title>
          </Head>
          <Header session={session} socket={socket} />
          <div className="flex flex-row w-screen xl:max-w-7xl px-4 xl:px-8">
            <Sidebar active="explore" />
            <div className="relative w-full sm:w-sm md:w-xl lg:w-2xl xl:w-10/12">
              <NGODetails
                router={router}
                session={session}
                details={organizationDetails}
              />
              <div className="divider text-xs text-gray-400"></div>
              <div className="flex flex-col space-y-2 mb-10">
                <span className="text-lg font-bold">Active Initiatives</span>
                <InitiativeList
                  initiatives={handledInitiatives}
                  onClickHandler={onClickInitiativeHandler}
                />
              </div>
              {session?.user?.role <= 2 && (
                <div className="divider text-xs text-gray-400">END</div>
              )}
              {session?.user?.role >= 4 && (
                <>
                  <div className="flex flex-col space-y-2">
                    <span className="text-lg font-bold">Moderator List</span>
                    <ModeratorList
                      onClickHandler={onClickModeratorHandler}
                      moderators={handledModerators}
                    />
                  </div>
                  <div className="divider text-xs text-gray-400">END</div>
                </>
              )}
            </div>
          </div>
        </div>
        <Navbar />
        <InitiativeModal
          editHandler={editInitiativeHandler}
          deleteHandler={deleteInitiativeHandler}
          manageHandler={manageInitiativeHandler}
        />
        <ModeratorModal
          editHandler={editModeratorHandler}
          deleteHandler={deleteModeratorHandler}
        />
      </div>
    </ProtectedRoute>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!GrantAccess(context, session)) return redirectToLogin(context);
  if (session?.user?.role === 8)
    return context.res.writeHead(302, { Location: '/manage/admin' });
  return {
    props: {
      sessionFromProp: session,
      organizationDetails: await fetchNGODetails(session),
    },
  };
}

export default Index;
