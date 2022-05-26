import { faker } from '@faker-js/faker';
import moment from 'moment';
import { getSession, useSession } from 'next-auth/react';
import Image from 'next/image';
import { React, useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import {
  FiArrowLeft,
  FiMoreHorizontal,
  FiBookmark,
  FiClock,
  FiMapPin,
  FiChevronDown,
} from 'react-icons/fi';
import {
  GrantAccess,
  redirectToLogin,
} from '../../../middleware/ProtectedRoute';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../../../components/Header';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';

function Cover({ initiativeData, session }) {
  return (
    <>
      <div className="flex-auto w-full md:min-h-[40vh] bg-slate-500 overflow-hidden">
        <Image
          alt=""
          src={`https://picsum.photos/seed/${initiativeData._id}/2000/1000?grayscale&blur=1&random=${initiativeData._id}`}
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="md:hidden flex top-0 h-56 sticky flex-row justify-between p-4">
        <div className="p-2 h-fit rounded-full bg-purple-100 ">
          <Link href="/initiatives" passHref>
            <FiArrowLeft className="cursor-pointer hover:text-gray-500" />
          </Link>
        </div>
        {session?.user?.role >= 2 && (
          <div className="dropdown dropdown-end">
            <label tabIndex="0">
              <div className="p-2 rounded-full bg-purple-100">
                <FiMoreHorizontal />
              </div>
            </label>
            <ul
              tabIndex="0"
              className="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box w-40 mt-1"
            >
              <li>
                <a>Edit initiative</a>
              </li>
              <li>
                <Link href={`/i/${initiativeData._id}/registrants`}>
                  View registrants
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

function Body({ session, initiativeData, socket }) {
  console.log('initiativeData', initiativeData);
  const router = useRouter();

  const [buttonToggle, setButtonToggle] = useState(false);

  const [hasApplied, setHasApplied] = useState(
    initiativeData?.registrantsList?.includes(session.user._id)
  );
  const [hasJoined, setHasJoined] = useState(
    initiativeData?.participantsList?.includes(session.user._id)
  );

  const [data, setData] = useState({
    author: {
      name: initiativeData?.publisherName,
      avatar: faker.image.avatar(),
    },
    initiative: {
      date: moment(initiativeData?.startDate)
        .format('ddd, DD MMM YYYY')
        .toUpperCase(),
      time: {
        start: initiativeData?.startTime
          ? initiativeData?.startTime
          : moment(faker.time.recent(10, '12:00')).format('HH:mm'),
        end: initiativeData?.endTime
          ? initiativeData?.endTime
          : moment(faker.time.recent(10, '12:00')).format('HH:mm'),
      },
      location: {
        city:
          typeof initiativeData?.location === 'string'
            ? initiativeData?.location
            : initiativeData?.location?.address,
      },
      participants: {
        start: faker.random.number({ min: 1, max: 100 }),
        end: Number(initiativeData?.participants),
        current: Number(initiativeData?.participantsList?.length),
      },
      title: initiativeData?.title,
      description: initiativeData?.description,
      isBookmarked: Math.random() > 0.5,
    },
  });

  console.log('hasJoined', hasJoined);

  useEffect(() => {
    socket?.emit('newUser', {
      userID: session?.user?._id,
    });

    console.log('SOCKET INITIALIZED:', socket);
    socket?.on('application-decision', ({ decision }) => {
      console.log('DECISION RECEIVED:', decision);
      if (decision === 'accepted') {
        setHasJoined(true);
        setHasApplied(false);
      }
      if (decision === 'rejected') {
        setHasApplied(false);
        setHasJoined(false);
      }
    });

    return () => socket?.off('application-decision');
  }, [socket]);

  const handleJoin = async () => {
    const req = await fetch(`/api/initiatives/join-initiative`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ initiativeId: initiativeData._id }),
    });
    const res = await req.json();

    if (res.ok) {
      console.log('Joined initiative');
    } else {
      console.log('Failed to join initiative');
    }
    setButtonToggle(!buttonToggle);
  };

  const handleLeave = async () => {
    const req = await fetch(`/api/initiatives/leave-initiative`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ initiativeId: initiativeData._id }),
    });
    const res = await req.json();

    if (res.ok) {
      console.log('Left initiative');
    } else {
      console.log('Failed to leave initiative');
    }
    setHasJoined(false);
    setHasApplied(false);
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyD0aFIFNCP1-7FKoikAz1pHE33zS1FHn9I',
  });

  const [map, setMap] = useState(null);

  const center = {
    lat: initiativeData?.location?.coordinates[1] || 0,
    lng: initiativeData?.location?.coordinates[0] || 0,
  };

  console.log('location', initiativeData?.location);

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      map.setZoom(2);
      setMap(map);
    },
    [center]
  );

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <div className="p-4 flex flex-col gap-4 relative min-h-[90vh]">
      {/* TITLE */}
      <div className="flex flex-row justify-between sticky top-0 bg-base-100">
        <div className="flex flex-col">
          <div className="flex flex-row items-center">
            <div className="text-2xl font-bold">{data.initiative.title}</div>
            {session?.user?.role >= 2 && (
              <div className="dropdown dropdown-end sm:block hidden">
                <label tabIndex="0">
                  <div className="pl-2 pt-1 text-2xl cursor-pointer">
                    <FiChevronDown />
                  </div>
                </label>
                <ul
                  tabIndex="0"
                  className="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-box w-40 mt-1"
                >
                  <li>
                    <a>Edit initiative</a>
                  </li>
                  <li>
                    <Link href={`/i/${initiativeData._id}/registrants`}>
                      View registrants
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="flex flex-row items-center space-x-2">
            <span className="text-sm text-gray-400 font-bold inline">
              {data.author.name}
            </span>
            <span>·</span>
            <label className="swap text-xs font-bold">
              <input type="checkbox" value={data.initiative.isBookmarked} />
              <span className="swap-on text-primary">Follow</span>
              <span className="swap-off text-primary">Unfollow</span>
            </label>
          </div>
        </div>
        <label className="swap swap-flip text-lg">
          <input type="checkbox" value={data.initiative.isBookmarked} />
          <FiBookmark className="swap-on text-primary fill-current" />
          <FiBookmark className="swap-off" />
        </label>
      </div>
      {/* CORRESPONDENCE */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-row items-center gap-4">
          <div className="p-2 text-primary text-2xl bg-violet-100 rounded-md">
            <FiClock />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-400 font-medium overflow-clip truncate">
              {data.initiative.date}
            </span>
            <span className="text-sm font-medium overflow-clip truncate">
              {data.initiative.time.start} - {data.initiative.time.end}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="p-2 text-primary text-2xl bg-violet-100 rounded-md">
            <FiMapPin />
          </div>
          <div className="flex flex-col overflow-clip truncate">
            <span className="text-sm text-gray-400 font-medium">
              {data.initiative.location.city}
            </span>
          </div>
        </div>
      </div>
      {/* Participants */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-center">
          <div className="text-xl font-bold">Participants</div>
          {session?.user?.role > 2 && (
            <div className="text-sm font-bold text-primary">
              <Link href={`/i/${initiativeData._id}/participants`}>
                View all
              </Link>
              {/* </Link> */}
            </div>
          )}
        </div>
        <div className="flex flex-row gap-4 items-center">
          <progress
            className="progress progress-primary w-full"
            value={data.initiative.participants.current}
            max={data.initiative.participants.end}
          />
          <div className="w-fit">
            <span className="text-sm text-slate-500 font-bold">
              {data.initiative.participants.current}/
              {data.initiative.participants.end}
            </span>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="flex flex-col gap-2">
        <div className="text-xl font-bold">Description</div>
        <div className="text-justify text-slate-700 text-sm">
          <p>{data.initiative.description}</p>
        </div>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-2">
        <div className="text-xl font-bold">Location</div>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{
              height: '400px',
              width: '100%',
            }}
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <>
              <Marker
                icon={{
                  url: '/images/custom-marker.svg',
                  anchor: new google.maps.Point(17, 46),
                  scaledSize: new google.maps.Size(37, 64),
                }}
                position={center}
              />
            </>
          </GoogleMap>
        ) : (
          <></>
        )}
        <div className="text-l font-bold">{data.initiative.location.city}</div>
      </div>
      {/* Join */}
      {hasJoined ? (
        <button
          onClick={handleLeave}
          className="btn btn-primary btn-block font-bold text-white bg-red-600 border-red-600 focus:bg-red-700 focus:border-red-700 hover:bg-red-700"
        >
          Leave
        </button>
      ) : hasApplied || buttonToggle ? (
        <button
          className="btn bg-gray-300 btn-block font-bold text-white cursor-not-allowed"
          disabled
        >
          Application Sent
        </button>
      ) : (
        <button
          onClick={handleJoin}
          className="btn btn-primary btn-block font-bold text-white"
        >
          Join
        </button>
      )}
    </div>
  );
}

