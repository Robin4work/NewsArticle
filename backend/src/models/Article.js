const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    link: {
      type: String,
      unique: true,
      required: true,
    },

    pubDate: {
      type: Date,
      default: null,
    },

    source: {
      type: String,
      default: "Unknown",
    },

    category: {
      type: String,
      default: "World", // ✅ sync with categorize.js
      index: true,
    },

    image: {
      type: String, // ✅ ADD THIS
      default: null,
    },

    fetchedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    aiSummary: {
      type: String,
      default: null,
    },

    aiContent: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Article", articleSchema);
