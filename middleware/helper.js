export async function fetchNGODetails(session) {
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
          NGOid: session.user.NGOid,
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
