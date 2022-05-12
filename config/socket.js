import { io } from "socket.io-client";
import { useRecoilState } from "recoil";
import { socketState } from "../atoms/socketAtom";
import { useEffect } from "react";

function SocketInitializer() {
  const [socket, setSocket] = useRecoilState(socketState);

  useEffect(() => {
    if (!socket) {
      await fetch("/api/socket")
      const socket_req = io();
      setSocket(socket_req);
      socket.on("connect", () => {
        socket.emit("addUser", {
          userID: session?.user?._id,
        });
      });
    }
  }, []);

  return socket;
}

export default SocketInitializer;
