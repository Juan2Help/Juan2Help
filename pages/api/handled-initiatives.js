import { ConnectDB } from "../../config/connectDB";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    // destructure the request body
    console.log("REQUEST", req.body);
    const { email } = req.body;

    const conn = await ConnectDB();
    const db = conn.db();
    const collection = db.collection("initiatives");

    // find a initiatives
    const initiatives = await collection.find({ publisher: email }).toArray();

    // send the response status 200
    res.status(200).json(initiatives);
    conn.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
