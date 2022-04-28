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

function add({ sessionFromProp }) {
  const session = sessionFromProp;
  const [initiativeData, setInitiativeData] = useState({});
  const router = useRouter();

  // submit initiative data to api
  const handleSubmit = async (e) => {
    //prevent default
    e.preventDefault();

    // add user email and NGO to initiative data
    initiativeData.NGOid = session.user.NGOid;
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
                id="start_time"
                name="start_time"
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
                id="end_time"
                name="end_time"
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
            placeholder="Location"
            onChange={handleChange}
          />
          <div className="space-y-2">
            <span className="font-bold text-md">Select cause</span>
            <select
              class="select select-bordered w-full bg-white"
              onChange={handleChange}
              name="causeType"
            >
              <option disabled selected>
                Select cause
              </option>
              <option value="Food">Food</option>
              <option value="Medicine">Medicine</option>
              <option value="Nature">Nature</option>
              <option value="Teach">Teach</option>
            </select>
          </div>
          <Participants getParticipants={getParticipants} />
          <label class="label cursor-pointer">
            <span class="font-bold text-md">Publish initiative</span>
            <input
              type="checkbox"
              class="toggle toggle-primary"
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
