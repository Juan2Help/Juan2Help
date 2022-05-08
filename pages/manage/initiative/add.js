import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Participants from "../../../components/add-initiative/Participant";
import { Input, TextArea, Date } from "../../../components/Input";
import Button from "../../../components/Button";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { GrantAccess } from "../../../middleware/ProtectedRoute";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

function add({ sessionFromProp }) {
  const session = sessionFromProp;
  const [initiativeData, setInitiativeData] = useState({});
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const router = useRouter();

  // submit initiative data to api
  const handleSubmit = async (e) => {
    //prevent default
    e.preventDefault();

    // add user email and NGO to initiative data
    initiativeData.NGOid = session.user.NGOid;
    initiativeData.location = {
      address,
      latitude,
      longitude,
    };
    // send a POST request to the api to create a new initiative
    const response = await fetch("/api/add-initiative", {
      method: "POST",
      body: JSON.stringify(initiativeData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //check if response is ok
    if (response.ok) {
      //redirect to login
      router.push("/manage");
    } else {
      const error = await response.json();
      console.log("error", error);
    }

    return;
  };

  const getParticipants = (participants) => {
    setInitiativeData({ ...initiativeData, participants });
  };

  const handleChange = (e) => {
    // Grab values from form and create local state
    const { name, value } = e.target;
    if (name === "publish") {
      setInitiativeData({
        ...initiativeData,
        [name]: value === "on",
      });
      return;
    }
    setInitiativeData({ ...initiativeData, [name]: value });
  };

  const handlePlacesChange = async (address) => {
    const results = await geocodeByAddress(address);
    const { lat, lng } = await getLatLng(results[0]);
    setAddress(results[0].address_components[0].long_name);
    setLatitude(lat);
    setLongitude(lng);
    console.log("results", results);
    console.log("latLng", lat, lng);
  };

  return (
    <ProtectedRoute session={session} authority={2} router={router}>
      <Head>
        <title>Add Initiative</title>
      </Head>
      <div className="bg-white min-h-screen w-screen px-4 flex flex-col">
        <div className="bg-white sticky top-0 text-xl py-4 z-50 flex flex-row w-full items-center space-x-2">
          <Link href="/manage">
            <FiArrowLeft className="cursor-pointer hover:text-gray-500" />
          </Link>
          <span className="font-bold">New Initiative</span>
        </div>
        <form className="space-y-5 pb-4" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <Input
              id="title"
              name="title"
              type="text"
              required
              placeholder="Initiative Title"
              className="min-h-96"
              onChange={handleChange}
            />
            <TextArea
              id="description"
              name="description"
              type="text"
              rows="7"
              required
              placeholder="Initiative Description"
              onChange={handleChange}
            />
          </div>
          <Date handleChange={handleChange} />
          <div className="grid grid-flow-row grid-cols-2 gap-4">
            <div className="flex-1 space-y-2">
              <span className="font-bold text-md">Start Time</span>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                required
                placeholder="Start Time"
                className="min-h-96"
                onChange={handleChange}
              />
            </div>
            <div className="flex-1 space-y-2">
              <span className="font-bold text-md">End Time</span>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                required
                placeholder="End Time"
                className="min-h-96"
                onChange={handleChange}
              />
            </div>
          </div>
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

          <div className="space-y-2">
            <span className="font-bold text-md">Select cause</span>
            <select
              className="select select-bordered w-full bg-white"
              onChange={handleChange}
              name="causeType"
            >
              <option disabled defaultValue={"Select Cause"}>
                Select cause
              </option>
              <option value="Food">Food</option>
              <option value="Medicine">Medicine</option>
              <option value="Nature">Nature</option>
              <option value="Teach">Teach</option>
            </select>
          </div>
          <Participants getParticipants={getParticipants} />
          <label className="label cursor-pointer">
            <span className="font-bold text-md">Publish initiative</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              name="publish"
              onChange={handleChange}
            />
          </label>
          <Button text="Deploy" />
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
export default add;
