import { ConnectDB } from "../../../config/connectDB";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";

async function handler(req, res) {
  //Only POST mothod is accepted
  console.log(req.method);
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

    // get the initiative
    const initiative = await initiatives.findOne({
      _id: ObjectId(initiativeId),
    });

    // get the user
    const user = await users.findOne({
      _id: ObjectId(session.user._id),
    });

    // check if user is already a registering
    if (initiative?.registrantsList?.includes(session.user._id)) {
      res
        .status(400)
        .json({ message: "You are already a member of this initiative" });
      conn.close();
      return;
    }

    // check if user is already a participant

    if (initiative?.participantsList?.includes(session.user._id)) {
      res
        .status(400)
        .json({ message: "You are already a member of this initiative" });
      conn.close();
      return;
    }

    console.log(session.user._id);
    console.log(initiativeId);
    // add the user to the initiative
    const initiativeUpdate = await initiatives.updateOne(
      {
        _id: ObjectId(initiativeId),
      },
      {
        $push: {
          registrantsList: session.user._id,
        },
      }
    );

    // append this to the user's applications
    const userUpdate = await users.updateOne(
      {
        _id: ObjectId(session.user._id),
      },
      {
        $push: {
          applications: initiativeId,
        },
      }
    );

    console.log("JOINED INITIATIVE");

    // send the response status 200
    res.status(200).json(initiativeUpdate);
    conn.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, famz?" });
  }
}

export default handler;
