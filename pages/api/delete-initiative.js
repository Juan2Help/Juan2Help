import { ConnectDB } from "../../config/connectDB";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    // log the request body
    const { email, id } = req.body;
    console.log("REQUEST", email, id);

    const conn = await ConnectDB();
    const db = conn.db();

    const initiatives = db.collection("initiatives");

    // delete initiative the given with id and publisher
    const deleteResponse = await initiatives.deleteOne({
      _id: ObjectId(id),
      publisher: email,
    });

    // if initiative is deleted
    if (deleteResponse.deletedCount === 1) {
      res.statusCode = 200;
      console.log("DELETE SUCCESS");
    }
    // send the response status 200
    res.status(200).json({ message: "DELETE SUCCESS" });
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
