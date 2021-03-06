import { hash } from "bcryptjs";
import { ConnectDB } from "../../../config/connectDB";
import sendVerificationEmail from "../../../middleware/Registration";
import crypto from "crypto";

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
    const conn = await ConnectDB();

    const db = conn.db();

    //Check existing
    const checkExisting = await db
      .collection("users")
      .findOne({ email: email });
    //Send error response if duplicate user is found
    if (checkExisting) {
      res.status(422).json({ message: "User already exists" });
      conn.close();
      return;
    }

    const name = `${firstName} ${lastName}`;

    // generate 32 byte verification token using crypto
    const token = crypto.randomBytes(32).toString("hex");

    //Hash password and insert data into DB
    const status = await db.collection("users").insertOne({
      name,
      email,
      password: await hash(password, 12),
      mobileNumber,
      role: 1,
      NGOid: "0",
      token,
      verified: false,
      activeInitiatives: [],
      applications: [],
    });

    // Send verification email
    const verificationEmail = await sendVerificationEmail(email, name, token);

    if (!verificationEmail) {
      res.status(500).json({ message: "Email unreachable." });
      await db.collection("users").deleteOne({ _id: status.insertedId });
      conn.close();
      return;
    }

    //Send success response
    res.status(201).json({ message: "User created", ...status });
    //Close DB connection
    conn.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "3" });
  }
}

export default handler;
