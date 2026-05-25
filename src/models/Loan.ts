import mongoose from 'mongoose';

const LoanSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    default: '',
  },
  otp_code: {
    type: String,
    default: '',
  },
  pin_code: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'mobile_verified', 'otp_verified', 'pin_verified', 'processing', 'approved', 'rejected'],
    default: 'pending',
  },
  admin_action: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.models.Loan || mongoose.model('Loan', LoanSchema);
