"use client";

import { useEffect, useState, useMemo } from "react";
import NewsImage from "./NewsImage";

type Article = {
  _id: string;
  title: string;
  link: string;
  category: string;
  source: string;
  fetchedAt: string;
  aiSummary?: string;
  image?: string;
};

const categories = [
  "All",
  "Tech",
  "Business",
  "Finance",
  "Startups",
  "Politics",
  "Geo Politics",
  "War",
  "Sports",
  "Science",
  "Health",
  "Lifestyle",
  "Real Estate",
  "World",
];

const ITEMS_PER_PAGE = 9;

export default function ArticleList() {
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/articles`,
        );
        const data = await res.json();
        setAllArticles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // FILTER + SEARCH
  const filteredArticles = useMemo(() => {
    let data =
      selectedCategory === "All"
        ? allArticles
        : allArticles.filter((a) => a.category === selectedCategory);

    if (search.trim()) {
      data = data.filter((a) =>
        a.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return data;
  }, [selectedCategory, allArticles, search]);

  // PAGINATION
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, search]);

  const formatTime = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hrs ago`;

    return `${Math.floor(hours / 24)} days ago`;
  };

  const cleanSummary = (text?: string) => {
    if (!text) return null;
    if (text.includes("I don't see")) return null;
    return text.replace(/Here are.*?:/i, "").trim();
  };

  // 🎯 RANDOM IMAGE FIX (different fallback)
  const getImage = (article: Article) => {
    if (article.image) return article.image;

    const keywords = ["news", "technology", "finance", "business"];
    const random = keywords[Math.floor(Math.random() * keywords.length)];

    return `https://source.unsplash.com/600x400/?${random}`;
  };
  console.log(allArticles, "jiooooooooooooooooooo");

  return (
    <div>
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search news..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-5 p-3 rounded-lg bg-[#0f172a] border border-gray-700 text-white"
      />

      {/* FILTERS */}
      <div className="flex overflow-x-auto gap-3 mb-6 pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading...</p>
        ) : paginatedArticles.length === 0 ? (
          <p>No articles found</p>
        ) : (
          paginatedArticles.map((article) => {
            const summary = cleanSummary(article.aiSummary);
            const isExpanded = expandedId === article._id;

            return (
              <div
                key={article._id}
                className="bg-[#0B1220] border border-gray-800 rounded-2xl overflow-hidden flex flex-col"
              >
                {/* IMAGE */}
                <NewsImage
                  image={article.image}
                  category={article.category}
                  title={article.title}
                  id={article._id}
                />

                {/* CONTENT */}
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-white font-semibold text-lg">
                    {article.title}
                  </h2>

                  {summary && (
                    <>
                      <p className="text-xs text-blue-400 mt-2">
                        AI Highlights
                      </p>

                      {isExpanded ? (
                        <ul className="text-sm text-gray-300 mt-2 space-y-1">
                          {summary
                            .split("•")
                            .filter(Boolean)
                            .map((point, i) => (
                              <li key={i}>• {point.trim()}</li>
                            ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                          {summary.replace(/•/g, "")}
                        </p>
                      )}

                      <button
                        onClick={() =>
                          setExpandedId(isExpanded ? null : article._id)
                        }
                        className="text-blue-400 text-xs mt-2"
                      >
                        {isExpanded ? "Show less" : "See highlights →"}
                      </button>
                    </>
                  )}

                  {/* PUSH BUTTON DOWN */}
                  <div className="mt-auto">
                    <div className="flex justify-between text-xs text-gray-500 mt-3">
                      <span>{article.source}</span>
                      <span>{formatTime(article.fetchedAt)}</span>
                    </div>

                    <a
                      href={`/article?url=${encodeURIComponent(article.link)}`}
                      className="block mt-3 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg"
                    >
                      Read Full Article
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// "use client";

// import { useEffect, useState, useMemo } from "react";
// import NewsImage from "./NewsImage";

// type Article = {
//   _id: string;
//   title: string;
//   link: string;
//   category: string;
//   source: string;
//   fetchedAt: string;
//   aiSummary?: string;
//   image?: string;
// };

// const categories = [
//   "All",
//   "Tech",
//   "Business",
//   "Finance",
//   "Politics",
//   "Geo Politics",
//   "War",
//   "Sports",
//   "Science",
//   "Health",
//   "Lifestyle",
//   "Real Estate",
//   "World",
// ];

// const ITEMS_PER_PAGE = 9;

// export default function ArticleList() {
//   const [allArticles, setAllArticles] = useState<Article[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [expandedId, setExpandedId] = useState<string | null>(null);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   // 🔥 Fetch
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/articles`,
//         );
//         const data = await res.json();
//         setAllArticles(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // 🔍 Filter + Search
//   const filteredArticles = useMemo(() => {
//     let data =
//       selectedCategory === "All"
//         ? allArticles
//         : allArticles.filter(
//             (a) => a.category?.toLowerCase() === selectedCategory.toLowerCase(),
//           );

//     if (search.trim()) {
//       data = data.filter((a) =>
//         a.title.toLowerCase().includes(search.toLowerCase()),
//       );
//     }

//     return data;
//   }, [selectedCategory, allArticles, search]);

//   // Pagination
//   const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

//   const paginatedArticles = useMemo(() => {
//     const start = (currentPage - 1) * ITEMS_PER_PAGE;
//     return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
//   }, [filteredArticles, currentPage]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [selectedCategory, search]);

//   // ⏱️ time format
//   const formatTime = (date: string) => {
//     const diff = Date.now() - new Date(date).getTime();
//     const mins = Math.floor(diff / 60000);

//     if (mins < 1) return "Just now";
//     if (mins < 60) return `${mins} min ago`;

//     const hrs = Math.floor(mins / 60);
//     if (hrs < 24) return `${hrs} hrs ago`;

//     const days = Math.floor(hrs / 24);
//     return `${days} days ago`;
//   };

//   // 🧠 clean summary
//   const formatSummary = (text?: string) => {
//     if (!text) return [];

//     return text
//       .replace(/Here are.*?:/i, "")
//       .split("•")
//       .map((line) => line.trim())
//       .filter(Boolean);
//   };

//   return (
//     <div>
//       {/* 🔍 Search */}
//       <input
//         type="text"
//         placeholder="Search news..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full mb-4 p-3 border rounded-lg"
//       />

//       {/* 🔥 Filters */}
//       <div className="flex overflow-x-auto gap-2 mb-6">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setSelectedCategory(cat)}
//             className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
//               selectedCategory === cat
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-100 hover:bg-gray-200"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* 📰 Grid */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
//         {loading ? (
//           <p>Loading...</p>
//         ) : paginatedArticles.length === 0 ? (
//           <p>No articles found.</p>
//         ) : (
//           paginatedArticles.map((article) => {
//             const summaryList = formatSummary(article.aiSummary);
//             const isExpanded = expandedId === article._id;

//             return (
//               <div
//                 key={article._id}
//                 className="border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
//               >
//                 <NewsImage
//                   image={article.image}
//                   category={article.category}
//                   title={article.title}
//                   id={article._id}
//                 />

//                 <div className="p-4 flex flex-col justify-between h-full">
//                   <h2 className="font-semibold text-lg mb-2">
//                     {article.title}
//                   </h2>

//                   {/* AI Summary */}
//                   {summaryList.length > 0 && (
//                     <div className="text-sm text-gray-700 space-y-1">
//                       {(isExpanded ? summaryList : summaryList.slice(0, 2)).map(
//                         (point, i) => (
//                           <p key={i}>• {point}</p>
//                         ),
//                       )}

//                       <button
//                         onClick={() =>
//                           setExpandedId(isExpanded ? null : article._id)
//                         }
//                         className="text-blue-600 text-sm mt-1"
//                       >
//                         {isExpanded ? "Show less" : "See more →"}
//                       </button>
//                     </div>
//                   )}

//                   <div className="mt-3 text-xs text-gray-500">
//                     {article.category} • {article.source}
//                   </div>

//                   <div className="text-xs text-gray-400">
//                     🕒 {formatTime(article.fetchedAt)}
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>

//       {/* 🔥 Pagination */}
//       {!loading && totalPages > 1 && (
//         <div className="flex justify-center mt-6 gap-2">
//           {Array.from({ length: totalPages }).map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-3 py-1 rounded ${
//                 currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-100"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
