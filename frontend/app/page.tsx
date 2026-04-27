import ArticleList from "../components/ArticleList";

export default function Home() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>

      <ArticleList />
    </main>
  );
}