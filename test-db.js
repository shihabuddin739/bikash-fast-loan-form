const mongoose = require('mongoose');
const MONGODB_URI = "mongodb://127.0.0.1:27017/addmuiud_bkash_loan";

async function test() {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB Connected Successfully');
    await mongoose.disconnect();
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
  }
}

test();
