import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";
import { ConnectDB } from "../../../config/connectDB";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    console.log(req.body);

    const { NGOid } = req.body;

    // validate NGOid
    if (!NGOid) {
      res.status(400).json({ message: "Missing NGOid" });
      return;
    }

    // get current session
    const session = await getSession({ req });

    // check if current session does not exist or if the user is not an admin
    if (!session || session?.user?.role != 8) {
      res.status(403).json({
        message: "You do not enough permission to access this page",
      });
      return;
    }

    const conn = await ConnectDB();
    const db = conn.db();
    const organizations = db.collection("organizations");
    const users = db.collection("users");

    // get the organization's moderators and destructure the orgModerators and get moderators
    const organization = await organizations.findOne({ _id: ObjectId(NGOid) });
    const { moderators: moderatorsRaw } = organization;
    const moderatorsEmails = moderatorsRaw.map((moderator) => moderator.email);

    // Loop through the emails and set the role to 2 and NGOid to null
    for (let i = 0; i < moderatorsEmails.length; i++) {
      await users.updateOne(
        { email: moderatorsEmails[i] },
        { $set: { role: 1, NGOid: null } }
      );
    }

    // delete organization
    await organizations.deleteOne({ _id: ObjectId(NGOid) });

    console.log("DELETED");
    // send the response status 200
    res.status(200).json(organization);
    conn.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
