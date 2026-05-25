import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Loan from '@/models/Loan';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const { action, loan_id } = body;

    if (!loan_id || !mongoose.Types.ObjectId.isValid(loan_id) || !action) {
      return NextResponse.json({ success: false, error: 'Valid ID and action are required' }, { status: 400 });
    }


    let updates = {};
    if (action === 'approve') {
      updates = { admin_action: 'approved', status: 'approved' };
    } else if (action === 'reject') {
      updates = { admin_action: 'rejected', status: 'rejected' };
    } else {
      return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    }

    const loan = await Loan.findByIdAndUpdate(loan_id, updates, { new: true });

    if (!loan) {
      return NextResponse.json({ success: false, error: 'Loan not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, loan });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
