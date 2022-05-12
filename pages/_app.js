import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [socket, setSocket] = useState(null);

  const initializeSocket = async () => {
    await fetch("/api/socket");
    if (!socket) {
      socket = io();
      socket.on("connect", () => {
        console.log("socket connected");
        setSocket(socket);
      });
    }
  };
  useEffect(() => initializeSocket(), []);

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
