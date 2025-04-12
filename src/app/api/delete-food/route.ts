import { NextRequest, NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 });
    }

    const db = await getDb();
    const collection = db.collection("leftover_food");
    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      userId: session.user.id,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Food entry not found or not owned by user" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Food entry deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting food data:", error);
    return NextResponse.json(
      { message: "Failed to delete food data", error: String(error) },
      { status: 500 }
    );
  }
}
