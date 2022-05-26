import faker from '@faker-js/faker';
import moment from 'moment';
import Link from 'next/link';
import { fetchJSON } from '../middleware/helper';
import { useEffect, useCallback, useState } from 'react';
import { notificationsState } from '../atoms/notificationsAtom';
import { useRecoilState } from 'recoil';
import Image from 'next/image';

function Notification({ notificationData, key }) {
  const time = moment(notificationData?.dateCreated).fromNow();

  const [data, setData] = useState({
    notification: {
      name: notificationData?.name,
      message: notificationData?.message,
      time: time,
      avatar: notificationData?.moderatorID
        ? `http://www.gravatar.com/avatar/${notificationData?.moderatorID}?d=retro&f=y`
        : faker.image.avatar(),
      href: `/i/${notificationData?.initiativeID}`,
    },
  });

  return (
    <div key={key}>
      <Link href={data.notification.href} key={key} passHref>
        <div className="flex flex-row gap-3">
          <div className="w-1/4 rounded-full flex justify-center">
            <div className="flex items-center">
              <Image
                src={data.notification.avatar || '/images/avatar.png'}
                alt="avatar"
                objectFit="contain"
                className="rounded-full w-full "
                height={100}
                width={100}
              />
            </div>
          </div>
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
    </div>
  );
}

function NotificationList({ session }) {
  const [notifications, setNotifications] = useRecoilState(notificationsState);
  const getNotification = useCallback(async () => {
    const data = await fetchJSON('/api/user/get-notifications', {
      id: session.user._id,
    });

    if (data.length > 0) {
      setNotifications(data);
    }
  }, []);

  useEffect(() => {
    if (notifications.length === 0) {
      getNotification();
    }
  }, [getNotification, notifications.length]);

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
          <hr />
        </>
      ))}
    </div>
  );
}

export { Notification, NotificationList };
