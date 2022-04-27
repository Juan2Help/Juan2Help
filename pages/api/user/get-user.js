import { ConnectDB } from "../../../config/connectDB";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    // log the request body

    const { email } = req.body;
    const conn = await ConnectDB();
    const db = conn.db();
    const users = db.collection("users");

    // get session
    const session = await getSession({ req });

    // if user is not logged in
    if (!session) {
      res.status(401).json({ message: "You are not logged in" });
      conn.close();
      return;
    }

    // update initiative
    const user = await users.findOne({
      email: email,
    });

    // send the response status 200
    console.log("user", user);
    res.status(200).json(user);
    conn.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
