import { hash } from "bcryptjs";
import { ConnectDB } from "../../../config/connectDB";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    // destructure the request body
    const { email, password, firstName, lastName, mobileNumber } = req.body;

    //Validate
    if (!email || !email.includes("@") || !password) {
      res.status(422).json({ message: "Invalid Data" });
      return;
    }
    //Connect with database
    const client = await ConnectDB();
    const db = client.db();
    //Check existing
    const checkExisting = await db
      .collection("users")
      .findOne({ email: email });
    //Send error response if duplicate user is found
    if (checkExisting) {
      res.status(422).json({ message: "User already exists" });
      client.close();
      return;
    }

    const name = `${firstName} ${lastName}`;

    //Hash password and insert data into DB
    const status = await db.collection("users").insertOne({
      name,
      email,
      password: await hash(password, 12),
      mobileNumber,
    });
    //Send success response
    res.status(201).json({ message: "User created", ...status });
    //Close DB connection
    client.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}

export default handler;
