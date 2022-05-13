import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";
import { ConnectDB } from "../../../config/connectDB";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    const session = await getSession({ req });

    // if not session tell them they do not have access
    if (!session?.user) {
      res.status(401).json({ message: "You do not have access" });
      return;
    }

    // Pull sender, message, receiver from request body

    const conn = await ConnectDB();
    const db = conn.db();
    const users = db.collection("users");

    // find user and return activeThreads
    const user = await users.findOne({ _id: ObjectId(session?.user?._id) });

    // if user does not exist respond with empty object
    if (!user) {
      console.log("NO USER FOUND FOR THREAD");
      return res.status(200).json({});
    }

    // map activeThreads
    const activeThreads = [];

    if (user?.activeThreads?.length == 0) {
      return res.status(200).json(activeThreads);
    }

    for (const threadID of user?.activeThreads) {
      const receiverID = threadID.replace(String(session?.user?._id), "");
      // get receiverData
      const { name, email, mobileNumber, _id } = await users.findOne({
        _id: ObjectId(receiverID),
      });
      const entry = {
        threadID,
        name,
        email,
        mobileNumber,
        _id,
      };
      activeThreads.push(entry);
    }

    // respond with activeThreads
    res.status(200).json(activeThreads);

    conn.close();
  } else {
    //Response for other than POST method
    res
      .status(500)
      .json({ message: `Why you here, fam? Method: ${req.method}` });
  }
}

export default handler;
