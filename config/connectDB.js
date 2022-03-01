import { MongoClient } from "mongodb";

export async function ConnectDB() {
  //connect to database using mongoclietn
  console.log("CONNECTING TO DB");
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const client = await MongoClient.connect(process.env.MONGODB_URI, opts);
  console.log("DB CONNECTED");

  return client;
}
