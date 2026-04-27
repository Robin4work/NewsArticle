require("dotenv").config();
const generateSummary = require("./src/utils/aiProcessor");

(async () => {
  const result = await generateSummary(
    "India real estate market is growing rapidly due to new government policies.",
  );

  console.log("\nAI Output:\n", result);
})();
