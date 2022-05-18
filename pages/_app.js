import '../styles/globals.css';
import { RecoilRoot } from 'recoil';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
let socket1;
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [socket, setSocket] = useState(null);

  const initializeSocket = async () => {
    await fetch('/api/socket');
    if (!socket) {
      socket1 = io();
      socket1.on('connect', () => {
        console.log('socket connected');
        setSocket(socket1);
      });
    }
  };
  useEffect(() => initializeSocket(), [socket, initializeSocket]);

  return (
    <>
      <SessionProvider session={session}>
        <RecoilRoot>
          <Component {...pageProps} socket={socket} />
        </RecoilRoot>
      </SessionProvider>
    </>
  );
}

export default MyApp;
