const express = require("express");
const Article = require("./models/Article");
const cors = require("cors");

const app = express();
app.use(cors());

// GET all articles (with optional category filter)
app.get("/api/articles", async (req, res) => {
  try {
    const { category } = req.query;

    let query = {};

    if (category && category !== "All") {
      query.category = { $regex: `^${category}$`, $options: "i" }; // ✅ FIX
    }

    const articles = await Article.find(query).sort({ pubDate: -1 });

    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
