import { React } from "react";
import {
  FiCalendar,
  FiLink,
  FiShare2,
  FiAlertTriangle,
  FiMapPin,
  FiPlusCircle,
  FiEdit3,
} from "react-icons/fi";
import faker from "@faker-js/faker";
import moment from "moment";
import Link from "next/link";
import Button from "../Button";

function InitiativeModal({ editHandler, deleteHandler }) {
  return (
    <>
      <input type="checkbox" id="initiative-modal" class="modal-toggle" />
      <label for="initiative-modal" class="modal cursor-pointer">
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
          <ul class="bg-base-100 w-full space-y-4 mt-4">
            <li onClick={editHandler}>
              <a>Edit</a>
            </li>
            <li onClick={deleteHandler}>
              <a>Delete</a>
            </li>
          </ul>
        </label>
      </label>
    </>
  );
}

function InitiativeTile({ initiative, id, onClickHandler }) {
  const { title, startDate } = initiative;
  const details = {
    date: moment(startDate).format("ddd, DD MMM YYYY").toUpperCase(),
    title: title,
  };
  return (
    <label for="initiative-modal" name="tile" key={id}>
      <div
        className="min-h-16 bg-white flex flex-row items-center rounded-xl overflow-clip space-x-4"
        id={id}
        onClick={onClickHandler}
      >
        <div className="h-full min-w-[4rem] w-2/12 relative rounded-xl overflow-clip">
          <div className="w-full pb-full">
            <img
              src="https://i.pinimg.com/originals/bb/03/86/bb0386babaccc66c484292d2c50973a8.png"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1 grow">
          <div className="font-bold truncate w-11/12">{details.title}</div>
          <div className="flex flex-row items-center text-gray-400 text-sm font-medium space-x-2">
            <FiCalendar />
            <span>{details.date}</span>
          </div>
        </div>
      </div>
    </label>
  );
}

function InitiativeList({ initiatives, onClickHandler }) {
  return (
    <div className="flex flex-col space-y-2">
      {initiatives?.map((initiative) => (
        <InitiativeTile
          initiative={initiative}
          id={initiative._id}
          onClickHandler={onClickHandler}
        />
      ))}
    </div>
  );
}

