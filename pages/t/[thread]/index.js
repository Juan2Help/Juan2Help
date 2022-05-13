import Head from "next/head";
import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import faker from "@faker-js/faker";
import { getSession } from "next-auth/react";
import ProtectedRoute from "../../../components/ProtectedRoute";
import {
  GrantAccess,
  redirectToLogin,
} from "../../../middleware/ProtectedRoute";
import Link from "next/link";
import moment from "moment";
import {
  FiChevronDown,
  FiMapPin,
  FiPhone,
  FiMail,
  FiSend,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchJSON } from "../../../middleware/helper";
import Button from "../../../components/Button";

function MessageItem({ threadData, onClick }) {
  const time = moment(faker.time.recent(10, "12:00"));
  const parsedTime =
    time.startOf("hour").fromNow()[0] != "i"
      ? time.startOf("hour").fromNow()
      : time.endOf("day").fromNow();
  const tileData = {
    message: {
      content: faker.lorem.sentence(),
      name: threadData.name,
      avatar: faker.image.avatar(),
      href: threadData.threadID,
      id: faker.datatype.uuid(),
    },
  };
  return (
    <>
      <div
        onClick={() =>
          onClick({ avatar: tileData.message.avatar, ...threadData })
        }
        className="w-full flex flex-row gap-4 py-2 px-2 hover:bg-[#e9eaeb] rounded-md cursor-pointer overflow-clip"
      >
        <img
          src={tileData.message.avatar}
          alt="avatar"
          className="rounded-full w-12 h-12"
          object-fit="cover"
        />
        <div className="flex flex-col w-9/12">
          <div>
            <span className="font-bold">{tileData.message.name}</span>{" "}
          </div>
          <div className="flex flex-row text-gray-500 text-xs gap-1 items-center">
            <div className="max-w-min truncate">Connect with me!</div>
          </div>
        </div>
      </div>
    </>
  );
}

function MessageList({ activeThreads, onClick, fetchedSearch, nameSearch }) {
  return (
    <>
      {nameSearch?.length > 0 && (
          <div className="text-center text-gray-500 border-y-[0.5px] border-solid border-gray-200">
            Connect with them
          </div>
        ) &&
        (fetchedSearch.length > 0 ? (
          fetchedSearch.map((user) => (
            <MessageItem
              key={user.threadID}
              threadData={user}
              onClick={onClick}
            />
          ))
        ) : (
          <div className="text-center text-gray-500">No contacts found.</div>
        ))}
      <div className="text-center text-gray-500 border-y-[0.5px] border-solid border-gray-200">
        Active Messages
      </div>
      <div>
        {activeThreads?.length > 0 ? (
          activeThreads.map((thread) => (
            <MessageItem
              key={thread.threadID}
              onClick={onClick}
              threadData={thread}
            />
          ))
        ) : (
          <div className="text-center text-gray-500">No messages</div>
        )}
      </div>
    </>
  );
}

