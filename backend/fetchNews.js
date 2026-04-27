require("dotenv").config();
const Parser = require("rss-parser");
const parser = new Parser();

const Article = require("./src/models/Article");
const sources = require("./src/config/sources");
const categorizeArticle = require("./src/utils/categorize");
const generateSummary = require("./src/utils/aiProcessor");

async function fetchNews() {
  try {
    for (let source of sources) {
      console.log(`\n📡 Fetching from: ${source.name}\n`);

      const feed = await parser.parseURL(source.url);

      const items = feed.items; // no limit now

      for (let item of items) {
        // ❌ skip invalid data
        if (!item.title || !item.link) continue;

        const exists = await Article.findOne({ link: item.link });
        if (exists) {
          console.log("⚠️ Duplicate skipped:", item.title);
          continue;
        }

        const category = categorizeArticle(item.title);

        const image = item.enclosure?.url || item["media:content"]?.url || null;

        let summary = null;

        // ✅ AI only for few (save API + fast)
        if (Math.random() < 0.3) {
          try {
            summary = await generateSummary(item.title);
          } catch (err) {
            console.log("⚠️ AI failed:", err.message);
          }
        }

        await Article.create({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate || null,
          source: source.name,
          category,
          aiSummary: summary,
          image,
          fetchedAt: new Date(),
        });

        console.log("✅ Saved:", item.title);
      }
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

module.exports = fetchNews;
