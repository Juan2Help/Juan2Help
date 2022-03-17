import { ConnectDB } from "../../../config/connectDB";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    console.log(req.body);
    const { name, description, moderator } = req.body;

    // validate name, description, moderator
    if (!name || !description || !moderator) {
      res
        .status(400)
        .json({ message: "Missing name, description, or moderator" });
      return;
    }

    //create an array of moderators and have the moderator email as the first entry
    const moderators = [{ email: moderator, role: 4 }];

    const conn = await ConnectDB();
    const db = conn.db();
    const organizations = db.collection("organizations");
    const users = db.collection("users");

    // check if organization with same name exists then return error
    const orgExists = await organizations.findOne({ name });

    if (orgExists) {
      res.status(400).json({ message: "Organization already exists" });
      return;
    }

    // create a new initiative
    const organization = await organizations.insertOne({
      name,
      description,
      moderators,
    });

    // if successful, add the organization to the user
    const user = await users.updateOne(
      { email: moderator },
      { $set: { NGOid: organization.insertedId } }
    );

    // send the response status 200
    res.status(200).json(organization);
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
