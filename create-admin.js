const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = "mongodb://127.0.0.1:27017/addmuiud_bkash_loan";

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const username = 'admin';
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 10);

  await Admin.findOneAndUpdate(
    { username },
    { username, password: hashedPassword },
    { upsert: true, new: true }
  );

  console.log('Admin account created/updated:');
  console.log('Username: admin');
  console.log('Password: admin123');

  await mongoose.disconnect();
}

seed().catch(console.error);
