import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth"; 
import { authOptions } from "../auth/[...nextauth]/route";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    // Get the server session
    const session = await getServerSession(authOptions);
    console.log("Server Session:", session); 

    // Check if session and user ID exist
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { message: "Unauthorized: No valid session or user ID" },
        { status: 401 }
      );
    }

    // Parse the request body as JSON (matching client-side fetch)
    const body = await req.json();
    console.log("Request Body:", body); // Debug: Log the incoming request body
    const { description, quantity, bestBeforeDate, location, contact, userId } =
      body;

    // Validate required fields
    if (
      !description ||
      !quantity ||
      !bestBeforeDate ||
      !location ||
      !contact ||
      !userId
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to the database and insert data
    const db = await getDb();
    const collection = db.collection("leftover_food");
    const result = await collection.insertOne({
      description,
      quantity,
      bestBeforeDate,
      location,
      contact,
      userId: userId, 
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Food data saved successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving food data:", error);
    return NextResponse.json(
      { message: "Failed to save food data", error: String(error) },
      { status: 500 }
    );
  }
}
