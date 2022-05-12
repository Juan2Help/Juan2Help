import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Participants from "../../../../components/add-initiative/Participant";
import { Input, TextArea, Date } from "../../../../components/Input";
import Button from "../../../../components/Button";
import { getSession } from "next-auth/react";
import ProtectedRoute from "../../../../components/ProtectedRoute";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GrantAccess } from "../../../../middleware/ProtectedRoute";
import { fetchJSON } from "../../../../middleware/helper";
import { geocodeByAddress } from "react-places-autocomplete";
import { getLatLng } from "react-places-autocomplete";

function edit({ sessionFromProp, data, socket }) {
  const session = sessionFromProp;
  const [initiativeData, setInitiativeData] = useState(data);
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const router = useRouter();
  console.log("data", data);

  useEffect(() => {
    console.log("SOCKET INITIALIZED", socket);
    socket?.emit("newUser", {
      userID: session?.user?._id,
    });
  }, [socket]);

  // submit initiative data to api
  const handleSubmit = async (e) => {
    //prevent default
    e.preventDefault();

    // add user email and NGO to initiative data
    initiativeData.NGOid = session.user.NGOid;
    initiativeData.location = {
      type: "Point",
      address,
      coordinates: [longitude, latitude],
    };
    initiativeData.email = session.user.email;
    initiativeData.name = session.user.name.split(" ")[0];
    //
    console.log("SENDING", initiativeData);
    // send a POST request to the api to create a new initiative
    const response = await fetch("/api/edit-initiative", {
      method: "POST",
      body: JSON.stringify(initiativeData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    socket?.emit("updateInitiative", initiativeData.participantsList);

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
    setAddress(results[0].formatted_address);
    setLatitude(lat);
    setLongitude(lng);
    console.log("results", results);
    console.log("latLng", lat, lng);
  };

  return (
    <ProtectedRoute session={session} authority={2}>
      <div className="bg-white min-h-screen w-screen px-4 flex flex-col">
        <div className="bg-white sticky top-0 text-xl py-4 z-50 flex flex-row w-full items-center space-x-2">
          <Link href="/manage">
            <FiArrowLeft className="cursor-pointer hover:text-gray-500" />
          </Link>
          <span className="font-bold">Edit Initiative</span>
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
              defaultValue={initiativeData?.title}
            />
            <TextArea
              id="description"
              name="description"
              type="text"
              rows="7"
              required
              placeholder="Initiative Description"
              onChange={handleChange}
              defaultValue={initiativeData?.description}
            />
          </div>
          <Date
            handleChange={handleChange}
            defaultValue={{
              startDate: initiativeData?.startDate,
              endDate: initiativeData?.endDate,
            }}
          />
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
                defaultValue={initiativeData?.startTime}
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
                defaultValue={initiativeData?.endTime}
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
            defaultValue={initiativeData?.location?.address}
          />
          <div className="space-y-2">
            <span className="font-bold text-md">Select cause</span>
            <select
              className="select select-bordered w-full bg-white"
              onChange={handleChange}
              name="causeType"
              defaultValue={initiativeData?.causeType || "Select cause"}
            >
              <option value="Food">Food</option>
              <option value="Medicine">Medicine</option>
              <option value="Nature">Nature</option>
              <option value="Teach">Teach</option>
            </select>
          </div>
          <Participants
            getParticipants={getParticipants}
            defaultValue={initiativeData?.participants}
          />
          <label className="label cursor-pointer">
            <span className="font-bold text-md">Publish initiative</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              name="publish"
              onChange={handleChange}
              defaultChecked={initiativeData?.publish}
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
      data: await fetchJSON(`${process.env.NEXTAUTH_URL}/api/get-initiative`, {
        id: context.query.slug[0],
      }),
    },
  };
}

export default edit;
