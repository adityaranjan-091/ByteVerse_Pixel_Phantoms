import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

export async function connectToDatabase() {
  if (client) return client;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in .env.local");
  }

  client = new MongoClient(uri);
  await client.connect();
  console.log("Connected to MongoDB Atlas");
  return client;
}

export async function getDb() {
  const client = await connectToDatabase();
  return client.db("sustainbite");
}
