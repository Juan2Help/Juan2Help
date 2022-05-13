import { getSession } from "next-auth/react";
import { ConnectDB } from "../../config/connectDB";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    const session = await getSession({ req });

    // if not session tell them they do not have access
    if (!session?.user) {
      res.status(401).json({ message: "You do not have access" });
      return;
    }

    const {
      title,
      description,
      participants,
      publish,
      startDate,
      endDate,
      causeType,
      NGOid,
      location,
      startTime,
      endTime,
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
      publisher: session.user?.email,
      publisherName: session.user?.name,
      NGOid,
      location,
      startTime,
      endTime,
      registrantsList: Array(0),
      participantsList: Array(0),
    });

    // send the response status 200
    res.status(200).json(initiative);
    conn.close();
  } else {
    //Response for other than POST method
    res
      .status(500)
      .json({ message: `Why you here, fam? Method: ${req.method}` });
  }
}

export default handler;
