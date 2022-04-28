import { React } from 'react';
import { getSession } from 'next-auth/react';
import { GrantAccess } from '../../middleware/ProtectedRoute';

function Body() {}

function search({ sessionFromProp }) {
  const session = sessionFromProp;
  return (
    <div className="flex relative flex-col min-h-screen">
      <Body />
    </div>
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

export default search;
