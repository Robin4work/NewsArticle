function categorizeArticle(title) {
  const t = title.toLowerCase();

  // 🧠 Tech
  if (
    t.includes("ai") ||
    t.includes("tech") ||
    t.includes("software") ||
    t.includes("app") ||
    t.includes("startup") ||
    t.includes("saas")
  )
    return "Tech";

  // 💰 Finance
  if (
    t.includes("stock") ||
    t.includes("market") ||
    t.includes("finance") ||
    t.includes("investment") ||
    t.includes("fund") ||
    t.includes("crypto") ||
    t.includes("bitcoin")
  )
    return "Finance";

  // 🏢 Business
  if (
    t.includes("business") ||
    t.includes("company") ||
    t.includes("revenue") ||
    t.includes("profit") ||
    t.includes("industry")
  )
    return "Business";

  // 🏛️ Politics
  if (
    t.includes("election") ||
    t.includes("government") ||
    t.includes("policy") ||
    t.includes("minister") ||
    t.includes("parliament")
  )
    return "Politics";

  // 🌍 Geo Politics
  if (
    t.includes("china") ||
    t.includes("usa") ||
    t.includes("russia") ||
    t.includes("india") ||
    t.includes("uk") ||
    t.includes("global")
  )
    return "Geo Politics";

  // ⚔️ War
  if (
    t.includes("war") ||
    t.includes("military") ||
    t.includes("attack") ||
    t.includes("missile") ||
    t.includes("defense")
  )
    return "War";

  // ⚽ Sports
  if (
    t.includes("match") ||
    t.includes("cricket") ||
    t.includes("football") ||
    t.includes("ipl") ||
    t.includes("tournament") ||
    t.includes("player")
  )
    return "Sports";

  // 🔬 Science
  if (
    t.includes("science") ||
    t.includes("research") ||
    t.includes("space") ||
    t.includes("nasa") ||
    t.includes("experiment")
  )
    return "Science";

  // 🏥 Health
  if (
    t.includes("health") ||
    t.includes("fitness") ||
    t.includes("disease") ||
    t.includes("hospital") ||
    t.includes("medical")
  )
    return "Health";

  // 🏠 Real Estate
  if (
    t.includes("home") ||
    t.includes("property") ||
    t.includes("real estate") ||
    t.includes("housing")
  )
    return "Real Estate";

  // 🧘 Lifestyle
  if (
    t.includes("life") ||
    t.includes("family") ||
    t.includes("culture") ||
    t.includes("travel") ||
    t.includes("food")
  )
    return "Lifestyle";

  return "World";
}

module.exports = categorizeArticle;
