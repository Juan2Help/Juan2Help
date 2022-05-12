import { ConnectDB } from "../../../config/connectDB";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    // check if user is logged in
    const session = await getSession({ req });
    if (!session || !session.user.role > 2) {
      res.status(401).json({
        message:
          "You are not logged in or you do not have rights to access this page.",
      });
      return;
    }

    // get the initiative id and user id from the request body
    const { registrantId, initiativeId, name } = req.body;

    // connect to the database
    const conn = await ConnectDB();
    const db = conn.db();

    const initiatives = db.collection("initiatives");
    const users = db.collection("users");
    const notifications = db.collection("notifications");

    // update initiative: delete the user from the registrants list
    const initiativeUpdate = await initiatives.updateOne(
      {
        _id: ObjectId(initiativeId),
      },
      {
        $pull: {
          registrantsList: registrantId,
        },
      }
    );

    const initiative = await initiatives.findOne({
      _id: ObjectId(initiativeId),
    });

    // update user: remove the initiative from the applications
    const userUpdate = await users.updateOne(
      {
        _id: ObjectId(registrantId),
      },
      {
        $pull: {
          applications: initiativeId,
        },
      }
    );

    // find user in notifications and update
    const userEntry = await notifications.findOne({
      user: registrantId,
    });

    if (!userEntry) {
      await notifications.insertOne({
        user: registrantId,
        notifications: [],
      });
    }

    await notifications.updateOne(
      {
        user: registrantId,
      },
      {
        $push: {
          notifications: {
            type: 2,
            initiativeID: initiative._id,
            name: name,
            message: `your application for ${initiative.title} has been rejected.`,
            dateCreated: new Date(),
          },
        },
      }
    );

    console.log(`Application of ${registrantId} to ${initiativeId} rejected`);

    // send the response status 200
    res.status(200).json({ message: `Application rejected` });
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
