// app/article/page.tsx
import { Suspense } from "react";
import ArticleList from "@/components/ArticleList";

export default function ArticlePage() {
  return (
    <main>
      <h1>Articles</h1>
      {/* Wrap the component using useSearchParams in Suspense */}
      <Suspense fallback={<div>Loading articles...</div>}>
        <ArticleList />
      </Suspense>
    </main>
  );
}
