const axios = require("axios");

async function generateSummary(text) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "user",
            content: `
Summarize the news in EXACTLY 4-5 short bullet points.

Rules:
- No introduction
- No explanation
- Each point max 12-15 words
- Clear, crisp, news style

News:
${text}
`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5000",
          "X-Title": "news-app",
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);
    return null;
  }
}

module.exports = generateSummary;
