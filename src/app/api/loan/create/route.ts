import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Loan from '@/models/Loan';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { amount, category } = body;

    const loan = await Loan.create({
      amount,
      category,
      status: 'pending'
    });

    return NextResponse.json({ success: true, id: loan._id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
