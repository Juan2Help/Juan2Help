import { React } from 'react';
import { getSession } from 'next-auth/react';
import { GrantAccess } from '../../../middleware/ProtectedRoute';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { faker } from '@faker-js/faker';
import Image from 'next/image';

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

function Body({ participants, onClickHandler }) {
  const fake = {
    initiative: {
      participants,
    },
  };
  console.log('participants: ', participants);

  return (
    <div className="px-4 flex flex-col gap-2">
      <hr />
      {fake.initiative?.participants?.map((participant) => (
        <label
          htmlFor="registrant-options"
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
                <Image
                  alt=""
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
                    participant.phone ? participant.phone : 'No contact'
                  }`}</div>
                  <div>{`${
                    participant.city ? participant.city : 'No location'
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
    </div>
  );
}

function search({ sessionFromProp, participants, initiativeTitle }) {
  const session = sessionFromProp;
  return (
    <div className="flex relative flex-col min-h-screen">
      <Header initiativeTitle={initiativeTitle} />
      <Body participants={participants} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!GrantAccess(context, session)) return redirectToLogin(context);
  const initiativeId = context.params.initiative;
  console.log('initiativeId', initiativeId);

  const req = await fetch(
    `${process.env.NEXTAUTH_URL}/api/initiatives/get-participants`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
      participants: userEntries,
      initiativeTitle: title,
      initiativeId,
    },
  };
}

export default search;
