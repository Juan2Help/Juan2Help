import Link from "next/link";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { FiArrowLeft } from "react-icons/fi";
import { Input, TextArea } from "../../../components/Input";
import Button from "../../../components/Button";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { GrantAccess } from "../../../middleware/ProtectedRoute";
import { useState } from "react";
import { useRouter } from "next/router";
import { fetchUserDetails } from "../../../middleware/helper";
import { geocodeByAddress } from "react-places-autocomplete";
import { getLatLng } from "react-places-autocomplete";

function Profile({ sessionFromProp, userDetails }) {
  const session = sessionFromProp;

  const [accountDetails, setAccountDetails] = useState(userDetails);
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const router = useRouter();

  // submit initiative data to api
  const handleSubmit = async (e) => {
    //prevent default
    e.preventDefault();
    // add initiative id and session user email to data
    const data = {
      ...accountDetails,
    };

    (data.location = {
      type: "Point",
      address,
      coordinates: [longitude, latitude],
    }),
      console.log("SENDING", data);

    // send a POST request to the api to create a new initiative
    const response = await fetch("/api/user/update-account", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      //redirect to login
      // router.push(`/u/${session.user._id}`);
    } else {
      const error = await response.json();
      console.log("error", error);
    }
    return;
  };

  const handlePlacesChange = async (address) => {
    const results = await geocodeByAddress(address);
    const { lat, lng } = await getLatLng(results[0]);
    setAddress(results[0].formatted_address);
    setLatitude(lat);
    setLongitude(lng);
    console.log("results", results);
    console.log("latLng", lat, lng);
  };

  const handleChange = (e) => {
    // Grab values from form and create local state
    const { name, value } = e.target;
    setAccountDetails({ ...accountDetails, [name]: value });
  };

  return (
    <ProtectedRoute session={session} authority={1}>
      <Head>
        <title>Edit Profile</title>
      </Head>
      <div className="bg-white min-h-screen w-screen px-4 flex flex-col">
        <div className="bg-white sticky top-0 text-xl py-4 z-50 flex flex-row w-full items-center space-x-2">
          <Link href={`/u/${session?.user?._id}`} passHref>
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
              defaultValue={userDetails.name}
              onChange={handleChange}
            />
            <span className="font-semibold">Bio</span>
            <TextArea
              id="bio"
              name="bio"
              type="text"
              rows="3"
              placeholder="Bio"
              defaultValue={userDetails.bio}
              onChange={handleChange}
            />
            <span className="font-semibold">Location</span>
            <Input
              id="location"
              name="location"
              type="text"
              required
              className="min-h-96"
              placeholder="Location"
              isLocation={true}
              onChange={setAddress}
              value={address}
              onSelect={handlePlacesChange}
            />
            <span className="font-semibold">Phone Number</span>
            <Input
              id="phone"
              name="mobileNumber"
              type="text"
              placeholder="Phone"
              className="min-h-96"
              defaultValue={userDetails.mobileNumber}
              onChange={handleChange}
            />
            <span className="font-semibold">Birthday</span>
            <Input
              id="date"
              type="date"
              name="birthday"
              placeholder="Birthday"
              defaultValue={userDetails.birthday}
              onChange={handleChange}
            />
            <span className="font-semibold">Hobbies</span>
            <TextArea
              id="hobbies"
              name="hobbies"
              type="text"
              rows="3"
              placeholder="Hobbies"
              defaultValue={userDetails.bio}
              onChange={handleChange}
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
      userDetails: await fetchUserDetails(session?.user?._id),
    },
  };
}

export default Profile;
