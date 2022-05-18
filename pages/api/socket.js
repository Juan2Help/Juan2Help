import { Server } from "socket.io";

let users = {};
const addUser = (socketID, userID) => (users[userID] = socketID);
const deleteUser = (userID) => delete users[userID];
const getUser = (userID) => users[userID];

const SocketHandler = (req, res) => {
  console.log("Socket is initializing");
  const io = new Server(res.socket.server);

  io.eio.pingTimeout = 120000; // 2 minutes
  io.eio.pingInterval = 5000; // 5 seconds

  res.socket.server.io = io;

  // when a user connects
  io.on("connection", (socket) => {
    // different socket logic goes here

    // NEW USER JOINS SOCKET
    socket.on("newUser", ({ userID }) => {
      console.log("New user connected:", userID);
      addUser(socket.id, userID);
    });

    // MODERATOR UPDATES AN INITIATIVE
    socket.on("updateInitiative", (participantList) => {
      // grab all participant IDs from initiative

      console.log("Participant list:", participantList);
      console.log("Current Online:", users);
      participantList.map((participantID) => {
        // get the socket ID of the participant

        const participantSocketID = getUser(participantID);
        // if the participant is online
        if (participantSocketID) {
          // send the update to the participant
          console.log("SENDING TO SocketID:", participantSocketID);
          socket.to(participantSocketID).emit("getNotification", "update");
        }
      });
    });

    socket.on("application-decision", ({ registrantId, decision }) => {
      console.log("Application decision:", registrantId, decision);
      const userSocketID = getUser(registrantId);

      if (!userSocketID) return;

      socket.to(userSocketID).emit("getNotification", { decision });
      socket.to(userSocketID).emit("application-decision", { decision });
    });

    socket.on("send-message", ({ message, receiver, sender }) => {
      addUser(socket.id, sender);
      console.log("CURRENT USERS:", users);
      console.log("SENDING MESSAGE:", message, receiver);
      const receiverSocketID = getUser(receiver);
      console.log("RECEIVER SOCKET ID:", receiverSocketID);

      socket.to(receiverSocketID).emit("receive-message", { message });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
      deleteUser(socket.id);
    });
  });

  res.end();
};

export default SocketHandler;
