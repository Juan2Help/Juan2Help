import { ConnectDB } from "../../config/connectDB";
import { ObjectId } from "mongodb";

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === "POST") {
    // log the request body
    console.log(req.body);

    const {
      title,
      description,
      participants,
      publish,
      startDate,
      endDate,
      causeType,
      email,
      location,
      _id,
      participantsList,
      name,
    } = req.body;

    console.log("NEW EDIT REQUEST", _id, email);

    const conn = await ConnectDB();
    const db = conn.db();
    const initiatives = db.collection("initiatives");
    const notifications = db.collection("notifications");

    // update initiative
    const initiative = await initiatives.updateOne(
      {
        _id: ObjectId(_id),
        publisher: email,
      },
      {
        $set: {
          title,
          description,
          participants,
          publish,
          startDate,
          endDate,
          causeType,
          location,
        },
      }
    );

    console.log("PUSHING TO NOTIFICATIONS", participantsList);

    // map over participants push notifications
    await Promise.all(
      participantsList.map(async (participantID) => {
        // update notifications
        try {
          // check if notifications are already there
          const userEntry = await notifications.findOne({
            user: participantID,
          });

          // if not, create new entry
          if (!userEntry) {
            await notifications.insertOne({
              user: participantID,
              notifications: [],
            });
          }

          await notifications.updateOne(
            {
              user: participantID,
            },
            {
              $push: {
                notifications: {
                  type: 1,
                  initiativeID: _id,
                  name: name,
                  message: `${title} has been updated`,
                  dateCreated: new Date(),
                },
              },
            }
          );
        } catch (error) {
          console.log("ERROR", error);
        }
      })
    );

    console.log("PUSHED NOTIFICATIONS");

    // send the response status 200
    res.status(200).json(initiative);
    conn.close();
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Why you here, fam?" });
  }
}

export default handler;
