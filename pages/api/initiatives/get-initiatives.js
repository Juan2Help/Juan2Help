import { getSession } from "next-auth/react";
import { ConnectDB } from "../../../config/connectDB";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    // check if user is logged in
    const type = req.body.type;

    // 1: getAllInitiatives
    // 2: getFilteredInitiatives
    switch (type) {
      case "1":
        return getAllInitiatives(req, res);
      case "2":
        return getFilteredInitiatives(req, res);
      case "3":
        return getActiveInitiatives(req, res);
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

const getAllInitiatives = async (req, res) => {
  // get the current page from the request body
  const { page, userId } = req.body;

  console.log("GETTING NEW INITIATIVES");

  // connect to the database
  const conn = await ConnectDB();
  const db = conn.db();

  const initiatives = db.collection("initiatives");
  const users = db.collection("users");

  // find user with id = user._id
  const userData = await users.findOne({ _id: ObjectId(userId) });

  if (
    !userData?.activeInitiatives ||
    userData?.activeInitiatives?.length === 0
  ) {
    userData.activeInitiatives = [];
  }

  const activeInitiativeIds = userData?.activeInitiatives?.map((id) =>
    ObjectId(id)
  );

  // grab all initiatives with id NOT in activeInitiativeIds
  const allInitiatives = await initiatives
    .find({ _id: { $nin: activeInitiativeIds } })
    .toArray();

  // send the response status 200
  res.status(200).json(allInitiatives);
  conn.close();
};

const getFilteredInitiatives = async (req, res) => {
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

const getActiveInitiatives = async (req, res) => {
  // get the current page from the request body
  const { page, userId } = req.body;

  console.log("GETTING ACTIVE INITIATIVES");

  // connect to the database
  const conn = await ConnectDB();
  const db = conn.db();

  const initiatives = db.collection("initiatives");
  const users = db.collection("users");

  // find user with id = user._id
  const userData = await users.findOne({ _id: ObjectId(userId) });

  if (
    !userData?.activeInitiatives ||
    userData?.activeInitiatives?.length === 0
  ) {
    userData.activeInitiatives = [];
  }

  const activeInitiativeIds = userData?.activeInitiatives?.map((id) =>
    ObjectId(id)
  );

  // grab all initiatives with id in activeInitiativeIds
  const activeInitiatives = await initiatives
    .find({ _id: { $in: activeInitiativeIds } })
    .toArray();

  console.log("ACTIVE INITIATIVES", activeInitiatives);
  // send the response status 200
  res.status(200).json(activeInitiatives);
  conn.close();
};
