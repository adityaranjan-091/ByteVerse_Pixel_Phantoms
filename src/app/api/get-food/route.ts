import { NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const collection = db.collection("leftover_food");
    const foodData = await collection.find({}).toArray();
    return NextResponse.json(
      foodData.map((doc) => ({ ...doc, _id: doc._id.toString() }))
    );
  } catch (error) {
    console.error("Error fetching food data:", error);
    return NextResponse.json(
      { message: "Failed to fetch food data", error: String(error) },
      { status: 500 }
    );
  }
}
