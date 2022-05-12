import Head from "next/head";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { getSession } from "next-auth/react";
import ProtectedRoute from "../components/ProtectedRoute";
import { GrantAccess, redirectToLogin } from "../middleware/ProtectedRoute";
import { SearchBar } from "../components/Input";
import { Featured, Initiative } from "../components/explore/ExploreComponents";
import { FiFilter, FiMap } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";
import { GoPlus, GoCheck } from "react-icons/go";
import { useState, useCallback, useEffect } from "react";
import { Input } from "../components/Input";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { fetchJSON } from "../middleware/helper";
import { useRouter } from "next/router";

function InitiativesPage({
  sessionFromProp,
  newInitiativeData,
  activeInitiativeData,
  socket,
}) {
  const session = sessionFromProp;
  const [Tab, setTab] = useState("ActiveInit");
  const [FilterOpen, setFilterState] = useState(false);
  const [participantssliderValue, participantssetSliderValue] = useState(0);
  const [distancesliderValue, distancesetSliderValue] = useState(0);
  const [activeInitiatives, setActiveInitiatives] =
    useState(activeInitiativeData);
  const [newInitiatives, setNewInitiatives] = useState(newInitiativeData);
  const [nearByInitiatives, setNearByInitiatives] = useState([]);
  const [map, setMap] = useState(null);
  const [latlng, setLatLng] = useState([0, 0]);
  const router = useRouter();

  const fetchNearByInitiatives = async () => {
    const data = await fetchJSON("/api/initiatives/get-initiatives", {
      type: "2",
      center: {
        lat: latlng[0],
        lng: latlng[1],
      },
    });
    setNearByInitiatives(data);
  };

  const participantschangeValue = (e) => {
    participantssetSliderValue(e.target.value);
  };

  const distancechangeValue = (e) => {
    distancesetSliderValue(e.target.value);
  };

  const handleSearchBarChange = (e) => {
    const { value } = e.target;
    value = value.toLowerCase();
    if (value.length > 0) {
      setActiveInitiatives(
        activeInitiativeData.filter((initiative) => {
          const loc =
            typeof initiative.location === "string"
              ? initiative.location.toLowerCase()
              : initiative.location.address.toLowerCase();

          return (
            initiative?.title?.toLowerCase().includes(value) ||
            initiative?.causeType?.toLowerCase().includes(value) ||
            loc.includes(value)
          );
        })
      );
      setNewInitiatives(
        newInitiativeData.filter((initiative) => {
          const loc =
            typeof initiative.location === "string"
              ? initiative.location.toLowerCase()
              : initiative.location.address.toLowerCase();

          return (
            initiative?.title?.toLowerCase().includes(value) ||
            initiative?.causeType?.toLowerCase().includes(value) ||
            loc.includes(value)
          );
        })
      );
    } else {
      setActiveInitiatives(activeInitiativeData);
      setNewInitiatives(newInitiativeData);
    }
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_PLACES_API_KEY,
  });

  const grabLatLng = () => {
    const success = (data) => {
      setLatLng([data.coords.latitude, data.coords.longitude]);
    };
    const error = (err) => {
      console.error(err);
    };

    const data = navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 10000,
    });
  };

  const center = {
    lat: latlng[0] || 0,
    lng: latlng[1] || 0,
  };

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    map.setZoom(2);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onClickMarker = (initiative) => {
    router.push(`/i/${initiative._id}`);
  };

  useEffect(() => grabLatLng(), []);

  return (
    <ProtectedRoute session={session}>
      <div className="bg-base-100 min-h-screen flex flex-col items-center justify-between text-neutral overflow-clip">
        <div className="flex flex-col items-center">
          <Head>
            <title>Search Initiatives</title>
          </Head>
          <Header session={session} socket={socket} />
          <div className="flex flex-row w-screen xl:max-w-7xl px-4 xl:px-8">
            <Sidebar active="initiatives" />
            <div className="w-full sm:w-sm md:w-xl lg:w-2xl xl:w-10/12 flex flex-col space-y-6">
              {/*Navigation Tabs*/}
              <div className="flex flex-row w-full h-14 items-center">
                <button
                  className={`flex items-center font-semibold justify-center w-1/3 h-full cursor-pointer rounded-tl-lg hover:bg-gray-200 hover:border-gray-400 text-black border-b-2 hover:text-gray-700 border-gray-300 ${
                    Tab == "ActiveInit" &&
                    ` border-violet-700 border-b-4 text-violet-700`
                  }`}
                  onClick={() => setTab("ActiveInit")}
                >
                  <div className="flex flex-row items-center space-x-2 ">
                    <GoCheck />
                    <span>Active Initiatives</span>
                  </div>
                </button>

                <button
                  className={`flex items-center font-semibold justify-center w-1/3 h-full cursor-pointer rounded-tl-lg hover:bg-gray-200 hover:border-gray-400 text-black border-b-2  hover:text-gray-700 border-gray-300 ${
                    Tab == "NewInit" &&
                    ` border-violet-700 border-b-4 text-violet-700`
                  }`}
                  onClick={() => setTab("NewInit")}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <GoPlus />
                    <span>Join New Initiatives</span>
                  </div>
                </button>

                <button
                  className={`flex items-center font-semibold justify-center w-1/3 h-full cursor-pointer rounded-tl-lg hover:bg-gray-200 hover:border-gray-400 text-black border-b-2  hover:text-gray-700 border-gray-300 ${
                    Tab == "MapInit" &&
                    ` border-violet-700 border-b-4 text-violet-700`
                  }`}
                  onClick={() => {
                    setTab("MapInit");
                    grabLatLng();
                    fetchNearByInitiatives();
                  }}
                >
                  <div className="flex flex-row items-center space-x-2">
                    <FiMap />
                    <span>Initiative Map</span>
                  </div>
                </button>
              </div>
              {/*Search bar and filter*/}
              {(Tab == "ActiveInit" || Tab == "NewInit") && (
                <>
                  <div className="flex justify-between w-full">
                    <div className="flex flex-row w-full items-center space-x-4">
                      <SearchBar handleChange={handleSearchBarChange}/>
                      <button
                        className="hover:cursor-pointer w-1/8"
                        onClick={() => setFilterState(!FilterOpen)}
                      >
                        {FilterOpen == false && (
                          <div className="flex flex-row space-x-1 text-gray-900 hover:text-gray-500">
                            <FiFilter className="text-2xl" />
                            <span className="hidden md:inline">Filters</span>
                          </div>
                        )}
                        {FilterOpen == true && (
                          <div className="flex flex-row space-x-1 text-purple-700 hover:text-purple-400 items-center transition ease-in-out duration-300">
                            <FaFilter className="text-xl " />
                            <span className="hidden md:inline font-medium">
                              Filters
                            </span>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
              {FilterOpen == true && (
                <>
                  <div className="flex flex-row justify-left w-full">
                    <div className="w-1/6 space-y-1">
                      <span className="font-semibold">Category</span>
                      <ul>
                        <li>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="Food"
                              name="Food"
                              className="accent-primary h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <span className="ml-1 text-md text-gray-900">
                              Food
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="Medicine"
                              name="Medicine"
                              className="accent-primary h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <span className="ml-1 text-md text-gray-900">
                              Medicine
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="Nature"
                              name="Nature"
                              className="accent-primary h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <span className="ml-1 text-md text-gray-900">
                              Nature
                            </span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="Teach"
                              name="Teach"
                              className="accent-primary h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                            />
                            <span className="ml-1 text-md text-gray-900">
                              Teach
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="w-1/2 space-y-5">
                      <div className="space-y-1">
                        <span className="font-semibold">Participants</span>
                        <div className="flex items-center space-x-3">
                          <input
                            name="participants"
                            type="range"
                            min="10"
                            max="1000"
                            value={participantssliderValue}
                            className="range range-primary range-sm flex"
                            onChange={participantschangeValue}
                          />
                          <div className="w-28 text-right">
                            <Input
                              type="number"
                              placeholder="1000"
                              value={participantssliderValue}
                              onChange={participantschangeValue}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="font-semibold">Distance</span>
                        <div className="flex items-center space-x-3">
                          <input
                            name="distance"
                            type="range"
                            min="10"
                            max="1000"
                            value={distancesliderValue}
                            className="range range-primary range-sm flex"
                            onChange={distancechangeValue}
                          />
                          <div className="w-28 text-right">
                            <Input
                              type="number"
                              placeholder="1000 km"
                              value={distancesliderValue}
                              onChange={distancechangeValue}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr></hr>
                </>
              )}
              {Tab == "ActiveInit" && (
                <>
                  <div className="grid min-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 justify-items-center">
                    {activeInitiatives.map((initiative) => (
                      <Initiative
                        key={initiative.id}
                        initiativeData={initiative}
                      />
                    ))}
                  </div>
                </>
              )}
              {Tab == "NewInit" && (
                <>
                  <div className="grid min-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 justify-items-center">
                    {newInitiatives.map((initiative) => (
                      <Initiative
                        key={initiative.id}
                        initiativeData={initiative}
                      />
                    ))}
                  </div>
                </>
              )}
              {Tab == "MapInit" &&
                (isLoaded ? (
                  <>
                    <GoogleMap
                      mapContainerStyle={{
                        height: "600px",
                        width: "100%",
                        borderRadius: "25px",
                      }}
                      center={center}
                      onLoad={onLoad}
                      onUnmount={onUnmount}
                    >
                      {/* Child components, such as markers, info windows, etc. */}
                      <>
                        {nearByInitiatives?.map((initiative) => (
                          <Marker
                            key={initiative.id}
                            icon={{
                              url: "/images/custom-marker.svg",
                              anchor: new google.maps.Point(17, 46),
                              scaledSize: new google.maps.Size(37, 64),
                              labelOrigin: new google.maps.Point(25, 60),
                            }}
                            position={{
                              lat: initiative?.location?.coordinates[1],
                              lng: initiative?.location?.coordinates[0],
                            }}
                            label={initiative?.title}
                            onClick={() => onClickMarker(initiative)}
                          />
                        ))}
                      </>
                    </GoogleMap>
                  </>
                ) : (
                  <>
                    <div>Script Not Loaded!</div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Navbar active="initiatives" />
    </ProtectedRoute>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!GrantAccess(context, session)) return redirectToLogin(context);

  //grab total number of pages from /api/initiatives/get-initiatives
  const getInitiatives = async (type) => {
    const req = await fetch(
      `${process.env.NEXTAUTH_URL}/api/initiatives/get-initiatives`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page: 1,
          type: type,
          userId: session?.user?._id,
        }),
      }
    );
    const data = await req.json();
    return data;
  };

  return {
    props: {
      sessionFromProp: session,
      newInitiativeData: await getInitiatives("1"),
      activeInitiativeData: await getInitiatives("3"),
    },
  };
}

export default InitiativesPage;
