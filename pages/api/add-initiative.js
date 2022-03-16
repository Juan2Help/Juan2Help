import { ConnectDB } from "../../config/connectDB";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    // log the request body
    console.log(req.body);
    const {
      title,
      description,
      participants,
      publish,
      startDate,
      endDate,
      causeType,
    } = req.body;

    const conn = await ConnectDB();
    const db = conn.db();
    const initiatives = db.collection("initiatives");

    // create a new initiative
    const initiative = await initiatives.insertOne({
      title,
      description,
      participants,
      publish,
      startDate,
      endDate,
      causeType,
    });

    // send the response status 200
    res.status(200).json(initiative);
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
