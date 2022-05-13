// utils for messaging

export const getThreadID = (sender, receiver) => {
  const s = sender.toLowerCase();
  const r = receiver.toLowerCase();
  const sorted = [s, r].sort();

  const threadID = `${sorted[0]}${sorted[1]}`;

  return threadID;
};
