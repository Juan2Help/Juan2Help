import faker from "@faker-js/faker";
import moment from "moment";
import Link from "next/link";

function Notification({ notificationData }) {
  const time = moment(notificationData?.dateCreated).fromNow();

  const data = {
    notification: {
      name: notificationData?.name,
      message: notificationData?.message,
      time: time,
      avatar: faker.image.avatar(),
      href: `/i/${notificationData?.initiativeID}`,
    },
  };
  return (
    <>
      <Link href={data.notification.href}>
        <div className="flex flex-row gap-3">
          <img
            src={data.notification.avatar}
            alt="avatar"
            className="rounded-full w-12 h-12"
            object-fit="cover"
          />
          <div className="flex flex-col">
            <div>
              <span className="font-bold">{data.notification.name}</span>{" "}
              <span className="text-sm">{data.notification.message}</span>
            </div>
            <div>
              <span className="text-gray-500 text-xs font-bold">
                {data.notification.time}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

function NotificationList() {
  return (
    <div className="flex flex-col gap-5">
      <Notification />
      <hr />
      <Notification />
      <hr />
      <Notification />
      <hr />
    </div>
  );
}

export { Notification, NotificationList };
