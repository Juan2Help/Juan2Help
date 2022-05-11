import { ConnectDB } from "../../../config/connectDB";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    // destructure the request body
    console.log("REQUEST", req.body);
    const { NGOid } = req.body;

    const conn = await ConnectDB();
    const db = conn.db();
    const organization = db.collection("organizations");
    const user = db.collection("users");

    const session = await getSession({ req });

    //Check if enough privilege of current session
    if (!session && session?.user?.role < 4) {
      res.status(403).json({
        message: "You do not enough permission to access this page",
      });
    }

    // check if user is a moderator or an admin
    if (session?.user?.role === 4) {
      const isModerator = await user.findOne({
        email: session?.user?.email,
        NGOid: ObjectId(NGOid),
      });
      if (!isModerator) {
        console.log("NOT A MODERATOR");
        res.status(400).json([]);
        return;
      }
    }

    // get the organization's moderators and destructure the orgModerators and get moderators
    const orgModerators = await organization.findOne({ _id: ObjectId(NGOid) });
    const { moderators: moderatorsRaw } = orgModerators;
    const moderatorsEmails = moderatorsRaw.map((moderator) => moderator.email);

    // find all the users that are moderators
    const moderatorsObject = await user
      .find({ email: { $in: moderatorsEmails } })
      .toArray();

    // map through moderatorsRaw and only get the _id, names, and role
    const moderators = moderatorsObject.map((moderator) => ({
      _id: moderator._id,
      name: `${moderator.name.split(" ")[0]} ${moderator.name
        .split(" ")
        .slice(-1)}`,
      role: moderator.role,
    }));

    // send the response status 200
    // log returning moderators
    console.log("MODERATORS", moderators);

    // send the response status 200
    res.status(200).json(moderators);
    conn.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
