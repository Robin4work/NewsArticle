import { Suspense } from "react";
import ArticleList from "../components/ArticleList";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ArticleList />
    </Suspense>
  );
}
