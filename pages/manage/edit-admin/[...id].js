import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { Input, TextArea } from "../../../components/Input";
import Button from "../../../components/Button";
import { getSession } from "next-auth/react";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  GrantAccess,
  redirectToLogin,
} from "../../../middleware/ProtectedRoute";
import { fetchNGODetails } from "../../../middleware/helper";

function edit({ sessionFromProp, organizationDetailsProp, NGOid }) {
  const session = sessionFromProp;

  const [organizationDetails, setOrganizationDetails] = useState(
    ...organizationDetailsProp
  );
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
    const response = await fetch("/api/organizations/edit-details", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      //redirect to login
      router.push("/manage/admin");
    } else {
      const error = await response.json();
      console.log("error", error);
    }
    return;
  };

  const handleChange = (e) => {
    // Grab values from form and create local state
    const { name, value } = e.target;
    setOrganizationDetails({ ...organizationDetails, [name]: value });
  };

  return (
    <ProtectedRoute session={session} authority={4}>
      <div className="bg-white min-h-screen w-screen px-4 flex flex-col">
        <div className="bg-white sticky top-0 text-xl py-4 z-50 flex flex-row w-full items-center space-x-2">
          <Link href="/manage">
            <FiArrowLeft className="cursor-pointer" />
          </Link>
          <span className="font-bold">Edit Partner Organization Details</span>
        </div>
        <form className="space-y-5 pb-4" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <span className="font-semibold">Organization Name</span>
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Organization Name"
              className="min-h-96"
              onChange={handleChange}
              defaultValue={organizationDetailsProp?.name}
            />
            <span className="font-semibold">Organization Details</span>
            <TextArea
              id="description"
              name="description"
              type="text"
              rows="7"
              required
              placeholder="Organization Description"
              onChange={handleChange}
              defaultValue={organizationDetailsProp?.description}
            />
          </div>

          <Button text="Deploy" />
        </form>
      </div>
    </ProtectedRoute>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!GrantAccess(context, session)) return redirectToLogin(context);

  const NGOid = context.query.id[0];

  return {
    props: {
      sessionFromProp: session,
      organizationDetailsProp: await fetchNGODetails(session, true, NGOid),
      NGOid: NGOid,
    },
  };
}

export default edit;