function initiative({ sessionFromProp, initiativeData, socket }) {
  const session = sessionFromProp;

  return (
    <>
      <Head>
        <title>{initiativeData?.title}</title>
      </Head>
      <div className="bg-base-100 min-h-screen flex flex-col items-center justify-between text-neutral overflow-clip">
        <div className="flex flex-col items-center">
          <div className="sm:block hidden sticky top-0 z-50 overflow-x-clip">
            <Header session={session} />
          </div>
          <div className="flex flex-row w-screen xl:max-w-7xl xl:px-8">
            <Sidebar active="initiatives" />
            <div className="relative w-full sm:w-sm md:w-xl lg:w-2xl xl:w-10/12 flex flex-col">
              <div className="relative w-full xl:max-w-7xl">
                <Cover session={session} initiativeData={initiativeData} />
              </div>
              <div className="flex flex-col w-full xl:max-w-7xl gap-4">
                <Body
                  session={session}
                  initiativeData={initiativeData}
                  socket={socket}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navbar active="initiatives" />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!GrantAccess(context, session)) return redirectToLogin(context);
  const initiativeId = context.params.initiative;
  console.log('initiativeId', initiativeId);

  const req = await fetch(`${process.env.NEXTAUTH_URL}/api/get-initiative`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: initiativeId,
    }),
  });

  const initiativeData = await req.json();

  return {
    props: {
      sessionFromProp: session,
      initiativeData,
    },
  };
}

export default initiative;
