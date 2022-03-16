import { React } from "react";
import { FiCalendar, FiLink, FiShare2, FiAlertTriangle } from "react-icons/fi";
import Image from "next/image";
import faker from "@faker-js/faker";
import moment from "moment";

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
            <li>
              <a>Edit</a>
            </li>
            <li>
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

export { InitiativeList, ModalToggle };
