import { getSession } from "next-auth/react";
import { ConnectDB } from "../../../config/connectDB";
import { getThreadID } from "../../../utils/messaging";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    const session = await getSession({ req });

    // if not session tell them they do not have access
    if (!session?.user) {
      res.status(401).json({ message: "You do not have access" });
      return;
    }

    const { nameSearch } = req.body;

    const conn = await ConnectDB();
    const db = conn.db();
    const users = db.collection("users");

    // find users with matching name
    const foundUsers = await users
      .find({
        name: { $regex: nameSearch, $options: "i" },
      })
      .toArray();

    // if user does not exist respond with empty object
    if (!foundUsers) res.status(200).json({});

    // if user does exist mutate user object to only include name and id
    if (foundUsers) {
      const usersWithNameMutated = foundUsers.map((user) => {
        return {
          name: user.name,
          id: user._id,
          threadID: getThreadID(session?.user?._id, String(user._id)),
          email: user.email,
          mobileNumber: user.mobileNumber,
        };
      });

      res.status(200).json(usersWithNameMutated);
    }

    conn.close();
  } else {
    //Response for other than POST method
    res
      .status(500)
      .json({ message: `Why you here, fam? Method: ${req.method}` });
  }
}

export default handler;
