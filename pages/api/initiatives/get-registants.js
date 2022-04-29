import { ConnectDB } from "../../../config/connectDB";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    console.log("ACCESSED");

    // get the initiative id and user id from the request body
    const { id } = req.body;

    // connect to the database
    const conn = await ConnectDB();
    const db = conn.db();

    const initiatives = db.collection("initiatives");
    const users = db.collection("users");

    console.log("GRABBING LIST OF REGISTRANTS");
    // grab registrants list from intiative
    const initiative = await initiatives.findOne({
      _id: ObjectId(id),
    });
    const registrantsList = initiative.registrantsList.map((registrant) =>
      ObjectId(registrant)
    );

    console.log("registrantsList", registrantsList);

    // grab user entries from users database corresponding to the registrants list
    const userEntries = await users
      .find({
        _id: { $in: registrantsList },
      })
      .toArray();

    console.log("userEntries: ", userEntries);

    // send the response status 200
    res.status(200).json(userEntries);
    conn.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
