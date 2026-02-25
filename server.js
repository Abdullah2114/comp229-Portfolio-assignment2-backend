require("dotenv").config();

const configureExpress = require("./server/config/express");
const connectDB = require("./server/config/mongodb");

const PORT = process.env.PORT || 3000;

connectDB(process.env.MONGO_URI);

const app = configureExpress();

app.listen(PORT, () => {
  console.log("====================================");
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log("📂 Available Endpoints:");
  console.log(`   http://localhost:${PORT}/api/projects`);
  console.log(`   http://localhost:${PORT}/api/services`);
  console.log(`   http://localhost:${PORT}/api/users`);
  console.log(`   http://localhost:${PORT}/api/references`);
  console.log("====================================");
});