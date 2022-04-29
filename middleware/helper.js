export async function fetchNGODetails(session, admin = false, NGOid = null) {
  const fetchData = async () => {
    const req = await fetch(
      `${process.env.NEXTAUTH_URL}api/organizations/get-details`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          NGOid: admin ? NGOid : session?.user?.NGOid,
          email: session.user.email,
        }),
      }
    );
    const fetchedOrganizationDetails = await req.json();
    console.log("FETCHED ORG DETAILS:", fetchedOrganizationDetails);
    return fetchedOrganizationDetails;
  };

  if (session?.user?.role >= 2) return fetchData();
  return {};
}

export async function fetchOrganizationList() {
  const req = await fetch(
    `${process.env.NEXTAUTH_URL}api/organizations/get-organization-list`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  const fetchedOrganizations = await req.json();
  console.log("FETCHED ORGANIZATIONS:", fetchedOrganizations);
  return fetchedOrganizations;
}

export async function fetchUserDetails(id) {
  const req = await fetch(`${process.env.NEXTAUTH_URL}api/user/get-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  const fetchedUserDetails = await req.json();
  console.log("FETCHED USER DETAILS:", fetchedUserDetails);
  return fetchedUserDetails;
}
