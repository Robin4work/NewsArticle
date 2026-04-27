const cron = require("node-cron");
const fetchNews = require("../../fetchNews");

const startFetchJob = () => {
  cron.schedule("*/30 * * * * *", () => {
    console.log("\n⏰ Running cron job (every 30 sec)...\n");
    fetchNews();
  });
};

module.exports = startFetchJob;
