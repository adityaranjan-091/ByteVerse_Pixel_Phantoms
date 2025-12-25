import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in .env.local");
}

// Basic validation to ensure the URI has the correct scheme
if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
  throw new Error(
    'Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://". Please check your MONGODB_URI in .env.local.'
  );
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect().then((c) => {
      console.log("Connected to MongoDB Atlas (Development)");
      return c;
    });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect().then((c) => {
    console.log("Connected to MongoDB Atlas (Production)");
    return c;
  });
}

export async function connectToDatabase() {
  return clientPromise;
}

export async function getDb() {
  const client = await connectToDatabase();
  return client.db("sustainbite");
}
