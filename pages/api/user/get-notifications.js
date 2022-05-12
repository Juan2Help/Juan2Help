import { ConnectDB } from "../../../config/connectDB";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    // log the request body

    const { id } = req.body;
    const conn = await ConnectDB();
    const db = conn.db();
    const notifications = db.collection("notifications");

    // find user's notifications
    const userEntry = await notifications.findOne({
      user: id,
    });

    const userNotifications = userEntry?.notifications || [];
    userNotifications.reverse();

    res.status(200).json(userNotifications.slice(0, 10));
    conn.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
