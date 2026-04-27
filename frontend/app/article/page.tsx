"use client";

import { useSearchParams } from "next/navigation";

export default function ArticlePage() {
  const params = useSearchParams();
  const url = params.get("url");

  if (!url) return <p>No article found</p>;

  return (
    <div className="w-full h-screen">
      <iframe
        src={url}
        className="w-full h-full border-none"
      />
    </div>
  );
}