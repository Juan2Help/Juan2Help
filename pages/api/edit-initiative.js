import { ConnectDB } from "../../config/connectDB";
import { ObjectId } from "mongodb";

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
      email,
      location,
      id,
    } = req.body;

    const conn = await ConnectDB();
    const db = conn.db();
    const initiatives = db.collection("initiatives");

    // update initiative
    const initiative = await initiatives.updateOne(
      {
        _id: ObjectId(id),
        publisher: email,
      },
      {
        $set: {
          title,
          description,
          participants,
          publish,
          startDate,
          endDate,
          causeType,
          location,
        },
      }
    );

    // send the response status 200
    res.status(200).json(initiative);
    conn.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