function ModeratorTile({ moderator, onClickHandler }) {
  const details = {
    moderator: {
      id: moderator._id,
      name: moderator.name,
      avatar: faker.image.avatar(),
      location: faker.address.city(),
      level: moderator.role / 2,
    },
  };
  return (
    <label for="moderator-modal" name="tile" key={details.moderator.id}>
      <div
        className="w-full rounded-xl"
        id={details.moderator.id}
        onClick={onClickHandler}
      >
        <div className="w-full bg-white flex flex-row items-center rounded-xl overflow-clip space-x-4">
          <div className="h-full w-full relative rounded-xl overflow-clip">
            <div className="rounded-xl w-full pb-full flex justify-center items-center overflow-clip">
              <img
                className="min-w-full min-h-full"
                src={details.moderator.avatar}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col justify-center pt-2 pb-4 px-4 truncate space-y-2 overflow-clip">
              <div>
                <span className="font-bold text-sm">
                  {details.moderator.name}
                </span>
                <div className="text-xs text-gray-400 flex flex-row space-x-2 items-center">
                  <FiMapPin />
                  <span>{details.moderator.location}</span>
                </div>
              </div>
              <span class="badge badge-sm badge-primary">
                {`Level ${details.moderator.level}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </label>
  );
}

function ModeratorList({ moderators, onClickHandler, id = "", admin = false }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <>
        {moderators?.map((moderator) => (
          <ModeratorTile
            moderator={moderator}
            onClickHandler={onClickHandler}
          />
        ))}
      </>
      <AddModeratorTile id={id} admin={admin} />
    </div>
  );
}

function AddModeratorTile({ admin = false, id = "" }) {
  return (
    <div className="w-full pb-full flex items-center justify-center rounded-xl outline outline-dashed outline-gray-200 text-gray-300">
      <Link href={`/manage/moderator/add/${admin ? id : ""}`}>
        <div className="flex flex-col items-center space-y-2">
          <FiPlusCircle className="text-2xl" />
          <span>Add a moderator</span>
        </div>
      </Link>
    </div>
  );
}

function ModeratorModal({ editHandler, deleteHandler }) {
  return (
    <>
      <input type="checkbox" id="moderator-modal" class="modal-toggle" />
      <label for="moderator-modal" class="modal cursor-pointer">
        <label className="modal-box relative" for="">
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
          <ul class="bg-base-100 w-full space-y-4 mt-4">
            <li onClick={editHandler}>
              <a>Edit</a>
            </li>
            <li onClick={deleteHandler}>
              <a>Delete</a>
            </li>
          </ul>
        </label>
      </label>
    </>
  );
}

function NGODetails({ router, details, session, override = false }) {
  return (
    <>
      {override && (
        <span className="text-lg font-bold">Organization Details</span>
      )}
      <div className={`w-full flex flex-row items-center gap-4`}>
        <div className={override ? "w-1/5" : "w-1/4"}>
          <div className="w-full pb-full">
            <img
              src="https://i.pinimg.com/originals/bb/03/86/bb0386babaccc66c484292d2c50973a8.png"
              className="rounded-full"
            />
          </div>
        </div>
        <div className="w-3/4 flex flex-col gap-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold">
              {session && details?.name ? `${details.name}` : "NGO NAME"}
            </span>
            <span className="text-xs text-gray-400 truncate">
              {session && details?.description
                ? `${details.description}`
                : "The NGO description goes here."}
            </span>
          </div>
          {(override || session?.user?.role <= 4) && (
            <div
              className="text-xs flex items-center flex-row gap-2"
              onClick={() => {
                router.push(
                  `/manage/edit-admin/${override ? details?.id : ""}`
                );
              }}
            >
              <FiEdit3 />
              <span className="font-bold hover:cursor-pointer">
                Edit details
              </span>
            </div>
          )}
        </div>
      </div>
      <hr />
    </>
  );
}

function OrganizationTile({ organization, id, onClickHandler }) {
  const { name, description } = organization;
  const details = {
    description,
    name,
  };
  return (
    <label for="initiative-modal" name="tile" key={id}>
      <div
        className="min-h-16 bg-white flex flex-row items-center rounded-xl overflow-clip space-x-4"
        id={id}
        onClick={onClickHandler}
      >
        <div className="h-full min-w-[4rem] w-2/12 relative rounded-xl overflow-clip">
          <div className="w-full pb-full">
            <img
              src="https://i.pinimg.com/originals/bb/03/86/bb0386babaccc66c484292d2c50973a8.png"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1 grow">
          <div className="font-bold truncate w-11/12">{details.name}</div>
          <div className="flex flex-row items-center text-gray-400 text-sm font-medium space-x-2">
            <span>{details.description}</span>
          </div>
        </div>
      </div>
    </label>
  );
}

function AddOrganizationTile() {
  return (
    <div className="w-full pb-full flex items-center justify-center rounded-xl outline outline-dashed outline-gray-200 text-gray-300">
      <Link href="/manage/organization/add">
        <div className="flex flex-col items-center space-y-2">
          <FiPlusCircle className="text-2xl" />
          <span>Add an organization</span>
        </div>
      </Link>
    </div>
  );
}

function OrganizationList({ organizations, onClickHandler }) {
  return (
    <div className="flex flex-col space-y-2">
      {organizations?.map((organization) => (
        <OrganizationTile
          organization={organization}
          id={organization.id}
          onClickHandler={onClickHandler}
        />
      ))}
      <AddOrganizationTile />
    </div>
  );
}

export {
  InitiativeList,
  InitiativeModal,
  ModeratorModal,
  ModeratorList,
  NGODetails,
  OrganizationTile,
  OrganizationList,
};
