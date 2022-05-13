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

    const { initiativeID } = req.body;

    console.log("InitiativeID", initiativeID);

    const conn = await ConnectDB();
    const db = conn.db();
    const users = db.collection("users");

    // get user
    const user = await users.findOne({ _id: ObjectId(session?.user?._id) });

    // add bookmark
    const bookmark = await users.updateOne(
      { _id: ObjectId(session?.user?._id) },
      { $push: { bookmarks: initiativeID } }
    );

    res.status(200).json({ message: "bookmarked!" });

    // send the response status 200
    conn.close();
  } else {
    //Response for other than POST method
    res
      .status(500)
      .json({ message: `Why you here, fam? Method: ${req.method}` });
  }
}

export default handler;
