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
    const users = db.collection("users");

    // Grab participants list and registrantslist
    const initiative = await initiatives.findOne({ _id: ObjectId(id) });
    const participantsList = initiative?.participantsList;
    const registrantsList = initiative?.registrantsList;

    // loop through array and remove initiative id from activeInitiatives array of users
    for (let i = 0; i < participantsList?.length; i++) {
      const user = await users.findOne({ _id: ObjectId(participantsList[i]) });
      if(!user) continue;
      
      const activeInitiatives = user.activeInitiatives;
      const index = activeInitiatives.indexOf(id);
      if (index > -1) {
        activeInitiatives.splice(index, 1);
        await users.updateOne(
          { _id: ObjectId(participantsList[i]) },
          { $set: { activeInitiatives } }
        );
      }
    }

    // loop through array and remove initiative id from applications array of users
    for (let i = 0; i < registrantsList?.length; i++) {
      const user = await users.findOne({ _id: ObjectId(registrantsList[i]) });
      
      if (!user) continue;

      const applications = user.applications;
      const index = applications.indexOf(id);
      if (index > -1) {
        applications.splice(index, 1);
        await users.updateOne(
          { _id: ObjectId(registrantsList[i]) },
          { $set: { applications } }
        );
      }
    }

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
    conn.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
