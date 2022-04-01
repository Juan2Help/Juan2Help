import { getSession } from "next-auth/react";
import { ConnectDB } from "../../../config/connectDB";

export default async function handler(req, res) {
  if (req.method === "POST") {
    //Check if enough privilege of current session

    const session = await getSession({ req });
    if (!session && session?.user?.role < 8) {
      res.status(403).json({
        message: "You do not enough permission to access this page",
      });
    }

    //Get all organizations
    const conn = await ConnectDB();
    const db = conn.db();
    const orgs = await db.collection("organizations").find({}).toArray();

    const returnOrgs = orgs.map((org) => {
      return {
        id: org._id,
        name: org.name,
        description: org.description,
      };
    });

    res.status(200).json(returnOrgs);
    conn.close();
  }
}
