import faker from '@faker-js/faker';
import moment from 'moment';
import Link from 'next/link';
import { fetchJSON } from '../middleware/helper';
import { useEffect } from 'react';
import { notificationsState } from '../atoms/notificationsAtom';
import { useRecoilState } from 'recoil';
import Image from 'next/image';

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
      <Link href={data.notification.href} passHref>
        <div className="flex flex-row gap-3">
          <Image
            src={data.notification.avatar}
            alt="avatar"
            className="rounded-full w-12 h-12"
            object-fit="cover"
          />
          <div className="flex flex-col">
            <div>
              <span className="font-bold">{data.notification.name}</span>{' '}
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

function NotificationList({ session }) {
  const [notifications, setNotifications] = useRecoilState(notificationsState);
  const getNotification = async () => {
    const data = await fetchJSON('/api/user/get-notifications', {
      id: session.user._id,
    });

    if (data.length > 0) {
      setNotifications(data);
    }
  };

  useEffect(() => {
    if (notifications.length === 0) {
      getNotification();
    }
  }, [getNotification, notifications]);

  console.log(notifications);
  return (
    <div className="flex flex-col gap-5">
      {/* sort by time and map */}
      {notifications.map((notification) => (
        <>
          <Notification
            key={notification._id}
            notificationData={notification}
          />
          <Notification
            key={notification._id}
            notificationData={notification}
          />
          <hr />
        </>
      ))}
    </div>
  );
}

export { Notification, NotificationList };
