import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    // Get the server session
    const session = await getServerSession(authOptions);

    // Check if session and user ID exist
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { message: "Unauthorized: No valid session or user ID" },
        { status: 401 }
      );
    }

    // Parse the request body as JSON (matching client-side fetch)
    const body = await req.json();
    const { description, quantity, bestBeforeDate, location, contact } =
      body;

    // Validate required fields and types
    if (
      !description ||
      typeof description !== "string" ||
      !quantity ||
      typeof quantity !== "number" ||
      !bestBeforeDate ||
      typeof bestBeforeDate !== "string" ||
      isNaN(Date.parse(bestBeforeDate)) ||
      !location ||
      typeof location !== "object" ||
      !location.latitude ||
      typeof location.latitude !== "number" ||
      !location.longitude ||
      typeof location.longitude !== "number" ||
      !contact ||
      typeof contact !== "string"
    ) {
      return NextResponse.json(
        { message: "Invalid or missing required fields" },
        { status: 400 }
      );
    }

    // Connect to the database and insert data
    const db = await getDb();
    const collection = db.collection("leftover_food");
    const result = await collection.insertOne({
      description,
      quantity,
      bestBeforeDate: new Date(bestBeforeDate),
      location,
      contact,
      userId: session.user.id,
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
