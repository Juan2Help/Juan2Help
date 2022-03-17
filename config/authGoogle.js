import { ConnectDB } from "./connectDB";
import { hash } from "bcryptjs";

export async function authGoogle(details) {
  //connect to database using mongoclient
  console.log("AUTH GOOGLE");
  const client = await ConnectDB();
  //Get all the users
  const users = await client.db("juan2help").collection("users");
  //Find user with the email

  let user = await users.findOne({
    email: details.email,
  });

  //Not found - send error res
  if (!user) {
    try {
      await registerGoogle(details, client);
      // try searching for the email again
      user = await users.findOne({
        email: details.email,
      });
    } catch (err) {
      client.close();
      throw new Error(err);
    }
  }
  client.close();

  // return name, email, and id
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    NGOid: user.NGOid,
  };
}

// function to register google account to db
async function registerGoogle(details, client) {
  const { name, email } = details;
  const users = await client.db("juan2help").collection("users");

  //Hash password and insert data into DB
  try {
    const status = await users.insertOne({
      name,
      email,
      password: await hash("fromgoogleHashedpass", 12),
      mobileNumber: 0,
      role: 1,
      NGOid: "0",
    });
  } catch (err) {
    throw new Error(err);
  }
  //Send success response
}
