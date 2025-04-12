import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../../lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; 

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { description, quantity, location } = body;

    if (!description || !quantity || !location) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const db = await getDb();
    const collection = db.collection('leftover_food');
    await collection.insertOne({
      description,
      quantity,
      location,
      createdAt: new Date(),
      userId: session.user.id,
    });

    return NextResponse.json({ message: 'Food data saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving food data:', error);
    return NextResponse.json(
      { message: 'Failed to save food data', error: String(error) },
      { status: 500 }
    );
  }
}