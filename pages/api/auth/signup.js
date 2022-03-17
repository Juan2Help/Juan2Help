import { hash } from "bcryptjs";
import { ConnectDB } from "../../../config/connectDB";

// error types: 1 - invalid data, 2 - duplicate user, 3 - internal server error

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    // destructure the request body
    const { email, password, firstName, lastName, mobileNumber } = req.body;

    //Validate
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      !firstName ||
      !lastName ||
      !mobileNumber
    ) {
      res.status(422).json({ message: "Invalid Data", type: "1" });
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
      res.status(422).json({ message: "2" });
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
      isModerator: false,
      isAdmin: false,
      NGOname: "",
    });
    //Send success response
    res.status(201).json({ message: "User created", ...status });
    //Close DB connection
    client.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "3" });
  }
}

export default handler;
