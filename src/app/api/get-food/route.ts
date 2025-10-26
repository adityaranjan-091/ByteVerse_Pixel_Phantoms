import { NextResponse, NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";


export async function GET(request: NextRequest) {
  try {
    

    const db = await getDb();
    const collection = db.collection("leftover_food");
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      if (!ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
      }
      const foodItem = await collection.findOne({ _id: new ObjectId(id) });
      if (!foodItem) {
        return NextResponse.json({ message: "Food not found" }, { status: 404 });
      }
      return NextResponse.json({ ...foodItem, _id: foodItem._id.toString() });
    } else {
      const foodData = await collection.find({}).toArray();
      return NextResponse.json(
        foodData.map((doc) => ({ ...doc, _id: doc._id.toString() }))
      );
    }
  } catch (error) {
    console.error("Error fetching food data:", error);
    return NextResponse.json(
      { message: "Failed to fetch food data", error: String(error) },
      { status: 500 }
    );
  }
}