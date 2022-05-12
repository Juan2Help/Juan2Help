import { React, useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import {
  GrantAccess,
  redirectToLogin,
} from "../../../middleware/ProtectedRoute";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";
import { faker } from "@faker-js/faker";
import { FiLink, FiShare2, FiAlertTriangle } from "react-icons/fi";

function ModalToggle({ acceptHandler, rejectHandler, visitHandler }) {
  return (
    <>
      <input type="checkbox" id="registrant-options" class="modal-toggle" />
      <label for="registrant-options" class="modal cursor-pointer">
        <label class="modal-box relative" for="">
          <div className="flex flex-row justify-around pb-4">
            <div className="btn btn-outline btn-circle text-xl">
              <FiLink />
            </div>
            <div className="btn btn-outline btn-circle text-xl">
              <FiShare2 />
            </div>
            <div className="btn btn-outline btn-circle btn-error text-xl">
              <FiAlertTriangle />
            </div>
          </div>
          <div
            className="flex flex-col space-y-4 hover:cursor-pointer"
            onClick={visitHandler}
          >
            <hr />
            <a>Visit profile</a>
            <hr />
          </div>
          <ul class="bg-base-100 w-full space-y-4 mt-4 hover:cursor-pointer">
            <li onClick={acceptHandler}>
              <a>Accept</a>
            </li>
            <li onClick={rejectHandler}>
              <a>Reject</a>
            </li>
          </ul>
        </label>
      </label>
    </>
  );
}

function fakeUser() {
  const fake = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: faker.internet.avatar(),
    phone: faker.phone.phoneNumber(),
    city: faker.address.city(),
  };
  return fake;
}

function Body({ registrants, onClickHandler }) {
  const fake = {
    initiative: {
      participants: registrants,
    },
  };
  console.log("registrants: ", registrants);

  return (
    <div className="px-4 flex flex-col gap-2">
      <hr />
      {fake.initiative?.participants?.map((participant) => (
        <label
          for="registrant-options"
          className="text-xl"
          key={participant._id}
        >
          <div
            className="flex flex-col gap-2"
            id={participant._id}
            onClick={onClickHandler}
          >
            <div className="flex flex-row gap-4 items-center">
              <div className="w-20 overflow-clip rounded-full">
                <img
                  src={faker.internet.avatar()}
                  layout="fill"
                  objectFit="cover"
                  className="w-full pb-full"
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col">
                  <div className="font-bold text-xl">{`${participant.name}`}</div>
                  <div className="text-sm text-slate-600">{`${participant.email}`}</div>
                </div>
                <div className="text-sm text-slate-600">
                  <div>{`${
                    participant.phone ? participant.phone : "No contact"
                  }`}</div>
                  <div>{`${
                    participant.city ? participant.city : "No location"
                  } `}</div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </label>
      ))}
    </div>
  );
}

function Header({ initiativeTitle }) {
  const router = useRouter();
  return (
    <div className="top-0 sticky flex flex-row items-center justify-between p-4 z-50 backdrop-filter backdrop-blur-sm bg-slate-100/95">
      <div className="flex flex-row gap-2">
        <div className="py-2">
          <FiArrowLeft
            className="cursor-pointer hover:text-gray-500"
            onClick={() => router.back()}
          />
        </div>
        <div className="font-bold text-xl">{`${initiativeTitle}`}</div>
      </div>
      {/* <div className="flex flex-row gap-3 justify-end text-primary">
        <div className="font-bold text-sm">Accept All</div>
        <div className="font-bold text-sm">Reject All</div>
      </div> */}
    </div>
  );
}

function search({
  sessionFromProp,
  registrants,
  initiativeId,
  initiativeTitle,
  socket,
}) {
  const session = sessionFromProp;
  const router = useRouter();

  const [selectedRegistrant, setSelectedRegistrant] = useState(0);
  const [registrantList, setRegistrantList] = useState(registrants);

  const grabRegistrants = async () => {
    const req = await fetch("/api/initiatives/get-registants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: initiativeId,
      }),
    });
    const { userEntries } = await req.json();
    setRegistrantList(userEntries);
    return;
  };

  const onClickHandler = (e) => {
    setSelectedRegistrant(e.currentTarget.id);
    console.log("selectedRegistrant: ", selectedRegistrant);
  };

  const acceptHandler = async () => {
    const req = await fetch("/api/initiatives/approve-application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        registrantId: selectedRegistrant,
        initiativeId: initiativeId,
        name: session?.user?.name.split(" ")[0],
      }),
    });

    socket?.emit("application-decision", {
      registrantId: selectedRegistrant,
      decision: "accepted",
    });

    grabRegistrants();
  };

  const rejectHandler = async () => {
    const req = await fetch("/api/initiatives/reject-application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        registrantId: selectedRegistrant,
        initiativeId: initiativeId,
        name: session?.user?.name.split(" ")[0],
      }),
    });

    socket?.emit("application-decision", {
      registrantId: selectedRegistrant,
      decision: "rejected",
    });
    grabRegistrants();
  };

  const visitHandler = () => {
    router.push(`/u/${selectedRegistrant}`);
  };

  useEffect(() => {
    socket?.emit("newUser", {
      userID: session?.user?._id,
    });

    console.log("SOCKET INITIALIZED:", socket);
    socket?.on("getNotification", (data) => {
      return setHasNotification(true);
    });
  }, [socket]);

  return (
    <div className="flex relative flex-col min-h-screen">
      <Header initiativeTitle={initiativeTitle} />
      <Body registrants={registrantList} onClickHandler={onClickHandler} />
      <ModalToggle
        acceptHandler={acceptHandler}
        rejectHandler={rejectHandler}
        visitHandler={visitHandler}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!GrantAccess(context, session)) return redirectToLogin(context);
  const initiativeId = context.params.initiative;
  console.log("initiativeId", initiativeId);

  const req = await fetch(
    `${process.env.NEXTAUTH_URL}/api/initiatives/get-registants`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: initiativeId,
      }),
    }
  );

  const { userEntries, title } = await req.json();

  return {
    props: {
      sessionFromProp: session,
      registrants: userEntries,
      initiativeTitle: title,
      initiativeId,
    },
  };
}

export default search;
