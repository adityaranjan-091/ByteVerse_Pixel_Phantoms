import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, availability, message } = body;

    if (!name || !email || !phone || !availability) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const collection = db.collection("volunteers");
    await collection.insertOne({
      name,
      email,
      phone,
      availability,
      message: message || "",
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Volunteer data saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving volunteer data:", error);
    return NextResponse.json(
      { message: "Failed to save volunteer data", error: String(error) },
      { status: 500 }
    );
  }
}
