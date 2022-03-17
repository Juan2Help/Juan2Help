import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Participants from "../../../components/add-initiative/Participant";
import { Input, TextArea, Date } from "../../../components/Input";
import Button from "../../../components/Button";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import ProtectedRoute from "../../../components/ProtectedRoute";

function add() {
  const { data: session } = useSession();
  const [initiativeData, setInitiativeData] = useState({});
  const router = useRouter();

  // submit initiative data to api
  const handleSubmit = async (e) => {
    //prevent default
    e.preventDefault();

    // add user email and NGO to initiative data
    initiativeData.publisher = session.user.email;
    initiativeData.NGOname = session.user.NGOname;
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
      setErrorState({ error: true, message: error.message });
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
    <ProtectedRoute session={session} modOnly={true} router={router}>
      <Head>
        <title>Add Initiative</title>
      </Head>
      <div className="bg-white min-h-screen w-screen px-4 flex flex-col">
        <div className="bg-white sticky top-0 text-xl py-4 z-50 flex flex-row w-full items-center space-x-2">
          <Link href="/explore">
            <FiArrowLeft />
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
          <Input
            id="location"
            name="location"
            type="text"
            placeholder="Location"
            handleChange={handleChange}
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

export default add;