function MessageThread({ user, onClick, onChange, threadData, messages }) {
  const data = {
    thread: {
      receiver: {
        name: threadData.name || "Send a Message",
        avatar: threadData.avatar,
      },
      messages: messages,
      href: faker.internet.domainName(),
    },
  };

  return (
    <>
      <div className="w-full border-b border-gray-100">
        <div className="py-3 px-4 flex flex-row gap-3">
          {threadData?.name && (
            <img
              src={data.thread.receiver.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          )}

          <h1 className="font-bold text-lg">{data.thread.receiver.name}</h1>
        </div>
      </div>
      <div className="flex-1 max-h-[80vh] min-w-0 overflow-scroll flex flex-col gap-[2px] p-4">
        {messages?.length > 0 &&
          data.thread.messages?.map((packet) =>
            packet.sender === user ? (
              <div className="w-full flex flex-row justify-end">
                <div className="max-w-[50%] flex flex-row rounded-xl bg-primary p-4 text-white text-sm">
                  {packet.message}
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-row">
                <div className="max-w-[50%] flex flex-row rounded-xl bg-gray-100 p-4 text-sm">
                  {packet.message}
                </div>
              </div>
            )
          )}
      </div>
      <div className="flex flex-row gap-1 items-center justify-self-end w-full p-2">
        <div className="flex-1 bg-gray-100 rounded-full">
          <textarea
            type="text"
            name="message"
            placeholder="Type here"
            className="input input-ghost w-full"
            id="message"
            onChange={onChange}
          />
        </div>
        <div className="p-4 cursor-pointer rounded-full hover:bg-gray-100">
          <FiSend className="text-primary text-lg" onClick={onClick} />
        </div>
      </div>
    </>
  );
}

function PersonDetails({ threadData, onClick }) {
  const data = {
    message: {
      content: faker.lorem.sentence(),
      author: threadData.name,
      organization: faker.company.companyName(),
      location: threadData?.location?.address || "",
      email: threadData.email,
      phone: threadData.mobileNumber,
      avatar: threadData.avatar,
      date: faker.date.recent(),
      href: faker.internet.domainName(),
      id: threadData._id,
    },
  };
  return (
    <>
      <div className="w-full px-4 py-8 flex flex-col items-center gap-4 border-b border-gray-100">
        <div className="w-20">
          {threadData?.name && (
            <img
              src={data.message.avatar}
              alt="avatar"
              className="rounded-full"
            />
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="font-bold text-lg">{data.message.author}</div>
        </div>
      </div>
      <div className="collapse w-full border-b border-gray-100">
        <input type="checkbox" className="peer" checked />
        <div className="w-full p-4 items-center collapse-title flex flex-row justify-between text-gray-400 font-medium text-sm">
          <div>Information</div>
          <FiChevronDown />
        </div>
        <div className="collapse-content flex flex-col gap-4 text-sm">
          <div className="flex flex-row gap-3 items-center">
            <FiMapPin className="text-gray-400 text-lg" />
            <div>{data.message.location}</div>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <FiPhone className="text-gray-400 text-lg" />
            <div>{data.message.phone}</div>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <FiMail className="text-gray-400 text-lg" />
            <div>{data.message.email}</div>
          </div>
        </div>
        <div className="w-80% p-10">
          <Button onClick={onClick} text={"Load Messages"} />
        </div>
      </div>
    </>
  );
}

function thread({ sessionFromProp, socket, activeThreadData, threadMessages }) {
  const router = useRouter();
  const session = sessionFromProp;

  const [messageBody, setMessageBody] = useState("");
  const [activeThreads, setActiveThreads] = useState([]);
  const [fetchedSearch, setFetchedSearch] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [activeThread, setActiveThread] = useState({
    avatar: faker.image.avatar(),
    ...activeThreadData,
  });
  const [messages, setMessages] = useState(threadMessages);

  const getActiveThreads = async () => {
    const data = await fetchJSON(`/api/t/get-active-threads`, {});
    setActiveThreads(data);
  };

  const getSearchNames = async () => {
    const data = await fetchJSON(`/api/t/search-people`, {
      nameSearch: searchName,
    });
    setFetchedSearch(data);
  };

  const getMessages = async (threadData) => {
    const data = await fetchJSON(`/api/t/get-messages`, {
      threadID: threadData || activeThreadData.threadID,
    });
    setMessages(data);
    socket?.emit("newUser", {
      userID: session?.user?._id,
    });
  };

  useEffect(() => {
    socket?.emit("newUser", {
      userID: session?.user?._id,
    });

    socket?.on("receive-message", ({ message: data }) => {
      console.log("receive-message", data);
      setMessages((prev) => [...prev, data]);
    });
  }, [socket]);

  // on first render load all threads
  useEffect(() => {
    getActiveThreads();
  }, []);

  useEffect(() => {
    if (searchName.length > 0) getSearchNames();
    else setFetchedSearch([]);
  }, [searchName]);

  const onClickMessageItem = (threadData) => {
    getMessages(threadData.threadID);
    router.push(`/t/${threadData.threadID}`);
    setActiveThread(threadData);

    socket?.emit("newUser", {
      userID: session?.user?._id,
    });

    console.log("active thread", threadData);
  };

  const sendMessageSocket = async (message, receiver) => {
    socket?.emit("send-message", {
      message,
      receiver,
      sender: session?.user?._id,
    });
  };

  const sendMessageDB = async (message) => {
    return await fetchJSON(`/api/t/send-message`, message);
  };

  const onClickSubmit = async (e) => {
    const messagePacket = {
      message: messageBody,
      sender: session?.user?._id,
      receiver: activeThread.id || activeThread._id,
    };
    const { reply } = await sendMessageDB(messagePacket);
    sendMessageSocket(messagePacket, activeThread.id || activeThread._id);
    setMessages([...messages, messagePacket]);
    document.getElementById("message").value = "";
  };

  const onChangeText = (e) => {
    setMessageBody(e.target.value);
  };

  const onChangeSearchName = (e) => {
    setSearchName(e.target.value);
  };

  return (
    <ProtectedRoute session={session}>
      <div className="bg-base-100 min-h-screen flex flex-col items-center justify-between text-neutral overflow-clip">
        <div className="flex flex-col items-center">
          <Head>
            <title>Welcome Explore!</title>
          </Head>
          <Header session={session} />
          <div className="flex flex-row w-screen xl:max-w-7xl px-4 xl:px-8">
            <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 grid-flow-row bg-white rounded-md min-h-[90vh] shadow-sm overflow-clip">
              <div className="py-4 px-2 gap-2 flex flex-col min-h-[10vh] z-10 shadow-md">
                {/* Header */}
                <div className="px-2">
                  <h1 className="font-bold text-lg">Messages</h1>
                </div>
                {/* Search */}
                <div className="px-2">
                  <div className="lg:col-span-2 flex items-center w-full h-8 rounded-full bg-gray-100">
                    <input
                      type="text"
                      placeholder="Search messages"
                      className="input input-xs input-ghost w-full px-4"
                      onChange={onChangeSearchName}
                    />
                  </div>
                </div>
                {/* Threads */}
                <MessageList
                  activeThreads={activeThreads}
                  fetchedSearch={fetchedSearch}
                  nameSearch={searchName}
                  onClick={onClickMessageItem}
                />
              </div>
              <div className="md:flex md:flex-col hidden col-span-2 min-h-[10vh] ">
                <MessageThread
                  user={session?.user?._id}
                  onChange={onChangeText}
                  onClick={onClickSubmit}
                  threadData={activeThread}
                  messages={messages}
                />
              </div>
              <div className="min-h-[10vh] lg:block hidden z-10 shadow-md">
                <PersonDetails
                  threadData={activeThread}
                  onClick={() => getMessages(activeThreadData.threadID)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navbar active="explore" />
    </ProtectedRoute>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!GrantAccess(context, session)) return redirectToLogin(context);

  console.log("THREAD ID IN SERVERSIDEPROPS:", context.query);
  return {
    props: {
      sessionFromProp: session,
      activeThreadData: await fetchJSON(
        `${process.env.NEXTAUTH_URL}/api/t/get-active-thread`,
        {
          threadID: context.query.thread,
          userID: session?.user?._id,
        }
      ),
      threadMessages: await fetchJSON(
        `${process.env.NEXTAUTH_URL}/api/t/get-messages`,
        {
          threadID: context.query.thread,
        }
      ),
    },
  };
}

export default thread;
