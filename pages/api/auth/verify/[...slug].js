import { ConnectDB } from "../../../../config/connectDB";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "GET") {
    const id = req.query.slug[0];
    console.log("Verification Request ID: ", id);

    //connect to DB
    const conn = await ConnectDB();
    const db = conn.db();
    const organizations = db.collection("users");
    // search for the account with verificationToken == id
    const user = await organizations.findOne({ token: id });

    // if not found, return error
    if (!user) {
      res.status(400).json({ message: "Wrong verification token." });
      return;
    }

    // if user is already verified, return error
    if (user.verified) {
      res
        .redirect("/auth/signin/")
        .status(400)
        .json({ message: "User is already verified." });
      return;
    }

    console.log(user);

    // update user info
    const userInfo = await organizations.updateOne(
      { _id: ObjectId(user._id) },
      { $set: { verified: true } }
    );

    // send the response status 200
    res.status(200).json({ message: "User verified successfully." });
  } else {
    //Response for other than GET method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}
