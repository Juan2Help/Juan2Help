import { ConnectDB } from "../../../config/connectDB";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    // check if user is logged in
    const session = await getSession({ req });
    if (!session || !session.user.role < 2) {
      res.status(401).json({
        message:
          "You are not logged in or you do not have rights to access this page.",
      });
      return;
    }

    // get the initiative id and user id from the request body
    const { initiativeId, userId } = req.body;

    // connect to the database
    const conn = await ConnectDB();
    const db = conn.db();

    const initiatives = db.collection("initiatives");
    const users = db.collection("users");

    // update initiative: delete the user from the registrants list and append the user to the members list
    const initiativeUpdate = await initiatives.updateOne(
      {
        _id: ObjectId(initiativeId),
      },
      {
        $addToSet: {
          members: ObjectId(userId),
        },
        $pull: {
          registrants: ObjectId(userId),
        },
      }
    );

    // update user: remove the initiative from the applications
    // and append the initiative to the activeInitiatives
    const userUpdate = await users.updateOne(
      {
        _id: ObjectId(userId),
      },
      {
        $addToSet: {
          activeInitiatives: ObjectId(initiativeId),
        },
        $pull: {
          applications: ObjectId(initiativeId),
        },
      }
    );

    // send the response status 200
    res
      .status(200)
      .json(`Application of ${userId} to ${initiativeId} approved`);
    conn.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
