import { ConnectDB } from "../../../config/connectDB";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    // log the request body
    console.log(req.body);
    const { name, bio, location, mobileNumber, birthday, hobbies, _id } =
      req.body;

    const conn = await ConnectDB();
    const db = conn.db();
    const users = db.collection("users");

    // update initiative
    const user = await users.updateOne(
      {
        _id: ObjectId(_id),
      },
      {
        $set: {
          name,
          bio,
          location,
          mobileNumber,
          birthday,
          hobbies,
        },
      }
    );

    // send the response status 200
    res.status(200).json(user);
    conn.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
