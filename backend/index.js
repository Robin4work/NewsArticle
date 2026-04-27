require("dotenv").config();
const connectDB = require("./src/config/db");
const startFetchJob = require("./src/jobs/startFetchJob");
const app = require("./src/server");

async function startApp() {
  await connectDB();
  startFetchJob();

  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

startApp();
