<<<<<<< HEAD
import { React } from 'react';
import {
    FiCalendar,
    FiLink,
    FiShare2,
    FiAlertTriangle,
    FiMapPin,
} from 'react-icons/fi';
import faker from '@faker-js/faker';
import moment from 'moment';
=======
import { React } from "react";
import { FiCalendar, FiLink, FiShare2, FiAlertTriangle } from "react-icons/fi";
import Image from "next/image";
import faker from "@faker-js/faker";
import moment from "moment";
>>>>>>> ae793b5ad0e2249c0f1117eef323c43bc01e58c8

function ModalToggle({ editHandler, deleteHandler }) {
  return (
    <>
      <input type="checkbox" id="my-modal-4" class="modal-toggle" />
      <label for="my-modal-4" class="modal cursor-pointer">
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
    <label for="my-modal-4" name="tile" key={id}>
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

function ModeratorTile() {
    const fake = {
        moderator: {
            name: faker.name.findName(),
            avatar: faker.image.avatar(),
            location: faker.address.city(),
            level: Math.floor(Math.random() * 4) + 1,
        },
    };
    return (
        <div className="w-full rounded-xl">
            <div className="w-full bg-white flex flex-row items-center rounded-xl overflow-clip space-x-4">
                <div className="h-full w-full relative rounded-xl overflow-clip">
                    <div className="rounded-xl w-full pb-full flex justify-center items-center overflow-clip">
                        <img
                            className="min-w-full min-h-full"
                            src={fake.moderator.avatar}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="flex flex-col justify-center pt-2 pb-4 px-4 truncate space-y-2 overflow-clip">
                        <div>
                            <span className="font-bold text-sm">
                                {fake.moderator.name}
                            </span>
                            <div className="text-xs text-gray-400 flex flex-row space-x-2 items-center">
                                <FiMapPin />
                                <span>{fake.moderator.location}</span>
                            </div>
                        </div>
                        <span class="badge badge-sm badge-primary">
                            {`Level ${fake.moderator.level}`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ModeratorList() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <ModeratorTile />
            <ModeratorTile />
            <ModeratorTile />
            <ModeratorTile />
            <ModeratorTile />
        </div>
    );
}

export { InitiativeList, ModalToggle, ModeratorList };
