import { ConnectDB } from "../../../config/connectDB";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    // check if user is logged in
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json({ message: "You are not logged in" });
      return;
    }

    // get the initiative id from the request body
    let { initiativeId } = req.body;

    // connect to the database
    const conn = await ConnectDB();
    const db = conn.db();

    const initiatives = db.collection("initiatives");
    const users = db.collection("users");

    // update the initiative: remove the user from the members list
    const initiativeUpdate = await initiatives.updateOne(
      {
        _id: ObjectId(initiativeId),
      },
      {
        $pull: {
          members: ObjectId(session.user._id),
        },
      }
    );

    // update user: remove the initiative from activeInitiatives
    const userUpdate = await users.updateOne(
      {
        _id: ObjectId(session.user._id),
      },
      {
        $pull: {
          activeInitiatives: ObjectId(initiativeId),
        },
      }
    );

    // send the response status 200
    res.status(200).json(initiativeUpdate);
    conn.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
