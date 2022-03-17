import { ObjectId } from "mongodb";
import { ConnectDB } from "../../../config/connectDB";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    console.log(req.body);
    const { email, NGOid } = req.body;

    // email, NGOid
    if (!email || !NGOid) {
      res.status(400).json({ message: "Missing email or NGOid" });
      return;
    }

    const conn = await ConnectDB();
    const db = conn.db();
    const organizations = db.collection("organizations");
    const users = db.collection("users");

    // check if user is a moderator
    const isModerator = await users.findOne({
      email,
      NGOid: ObjectId(NGOid),
      role: 4,
    });
    // if not a moderator, return error
    if (!isModerator) {
      res
        .status(400)
        .json({ message: "User does not have enough rights for this action." });
      return;
    }

    // check if organization with same name exists then return error
    const { name, description } = await organizations.findOne({
      _id: ObjectId(NGOid),
    });

    // send the response status 200
    res.status(200).json({ name, description });
    conn.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
