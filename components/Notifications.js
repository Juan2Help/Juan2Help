import faker from '@faker-js/faker';
import moment from 'moment';
import Link from 'next/link';

function Notification() {
  const time = moment(faker.time.recent(10, '12:00'));
  const parsedTime =
    time.startOf('hour').fromNow()[0] != 'i'
      ? time.startOf('hour').fromNow()
      : time.endOf('day').fromNow();
  const fake = {
    notification: {
      name: faker.name.firstName(),
      message: faker.lorem.sentence(),
      time: parsedTime,
      avatar: faker.image.avatar(),
      href: faker.internet.domainName(),
      id: faker.datatype.uuid(),
    },
  };
  return (
    <>
      <Link href={fake.notification.href}>
        <div className="flex flex-row gap-3">
          <img
            src={fake.notification.avatar}
            alt="avatar"
            className="rounded-full w-12 h-12"
            object-fit="cover"
          />
          <div className="flex flex-col">
            <div>
              <span className="font-bold">{fake.notification.name}</span>{' '}
              <span className="text-sm">{fake.notification.message}</span>
            </div>
            <div>
              <span className="text-gray-500 text-xs font-bold">
                {fake.notification.time}
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
