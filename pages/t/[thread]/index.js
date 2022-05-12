import Head from 'next/head';
import Navbar from '../../../components/Navbar';
import Header from '../../../components/Header';
import faker from '@faker-js/faker';
import { getSession } from 'next-auth/react';
import ProtectedRoute from '../../../components/ProtectedRoute';
import {
  GrantAccess,
  redirectToLogin,
} from '../../../middleware/ProtectedRoute';
import Link from 'next/link';
import moment from 'moment';
import {
  FiChevronDown,
  FiMapPin,
  FiPhone,
  FiMail,
  FiSend,
} from 'react-icons/fi';

function MessageItem() {
  const time = moment(faker.time.recent(10, '12:00'));
  const parsedTime =
    time.startOf('hour').fromNow()[0] != 'i'
      ? time.startOf('hour').fromNow()
      : time.endOf('day').fromNow();
  const fake = {
    message: {
      content: faker.lorem.sentence(),
      name: faker.name.findName(),
      avatar: faker.image.avatar(),
      date: faker.date.recent(),
      time: parsedTime,
      href: faker.internet.domainName(),
      id: faker.datatype.uuid(),
    },
  };
  return (
    <>
      <Link href={fake.message.href}>
        <div className="w-full flex flex-row gap-4 py-2 px-2 hover:bg-[#e9eaeb] rounded-md cursor-pointer overflow-clip">
          <img
            src={fake.message.avatar}
            alt="avatar"
            className="rounded-full w-12 h-12"
            object-fit="cover"
          />
          <div className="flex flex-col w-9/12">
            <div>
              <span className="font-bold">{fake.message.name}</span>{' '}
              <span className="text-sm">{fake.message.message}</span>
            </div>
            <div className="flex flex-row text-gray-500 text-xs gap-1 items-center">
              <div className="max-w-min truncate">{fake.message.content}</div>
              <div>•</div>
              <div>3m</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

function MessageList() {
  return (
    <div>
      <MessageItem />
      <MessageItem />
      <MessageItem />
      <MessageItem />
      <MessageItem />
    </div>
  );
}

function fakeMessage() {
  const fake = {
    content: faker.lorem.sentence(),
    author: Math.random() > 0.5 ? faker.name.findName() : 'Johnny',
    avatar: faker.image.avatar(),
    date: faker.date.recent(),
    time: faker.time.recent(),
  };

  return fake;
}

function MessageThread() {
  const messages = Array.from({ length: 20 }, () => fakeMessage());
  const fake = {
    thread: {
      receiver: {
        name: faker.name.findName(),
        avatar: faker.image.avatar(),
      },
      messages: messages,
      href: faker.internet.domainName(),
    },
  };
  const user = 'Johnny';
  return (
    <>
      <div className="w-full border-b border-gray-100">
        <div className="py-3 px-4 flex flex-row gap-3">
          <img
            src={fake.thread.receiver.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <h1 className="font-bold text-lg">{fake.thread.receiver.name}</h1>
        </div>
      </div>
      <div className="flex-1 max-h-[80vh] min-w-0 overflow-scroll flex flex-col gap-[2px] p-4">
        {fake.thread.messages.map((message) =>
          message.author === user ? (
            <div className="w-full flex flex-row justify-end">
              <div className="max-w-[50%] flex flex-row rounded-xl bg-primary p-4 text-white text-sm">
                {message.content}
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-row">
              <div className="max-w-[50%] flex flex-row rounded-xl bg-gray-100 p-4 text-sm">
                {message.content}
              </div>
            </div>
          )
        )}
      </div>
      <div className="flex flex-row gap-1 items-center justify-self-end w-full p-2">
        <div className="flex-1 bg-gray-100 rounded-full">
          <input
            type="text"
            placeholder="Type here"
            class="input input-ghost w-full"
          />
        </div>
        <div className="p-4 cursor-pointer rounded-full hover:bg-gray-100">
          <FiSend className="text-primary text-lg" />
        </div>
      </div>
    </>
  );
}

function PersonDetails() {
  const fake = {
    message: {
      content: faker.lorem.sentence(),
      author: faker.name.findName(),
      organization: faker.company.companyName(),
      location: faker.address.city(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      avatar: faker.image.avatar(),
      date: faker.date.recent(),
      href: faker.internet.domainName(),
      id: faker.datatype.uuid(),
    },
  };
  return (
    <>
      <div className="w-full px-4 py-8 flex flex-col items-center gap-4 border-b border-gray-100">
        <div className="w-20">
          <img
            src={fake.message.avatar}
            alt="avatar"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="font-bold text-lg">{fake.message.author}</div>
          <div className="text-gray-400 text-sm">
            {fake.message.organization}
          </div>
        </div>
      </div>
      <div class="collapse w-full border-b border-gray-100">
        <input type="checkbox" class="peer" checked />
        <div class="w-full p-4 items-center collapse-title flex flex-row justify-between text-gray-400 font-medium text-sm">
          <div>Information</div>
          <FiChevronDown />
        </div>
        <div class="collapse-content flex flex-col gap-4 text-sm">
          <div className="flex flex-row gap-3 items-center">
            <FiMapPin className="text-gray-400 text-lg" />
            <div>{fake.message.location}</div>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <FiPhone className="text-gray-400 text-lg" />
            <div>{fake.message.phone}</div>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <FiMail className="text-gray-400 text-lg" />
            <div>{fake.message.email}</div>
          </div>
        </div>
      </div>
    </>
  );
}

function thread({ sessionFromProp }) {
  const session = sessionFromProp;

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
                  <div className="lg:col-span-2 flex w-full h-8 rounded-md bg-gray-100"></div>
                </div>
                {/* Threads */}
                <MessageList />
              </div>
              <div className="md:flex md:flex-col hidden col-span-2 min-h-[10vh] ">
                <MessageThread />
              </div>
              <div className="min-h-[10vh] lg:block hidden z-10 shadow-md">
                <PersonDetails />
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
  return {
    props: {
      sessionFromProp: session,
    },
  };
}

export default thread;
