import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/react';
import { ConnectDB } from '../../../config/connectDB';

async function handler(req, res) {
  //Only POST mothod is accepted
  if (req.method === 'POST') {
    // Pull sender, message, receiver from request body
    const { threadID, userID } = req.body;

    const conn = await ConnectDB();
    const db = conn.db();
    const users = db.collection('users');

    const receiverID = threadID?.replace(userID, '');
    // get receiverData

    console.log('ThreadID: ', threadID);
    console.log('UserID: ', userID);
    console.log('receiverID', receiverID);

    let receiverData;
    try {
      receiverData = await users.findOne({
        _id: ObjectId(receiverID),
      });
    } catch (e) {
      receiverData = null;
    }
    console.log('Receiver Data', receiverData);
    if (!receiverData) {
      console.log('No receiver data');
      res.status(500).json({});
      return;
    }

    const { name, email, mobileNumber, _id } = receiverData;

    const activeThread = {
      threadID,
      receiverID,
      name,
      email,
      mobileNumber,
      id: _id,
    };

    console.log('RETURNING ACTIVE THREAD: ', activeThread);
    // respond with activeThreads
    res.status(200).json(activeThread);

    conn.close();
  } else {
    //Response for other than POST method
    res
      .status(500)
      .json({ message: `Why you here, fam? Method: ${req.method}` });
  }
}

export default handler;
