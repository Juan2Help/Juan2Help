import { ObjectId } from "mongodb";
import { ConnectDB } from "../../../config/connectDB";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    // destructure the request body
    console.log("REQUEST", req.body);
    const { id } = req.body;

    const conn = await ConnectDB();
    const db = conn.db();
    const users = db.collection("users");

    // grab user to pull bookmarks from
    const user = await users.findOne({ _id: ObjectId(id) });

    const bookmarks = user?.bookmarks || [];

    if (bookmarks?.length === 0) {
      return res.status(200).json([]);
    }
    // send the response status 200
    res.status(200).json(bookmarks);

    conn.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
