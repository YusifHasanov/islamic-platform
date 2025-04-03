"use client"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect, useMemo } from "react"
import HttpClient from "@/util/HttpClient"
import Link from "next/link"
import {
  ArrowLeft, CalendarDays, Clock, Eye, FolderOpen, Share2, Tag as TagIcon, ThumbsUp, User, MessageSquare, // Added MessageSquare for consistency
  Loader2, // For loading state
  AlertTriangle, // For error state
} from "lucide-react"
import { motion } from "framer-motion"
import {formatDate} from "@/util/DateUtil";
// Optional: Add a markdown renderer if your answer content is complex
// import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'

// --- Helper Function ---


// --- Main Component ---
export default function QuestionDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [question, setQuestion] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasLiked, setHasLiked] = useState(false) // Keep track locally
  const [likeCount, setLikeCount] = useState(0); // Store initial like count
  const [relatedQuestions, setRelatedQuestions] = useState([])




    // --- Helper Function (Numeric Format) ---


  // --- Data Fetching ---
  useEffect(() => {
    const fetchQuestionData = async () => {
      if (!id) return; // Don't fetch if ID is missing

      setIsLoading(true);
      setError(null);
      setQuestion(null); // Clear previous question
      setRelatedQuestions([]);

      try {
        const response = await HttpClient.get(`/questions/${id}`); // Ensure API includes categories/tags
        if (!response.ok) {
          // Handle 404 or other errors specifically if possible
          if(response.status === 404) throw new Error("Not Found");
          throw new Error(`API error! status: ${response.status}`);
        }
        const data = await response.json();

        // Validate received data structure minimally
        if (!data || typeof data !== 'object' || !data.id) {
          throw new Error("Invalid data format received from API.");
        }

        // Set question data and initial like count (assuming API provides it)
        setQuestion({
          ...data,
          // Ensure nested arrays exist or default to empty
          categories: Array.isArray(data.categories) ? data.categories : [],
          tags: Array.isArray(data.tags) ? data.tags : [],
          createdDate: formatDate(data.createdDate),
          // Assuming API provides these, otherwise keep placeholders
          readCount: data.viewCount ?? Math.floor(Math.random() * 1000) + 100,
          // Assuming API provides initial like count
          initialLikeCount: data.likeCount ?? Math.floor(Math.random() * 50) + 5,
          // Optional: Calculate read time server-side or use a simple estimate
          readTimeMinutes: data.readTime ?? Math.max(1, Math.ceil((data.answer?.length || 0) / 1000)), // ~200 wpm
        });
        setLikeCount(data.likeCount ?? Math.floor(Math.random() * 50) + 5);

        // TODO: Replace simulation with actual API call for related questions
        // Example: const relatedResponse = await HttpClient.get(`/questions/${id}/related?limit=4`);
        // setRelatedQuestions(relatedResponse.data);
        setTimeout(() => {
          setRelatedQuestions([
            { id: 22, question: "Namazda səhv etdikdə nə etmək lazımdır?", tags: [{ id: 1, name: "Namaz" }, { id: 2, name: "Fiqh" }] },
            { id: 23, question: "Ramazan ayında oruc tutmağın faydaları nələrdir?", tags: [{ id: 3, name: "Ramazan" }, { id: 4, name: "Oruc" }, { id: 2, name: "Fiqh" }] },
            { id: 24, question: "Quran oxumağın ən yaxşı vaxtı nə zamandır?", tags: [{ id: 5, name: "Quran" }, { id: 6, name: "İbadət" }] },
            { id: 25, question: "Zəkat kimlərə verilməlidir?", tags: [{ id: 7, name: "Zəkat" }, { id: 2, name: "Fiqh" }] },
          ].filter(rq => rq.id.toString() !== id.toString()).slice(0, 4)); // Exclude current, limit to 4
        }, 300); // Simulate network delay

      } catch (err) {
        console.error("Error fetching question:", err);
        if (err.message === "Not Found") {
          setError("Sual tapılmadı. Silinmiş və ya mövcud olmayan bir sual axtarırsınız.");
        } else {
          setError("Sualı yükləmək mümkün olmadı. Zəhmət olmasa yenidən cəhd edin.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestionData();
  }, [id]); // Re-fetch if ID changes

  // --- Event Handlers ---
  const handleLike = () => {
    // Update UI immediately
    const newLikedState = !hasLiked;
    setHasLiked(newLikedState);
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);

    // TODO: Send API request to update like status/count
    // Example: HttpClient.post(`/questions/${id}/like`).catch(err => { /* revert UI changes on error */ });
  };

  const handleShare = async () => {
    const shareData = {
      title: question?.question,
      text: `Sual: ${question?.question}`,
      url: window.location.href,
    };
    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link kopyalandı!"); // Provide feedback
      } else {
        alert("Paylaşma və ya kopyalama dəstəklənmir."); // Fallback message
      }
    } catch (err) {
      console.error("Share error:", err);
      // Handle specific errors like AbortError if needed
      if (err.name !== 'AbortError') {
        alert("Paylaşarkən xəta baş verdi.");
      }
    }
  };

  // --- Conditional Rendering ---
  if (isLoading) {
    return <QuestionDetailSkeleton />;
  }

  if (error) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6 text-center">
          <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Xəta baş verdi</h2>
          <p className="text-gray-500 mb-6 max-w-md">{error}</p>
          <button onClick={() => router.push("/questions")} className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
            Bütün suallara qayıt
          </button>
        </div>
    );
  }

  if (!question) {
    // This case might be covered by the error state if API returns 404
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-6 text-center">
          <Search className="h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Sual tapılmadı</h2>
          <p className="text-gray-500 mb-6 max-w-md">Axtardığınız sual mövcud deyil.</p>
          <button onClick={() => router.push("/questions")} className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
            Bütün suallara qayıt
          </button>
        </div>
    );
  }

  // --- Main Render ---
  return (
      <div className="bg-gradient-to-b from-emerald-50 via-white to-white min-h-screen">
        {/* Back Navigation */}
        <div className="container mx-auto px-4 pt-6 md:pt-8">
          <Link href="/questions" className="inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-900 transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Bütün suallara qayıt
          </Link>
        </div>

        <div className="container mx-auto py-6 md:py-10 px-4 max-w-4xl">
          <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 md:space-y-10" // Increased spacing
          >
            {/* === Question Header & Metadata === */}
            <header className="space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {question.question}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 border-t border-b border-gray-100 py-3">
                <span className="flex items-center" title="Yaradılma tarixi">
                    <CalendarDays className="mr-1.5 h-4 w-4 text-emerald-600" />
                  {formatDate(question.createdDate)}
                </span>
                {question.readTimeMinutes && (
                    <span className="flex items-center" title="Oxunma müddəti">
                        <Clock className="mr-1.5 h-4 w-4 text-emerald-600" />
                        ≈ {question.readTimeMinutes} dəq oxunuş
                    </span>
                )}
                {question.readCount !== undefined && (
                    <span className="flex items-center" title="Baxış sayı">
                        <Eye className="mr-1.5 h-4 w-4 text-emerald-600" />
                      {question.readCount} baxış
                    </span>
                )}
                {/* Optional Author */}
                {/* {question.author && ( <span className="flex items-center"><User className="mr-1.5 h-4 w-4 text-emerald-600" />{question.author}</span> )} */}
              </div>
            </header>

            {/* === Answer Content === */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8"
            >
              {/* Use prose for automatic typography styling */}
              <div className="prose prose-emerald max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-headings:font-semibold prose-headings:text-gray-800 prose-a:text-emerald-600 hover:prose-a:text-emerald-700">
                {/* Render answer content - consider using a markdown renderer if applicable */}
                {question.answer.split('\n').map((paragraph, index) => (
                    // Filter out empty paragraphs potentially caused by multiple newlines
                    paragraph.trim() ? <p key={index}>{paragraph}</p> : null
                ))}
                {/* Example with react-markdown:
                 <ReactMarkdown remarkPlugins={[remarkGfm]}>
                     {question.answer}
                 </ReactMarkdown>
                 */}
              </div>
            </motion.div>

            {/* === Tags and Categories === */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="space-y-4 p-5 bg-gray-50/50 rounded-lg border border-gray-100"
            >
              {question.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <TagIcon className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700 mr-1">Taqlər:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {question.tags.map(tag => (
                          <Link key={tag.id} href={`/questions?tag=${tag.id}&page=1`} className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-300 rounded-full">
                                 <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors">
                                     {tag.name}
                                 </span>
                          </Link>
                      ))}
                    </div>
                  </div>
              )}
              {question.categories.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700 mr-1">Kateqoriyalar:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {question.categories.map(category => (
                          <Link key={category.id} href={`/questions?category=${category.id}&page=1`} className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-300 rounded-full">
                                  <span className="inline-block px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full hover:bg-emerald-100 transition-colors">
                                     {category.name}
                                  </span>
                          </Link>
                      ))}
                    </div>
                  </div>
              )}
            </motion.div>

            {/* === Action Buttons === */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-5 border-t border-gray-100"
            >
              <button
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all border ${
                      hasLiked
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm"
                          : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50"
                  }`}
                  onClick={handleLike}
                  aria-pressed={hasLiked}
              >
                <ThumbsUp className={`h-4 w-4 ${hasLiked ? 'text-emerald-600' : ''}`} />
                <span>Faydalı</span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${hasLiked ? 'bg-emerald-200 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>
                  {likeCount}
              </span>
              </button>
              <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                <Share2 className="h-4 w-4" />
                <span>Paylaş</span>
              </button>
            </motion.div>

            {/* === Related Questions === */}
            {relatedQuestions.length > 0 && (
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="pt-8 md:pt-10 border-t border-gray-100"
                >
                  <h2 className="text-xl font-semibold mb-5 text-gray-800">Oxşar Suallar</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {relatedQuestions.map(rq => (
                        <RelatedQuestionCard key={rq.id} question={rq} />
                    ))}
                  </div>
                </motion.section>
            )}

          </motion.article>
        </div>
      </div>
  );
}

// --- Sub Components ---

// Related Question Card
function RelatedQuestionCard({ question }) {
  return (
      <Link
          href={`/questions/${question.id}`}
          className="group block p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-200"
      >
        <h3 className="font-medium text-sm text-gray-800 group-hover:text-emerald-700 mb-2 line-clamp-2">
          {question.question}
        </h3>
        {question.tags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {question.tags.map(tag => (
                  <span key={tag.id || tag.name} // Use ID if available, fallback to name
                        className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
               {tag.name}
             </span>
              ))}
            </div>
        )}
      </Link>
  );
}


// Skeleton Loader - Improved structure
function QuestionDetailSkeleton() {
  return (
      <div className="container mx-auto py-8 px-4 max-w-4xl animate-pulse">
        {/* Back link placeholder */}
        <div className="mb-8 h-5 w-36 bg-gray-200 rounded"></div>

        <div className="space-y-8 md:space-y-10">
          {/* Header Skeleton */}
          <header className="space-y-4">
            <div className="h-8 md:h-10 bg-gray-300 rounded w-4/5"></div> {/* Title */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 py-3 border-y border-gray-100"> {/* Metadata */}
              <div className="h-5 bg-gray-200 rounded w-32"></div>
              <div className="h-5 bg-gray-200 rounded w-28"></div>
              <div className="h-5 bg-gray-200 rounded w-24"></div>
            </div>
          </header>

          {/* Answer Skeleton */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="space-y-3">
              <div className="h-5 bg-gray-200 rounded"></div>
              <div className="h-5 bg-gray-200 rounded w-11/12"></div>
              <div className="h-5 bg-gray-200 rounded"></div>
              <div className="h-5 bg-gray-200 rounded w-5/6"></div>
              <div className="h-5 bg-gray-200 rounded w-10/12"></div>
              <div className="h-5 bg-gray-200 rounded"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>

          {/* Tags/Categories Skeleton */}
          <div className="space-y-4 p-5 bg-gray-50/50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
              <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
              <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* Actions Skeleton */}
          <div className="flex justify-between items-center pt-5 border-t border-gray-100">
            <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
            <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Related Skeleton */}
          <div className="pt-8 md:pt-10 border-t border-gray-100">
            <div className="h-6 w-40 bg-gray-300 rounded mb-5"></div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm space-y-2">
                <div className="h-5 bg-gray-200 rounded w-full"></div>
                <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                <div className="flex gap-1.5 pt-1">
                  <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                  <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm space-y-2">
                <div className="h-5 bg-gray-200 rounded w-11/12"></div>
                <div className="flex gap-1.5 pt-3">
                  <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
                  <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
  );
}
