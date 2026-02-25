const mongoose = require("mongoose");

module.exports = async function connectDB(uri) {
  try {
    await mongoose.connect(uri, {
      tls: true,
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });

    console.log(`✅ MongoDB connected (database: ${mongoose.connection.name})`);
  } catch (err) {
    console.log("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};