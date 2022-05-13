import { ObjectId } from "mongodb";
import { ConnectDB } from "../../../config/connectDB";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    // destructure the request body
    console.log("REQUEST", req.body);
    const { email } = req.body;

    const conn = await ConnectDB();
    const db = conn.db();
    const users = db.collection("users");
    const collection = db.collection("initiatives");

    // grab user to pull bookmarks from
    const user = await users.findOne({ email });

    const bookmarks = user.bookmarks;

    if (bookmarks?.length === 0) {
      return res.status(200).json([]);
    }

    const bookmarksObjectID = bookmarks.map((bookmark) => ObjectId(bookmark));

    // find a initiatives with id in bookmarks
    const initiatives = await collection
      .find({ _id: { $in: bookmarksObjectID } })
      .toArray();

    // send the response status 200
    res.status(200).json(initiatives);
    conn.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
