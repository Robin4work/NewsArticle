"use client";

import { useState } from "react";

type Props = {
  image?: string;
  category: string;
  title: string;
  id: string;
};

export default function NewsImage({ image, category, title, id }: Props) {
  const [imgSrc, setImgSrc] = useState<string>("");

  // 🔍 extract keywords from title
  const extractKeyword = () => {
    const words = title.toLowerCase().split(" ");

    if (words.includes("ai") || words.includes("tech")) return "technology,ai";
    if (
      words.includes("stock") ||
      words.includes("market") ||
      words.includes("finance")
    )
      return "finance,stock market";
    if (words.includes("health") || words.includes("fitness"))
      return "health,fitness";
    if (words.includes("family") || words.includes("lifestyle"))
      return "lifestyle,family";
    if (words.includes("property") || words.includes("real estate"))
      return "real estate,property";

    return words.slice(0, 2).join(",");
  };

  // 🎯 category mapping
  const categoryMap: any = {
    Tech: "technology,ai",
    Finance: "finance,stock market",
    Lifestyle: "lifestyle,family",
    "Real Estate": "real estate,property",
    General: "world news",
  };

  const getImage = () => {
    // ✅ 1. RSS image
    if (image) return image;

    // ✅ 2. category
    const categoryKeyword = categoryMap[category];

    // ✅ 3. title keyword
    const titleKeyword = extractKeyword();

    const keyword = categoryKeyword || titleKeyword;

    // using picsum seed (stable)
    return `https://picsum.photos/seed/${keyword}-${id}/600/400`;
  };

  const fallback = `https://picsum.photos/seed/${id}/600/400`;

  return (
    <img
      src={imgSrc || getImage()}
      alt="news"
      onError={() => setImgSrc(fallback)}
      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
    />
  );
}
