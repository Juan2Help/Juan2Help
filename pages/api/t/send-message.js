import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";
import { ConnectDB } from "../../../config/connectDB";
import { getThreadID } from "../../../utils/messaging";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    try {
      const session = await getSession({ req });
      // if not session tell them they do not have access
      if (!session?.user) {
        res.status(401).json({ message: "You do not have access" });
        return;
      }

      // Pull sender, message, receiver from request body
      const { sender, message, receiver } = req.body;

      const conn = await ConnectDB();
      const db = conn.db();
      const messages = db.collection("messages");
      const users = db.collection("users");

      // getThreadID
      const threadID = getThreadID(sender, receiver);

      // create a new message
      const messageEntry = {
        sender,
        message,
        receiver,
      };

      // sort sender and receiver
      const sorted = [sender, receiver].sort();

      // check if thread exists
      const threadExists = await messages.findOne({ threadID });

      // if thread does not exist create it
      if (!threadExists) {
        const thread = await messages.insertOne({
          threadID,
          messages: [messageEntry],
        });

        // update sender and receiver activeThreads
        const senderThread = await users.updateOne(
          { _id: ObjectId(sender) },
          { $push: { activeThreads: threadID } }
        );

        const receiverThread = await users.updateOne(
          { _id: ObjectId(receiver) },
          { $push: { activeThreads: threadID } }
        );
      } else {
        // if thread exists add message to it
        const thread = await messages.updateOne(
          { threadID },
          { $push: { messages: messageEntry } }
        );
      }

      // send the response status 200
      res.status(200).json({ message: "Message sent" });
      conn.close();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Message failed to send" });
    }
  } else {
    //Response for other than POST method
    res
      .status(500)
      .json({ message: `Why you here, fam? Method: ${req.method}` });
  }
}

export default handler;
