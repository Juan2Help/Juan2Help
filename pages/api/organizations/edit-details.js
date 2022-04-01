import { ConnectDB } from "../../../config/connectDB";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    console.log(req.body);
    const { name, description, NGOid } = req.body;

    // validate name, description, moderator
    if (!name || !description || !NGOid) {
      res
        .status(400)
        .json({ message: "Missing name, description, or moderator" });
      return;
    }

    const conn = await ConnectDB();
    const db = conn.db();
    const organizations = db.collection("organizations");
    const users = db.collection("users");

    const session = await getSession({ req });

    //Check if enough privilege of current session
    if (!session && session?.user?.role < 4) {
      res.status(403).json({
        message: "You do not enough permission to access this page",
      });

      return;
    }

    if (session?.user?.role === 4) {
      // check if user is a moderator
      const isModerator = await users.findOne({
        email: session?.user?.email,
        NGOid: ObjectId(NGOid),
        role: 4,
      });
      // if not a moderator, return error
      if (!isModerator) {
        res.status(400).json({
          message: "User does not have enough rights for this action.",
        });
        return;
      }
    }

    //edit organization data
    const organization = await organizations.updateOne(
      { _id: ObjectId(NGOid) },
      { $set: { name, description } }
    );

    console.log("SUCCESS!");
    // send the response status 200
    res.status(200).json({ message: "Organization data edited successfully." });
    conn.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
