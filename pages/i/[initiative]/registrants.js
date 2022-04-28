import { React } from 'react';
import { getSession } from 'next-auth/react';
import { GrantAccess } from '../../../middleware/ProtectedRoute';
import { FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { faker } from '@faker-js/faker';
import { FiLink, FiShare2, FiAlertTriangle } from 'react-icons/fi';

function ModalToggle() {
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
          <div className="flex flex-col space-y-4">
            <hr />
            <a>Visit profile</a>
            <hr />
          </div>
          <ul class="bg-base-100 w-full space-y-4 mt-4">
            <li>
              <a>Accept</a>
            </li>
            <li>
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

function Body() {
  const participants_count = faker.random.number({ min: 1, max: 100 });
  const fake = {
    initiative: {
      participants_count: participants_count,
      participants: Array(participants_count)
        .fill()
        .map(() => fakeUser()),
    },
  };
  console.log(participants_count);
  return (
    <div className="px-4 flex flex-col gap-2">
      <hr />
      {fake.initiative.participants.map((participant) => (
        <label for="registrant-options" className="text-xl">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-4 items-center">
              <div className="w-20 overflow-clip rounded-full">
                <img
                  src={participant.avatar}
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
                  <div>{`${participant.phone}`}</div>
                  <div>{`${participant.city}`}</div>
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

function Header() {
  const router = useRouter();
  const { initiative } = router.query;

  return (
    <div className="top-0 sticky flex flex-row items-center justify-between p-4 z-50 backdrop-filter backdrop-blur-sm bg-slate-100/95">
      <div className="flex flex-row gap-2">
        <div className="py-2">
          <Link href="">
            <FiArrowLeft className="cursor-pointer hover:text-gray-500" />
          </Link>
        </div>
        <div className="font-bold text-xl">{`${initiative}`}</div>
      </div>
      <div className="flex flex-row gap-3 justify-end text-primary">
        <div className="font-bold text-sm">Accept All</div>
        <div className="font-bold text-sm">Reject All</div>
      </div>
    </div>
  );
}

function search({ sessionFromProp }) {
  const session = sessionFromProp;
  return (
    <div className="flex relative flex-col min-h-screen">
      <Header />
      <Body />
      <ModalToggle />
    </div>
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

export default search;
