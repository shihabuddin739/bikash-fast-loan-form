const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = "mongodb://127.0.0.1:27017/addmuiud_bkash_loan";

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const username = 'admin';
  const password = 'password';
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log('Admin already exists');
  } else {
    await Admin.create({ username, password: hashedPassword });
    console.log('Admin created: admin / password');
  }

  await mongoose.disconnect();
}

seed().catch(console.error);
