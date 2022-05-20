import Head from 'next/head';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { getSession } from 'next-auth/react';
import ProtectedRoute from '../components/ProtectedRoute';
import { GrantAccess, redirectToLogin } from '../middleware/ProtectedRoute';
import { SearchBar } from '../components/Input';
import { Initiative } from '../components/explore/ExploreComponents';
import { FiFilter, FiMap, FiStar, FiTarget } from 'react-icons/fi';
import { FaFilter } from 'react-icons/fa';
import { useState, useCallback, useEffect } from 'react';
import { Input } from '../components/Input';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { fetchJSON } from '../middleware/helper';
import { useRouter } from 'next/router';

const getInitiatives = async (type, session) => {
  const req = await fetch(`/api/initiatives/get-initiatives`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      page: 1,
      type: type,
      userId: session?.user?._id,
    }),
  });
  const data = await req.json();
  return data;
};

function InitiativesPage({ sessionFromProp, socket, bookmarkList }) {
  const session = sessionFromProp;
  const [Tab, setTab] = useState('ActiveInit');
  const [FilterOpen, setFilterState] = useState(false);
  const [participantssliderValue, participantssetSliderValue] = useState(1000);
  const [activeInitiatives, setActiveInitiatives] = useState([]);
  const [newInitiatives, setNewInitiatives] = useState([]);
  const [nearByInitiatives, setNearByInitiatives] = useState([]);
  const [searchquery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [map, setMap] = useState(null);
  const [latlng, setLatLng] = useState([0, 0]);
  const router = useRouter();

  const initializeData = async () => {
    setActiveInitiatives(await getInitiatives('3', session));
    setNewInitiatives(await getInitiatives('1', session));
  };

  const fetchNearByInitiatives = async () => {
    const data = await fetchJSON('/api/initiatives/get-initiatives', {
      type: '2',
      center: {
        lat: latlng[0],
        lng: latlng[1],
      },
    });
    setNearByInitiatives(data);
  };

  const participantschangeValue = (e) => {
    const { value } = e.target;
    participantssetSliderValue(value);
    setActiveInitiatives(
      activeInitiativeData.filter(
        (initiative) =>
          initiative?.title?.toLowerCase().includes(searchquery) &&
          initiative?.participants <= value &&
          (category != 'all'
            ? initiative?.causeType?.toLowerCase().includes(category)
            : 1)
      )
    );
    setNewInitiatives(
      newInitiativeData.filter(
        (initiative) =>
          initiative?.title?.toLowerCase().includes(searchquery) &&
          initiative?.participants <= value &&
          (category != 'all'
            ? initiative?.causeType?.toLowerCase().includes(category)
            : 1)
      )
    );
  };

  const categoryHandleChange = (e) => {
    const { value } = e.target;
    value = value.toLowerCase();
    setCategory(value);
    if (value == 'all') {
      setActiveInitiatives(
        activeInitiativeData.filter((initiative) => {
          return (
            initiative?.title?.toLowerCase().includes(searchquery) &&
            initiative?.participants <= participantssliderValue
          );
        })
      );
      setNewInitiatives(
        newInitiativeData.filter((initiative) => {
          return (
            initiative?.title?.toLowerCase().includes(searchquery) &&
            initiative?.participants <= participantssliderValue
          );
        })
      );
    } else {
      setActiveInitiatives(
        activeInitiativeData.filter((initiative) => {
          return (
            initiative?.title?.toLowerCase().includes(searchquery) &&
            initiative?.causeType?.toLowerCase().includes(value) &&
            initiative?.participants <= participantssliderValue
          );
        })
      );
      setNewInitiatives(
        newInitiativeData.filter((initiative) => {
          return (
            initiative?.title?.toLowerCase().includes(searchquery) &&
            initiative?.causeType?.toLowerCase().includes(value) &&
            initiative?.participants <= participantssliderValue
          );
        })
      );
    }
  };

  const handleSearchBarChange = (e) => {
    const { value } = e.target;
    value = value.toLowerCase();
    setSearchQuery(value);
    if (value.length > 0) {
      setActiveInitiatives(
        activeInitiativeData.filter((initiative) => {
          const loc =
            typeof initiative.location === 'string'
              ? initiative.location.toLowerCase()
              : initiative.location.address.toLowerCase();

          return (
            (initiative?.title?.toLowerCase().includes(value) ||
              loc.includes(value)) &&
            (category != 'all'
              ? initiative?.causeType?.toLowerCase().includes(category)
              : 1) &&
            initiative?.participants <= participantssliderValue
          );
        })
      );
      setNewInitiatives(
        newInitiativeData.filter((initiative) => {
          const loc =
            typeof initiative.location === 'string'
              ? initiative.location.toLowerCase()
              : initiative.location.address.toLowerCase();

          return (
            (initiative?.title?.toLowerCase().includes(value) ||
              loc.includes(value)) &&
            (category != 'all'
              ? initiative?.causeType?.toLowerCase().includes(category)
              : 1) &&
            initiative?.participants <= participantssliderValue
          );
        })
      );
    } else {
      setActiveInitiatives(
        activeInitiativeData.filter((initiative) => {
          return (
            (category != 'all'
              ? initiative?.causeType?.toLowerCase().includes(category)
              : 1) && initiative?.participants <= participantssliderValue
          );
        })
      );
      setNewInitiatives(
        newInitiativeData.filter((initiative) => {
          return (
            (category != 'all'
              ? initiative?.causeType?.toLowerCase().includes(category)
              : 1) && initiative?.participants <= participantssliderValue
          );
        })
      );
    }
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyD0aFIFNCP1-7FKoikAz1pHE33zS1FHn9I',
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

  const onClickMarker = (initiative) => {
    router.push(`/i/${initiative._id}`);
  };

  useEffect(() => {
    grabLatLng();
    initializeData();
  }, []);

  return (
    <ProtectedRoute session={session}>
      <div className="bg-base-100 min-h-screen flex flex-col items-center justify-between text-neutral overflow-clip">
        <div className="flex flex-col items-center">
          <Head>
            <title>Search Initiatives</title>
          </Head>
          <Header session={session} socket={socket} />
          <div className="flex flex-row w-screen xl:max-w-7xl px-4 xl:px-8 lg:gap-0 gap-4">
            <Sidebar active="initiatives" />
            <div className="w-full sm:w-sm md:w-xl lg:w-2xl xl:w-10/12 flex flex-col space-y-6">
              {/*Navigation Tabs*/}
              <div className="flex flex-row w-full h-14 items-center">
                <button
                  className={`flex items-center font-semibold justify-center w-1/3 h-full cursor-pointer rounded-tl-lg hover:bg-gray-200 hover:border-gray-400 text-black border-b-2 hover:text-gray-700 border-gray-300 ${
                    Tab == 'ActiveInit' &&
                    ` border-violet-700 border-b-4 text-violet-700`
                  }`}
                  onClick={() => setTab('ActiveInit')}
                >
                  <div className="flex flex-row items-center gap-2 ">
                    <FiStar />
                    <span>Active</span>
                  </div>
                </button>

                <button
                  className={`flex items-center font-semibold justify-center w-1/3 h-full cursor-pointer rounded-tl-lg hover:bg-gray-200 hover:border-gray-400 text-black border-b-2  hover:text-gray-700 border-gray-300 ${
                    Tab == 'NewInit' &&
                    ` border-violet-700 border-b-4 text-violet-700`
                  }`}
                  onClick={() => setTab('NewInit')}
                >
                  <div className="flex flex-row items-center gap-2">
                    <FiTarget />
                    <span>Join</span>
                  </div>
                </button>

                <button
                  className={`flex items-center font-semibold justify-center w-1/3 h-full cursor-pointer rounded-tl-lg hover:bg-gray-200 hover:border-gray-400 text-black border-b-2  hover:text-gray-700 border-gray-300 ${
                    Tab == 'MapInit' &&
                    ` border-violet-700 border-b-4 text-violet-700`
                  }`}
                  onClick={() => {
                    setTab('MapInit');
                    grabLatLng();
                    fetchNearByInitiatives();
                  }}
                >
                  <div className="flex flex-row items-center gap-2">
                    <FiMap />
                    <span>Map</span>
                  </div>
                </button>
              </div>
              {/*Search bar and filter*/}
              {(Tab == 'ActiveInit' || Tab == 'NewInit') && (
                <>
                  <div className="flex justify-between w-full">
                    <div className="flex flex-row w-full items-center space-x-2">
                      <SearchBar handleChange={handleSearchBarChange} />
                      <button
                        className="hover:cursor-pointer w-1/8"
                        onClick={() => setFilterState(!FilterOpen)}
                      >
                        {FilterOpen == false && (
                          <div className="px-4 py-3 rounded-md hover:bg-gray-100 flex flex-row items-center gap-1 text-gray-900 hover:text-gray-500">
                            <FiFilter className="text-lg" />
                            <span className="hidden md:inline">Filters</span>
                          </div>
                        )}
                        {FilterOpen == true && (
                          <div className="px-4 py-3 bg-purple-100 rounded-md text-primary flex flex-row items-center gap-1 hover:text-purple-400 transition ease-in-out duration-300">
                            <FiFilter className="text-lg" />
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
                  <div className="sm:flex sm:gap-10 gap-5 flex-row grid grid-flow-row grid-cols-1 justify-left w-full">
                    <div className="sm:w-1/6 flex flex-col gap-3">
                      <span className="font-semibold">Category</span>
                      <select
                        className="select select-bordered w-full bg-white"
                        onChange={categoryHandleChange}
                        name="causeType"
                        defaultValue="All"
                      >
                        <option value="All">All</option>
                        <option value="Food">Food</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Nature">Nature</option>
                        <option value="Teach">Teach</option>
                      </select>
                    </div>
                    <div className="flex-1 space-y-5">
                      <div className="flex flex-col gap-3">
                        <span className="font-semibold">
                          Maximum Participants
                        </span>
                        <div className="flex items-center space-x-3">
                          <input
                            name="participants"
                            type="range"
                            min="0"
                            max="1000"
                            value={participantssliderValue}
                            className="range range-primary range-sm flex"
                            onChange={participantschangeValue}
                          />
                          <div className="w-28 text-right">
                            <Input
                              type="number"
                              placeholder={participantssliderValue}
                              value={participantssliderValue}
                              onChange={participantschangeValue}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr></hr>
                </>
              )}
              {Tab == 'ActiveInit' && (
                <>
                  <div className="grid min-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 justify-items-center">
                    {activeInitiatives?.map((initiative) => (
                      <Initiative
                        key={initiative.id}
                        initiativeData={initiative}
                        bookmarkList={bookmarkList}
                      />
                    ))}
                  </div>
                </>
              )}
              {Tab == 'NewInit' && (
                <>
                  <div className="grid min-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 justify-items-center">
                    {newInitiatives?.map((initiative) => (
                      <Initiative
                        key={initiative.id}
                        initiativeData={initiative}
                        bookmarkList={bookmarkList}
                      />
                    ))}
                  </div>
                </>
              )}
              {Tab == 'MapInit' &&
                (isLoaded ? (
                  <>
                    <GoogleMap
                      mapContainerStyle={{
                        height: '600px',
                        width: '100%',
                        borderRadius: '25px',
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
                              url: '/images/custom-marker.svg',
                              anchor: new google.maps.Point(17, 46),
                              scaledSize: new google.maps.Size(37, 64),
                              labelOrigin: new google.maps.Point(25, 60),
                            }}
                            position={{
                              lat: initiative?.location?.coordinates[1],
                              lng: initiative?.location?.coordinates[0],
                            }}
                            // label={initiative?.title}
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
  return {
    props: {
      sessionFromProp: session,
      bookmarkList: await fetchJSON(
        `${process.env.NEXTAUTH_URL}/api/user/list-bookmarks`,
        { id: session.user._id }
      ),
    },
  };
}

export default InitiativesPage;
