import { getSession } from "next-auth/react";
import { ConnectDB } from "../../../config/connectDB";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    // Pull sender, message, receiver from request body
    const { threadID } = req.body;

    const conn = await ConnectDB();
    const db = conn.db();
    const messages = db.collection("messages");

    // check if thread exists
    let thread;
    try {
      thread = await messages.findOne({ threadID });
    } catch (err) {
      thread = null;
    }

    console.log(thread);

    // if thread does not exist respond with empty object
    if (!thread) res.status(200).json([]);
    if (thread) res.status(200).json(JSON.stringify(thread.messages));

    conn.close();
  } else {
    //Response for other than POST method
    res
      .status(500)
      .json({ message: `Why you here, fam? Method: ${req.method}` });
  }
}

export default handler;
