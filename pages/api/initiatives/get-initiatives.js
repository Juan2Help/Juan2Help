import { ConnectDB } from "../../../config/connectDB";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";

const INITIATIVES_PER_PAGE = 6;

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    // check if user is logged in
    const session = await getSession({ req });

    const type = req.body.type;

    // 1: getAllInitiatives
    // 2: getFilteredInitiatives
    switch (type) {
      case "1":
        return getAllInitiatives(req, res, session?.user);
      case "2":
        return getFilteredInitiatives(req, res, session?.user);
      case "3":
        return getActiveInitiatives(req, res, session?.user);
      default:
        return res.status(500).json({ message: "Invalid type" });
    }
  } else if (req.method === "GET") {
    // get how many pages there are for all initiatives
    const conn = await ConnectDB();
    const db = conn.db();

    const initiatives = db.collection("initiatives");

    const count = await initiatives.countDocuments();
    // send the response status 200
    res.status(200).json({ pages: Math.ceil(count / INITIATIVES_PER_PAGE) });
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;

const getAllInitiatives = async (req, res, user) => {
  // get the current page from the request body
  const { page } = req.body;

  console.log("GETTING ALL INITIATIVES");

  // connect to the database
  const conn = await ConnectDB();
  const db = conn.db();

  const initiatives = db.collection("initiatives");

  // grab all initiatives and skip page*INITIATIVES_PER_PAGE
  const allInitiatives = await initiatives
    .find({})
    .skip((page - 1) * INITIATIVES_PER_PAGE)
    .limit(INITIATIVES_PER_PAGE)
    .toArray();

  // send the response status 200
  res.status(200).json(allInitiatives);
  conn.close();
};

const getFilteredInitiatives = async (req, res, user) => {
  // get the current page from the request body
  const { page, filter } = req.body;

  // connect to the database
  const conn = await ConnectDB();
  const db = conn.db();

  const initiatives = db.collection("initiatives");

  // grab all filtered initiatives using filter and skip page*INITIATIVES_PER_PAGE
  const filteredInitiatives = await initiatives
    .find({
      $or: [
        { title: { $regex: filter, $options: "i" } },
        { description: { $regex: filter, $options: "i" } },
        { tags: { $regex: filter, $options: "i" } },
        { location: { $regex: filter, $options: "i" } },
      ],
    })
    .skip((page - 1) * INITIATIVES_PER_PAGE)
    .limit(INITIATIVES_PER_PAGE)
    .toArray();

  // send the response status 200
  res.status(200).json(allInitiatives);
  conn.close();
};

const getActiveInitiatives = async (req, res, user) => {
  // get the current page from the request body
  const { page } = req.body;

  // connect to the database
  const conn = await ConnectDB();
  const db = conn.db();

  const initiatives = db.collection("initiatives");

  // grab all filtered initiatives using filter and skip page*INITIATIVES_PER_PAGE
  const filteredInitiatives = await initiatives
    .find({
      $or: [
        { title: { $regex: filter, $options: "i" } },
        { description: { $regex: filter, $options: "i" } },
        { tags: { $regex: filter, $options: "i" } },
        { location: { $regex: filter, $options: "i" } },
      ],
    })
    .skip((page - 1) * INITIATIVES_PER_PAGE)
    .limit(INITIATIVES_PER_PAGE)
    .toArray();

  // send the response status 200
  res.status(200).json(allInitiatives);
  conn.close();
};
