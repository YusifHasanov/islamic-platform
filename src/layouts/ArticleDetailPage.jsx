import Image from "next/image"
import Link from "next/link"
import ArticleDetailCategories from "@/components/articledetail/ArticleDetailCategories"
import MostReadArticles from "@/components/articledetail/MostReadArticles"
import ArticleApiCount from "@/components/articledetail/ArticleApiCount"
import ArticleReadScroll from "@/components/articledetail/ArticleReadScroll";
import ShareArticle from "@/components/articledetail/ShareArticle";
import RelatedArticles from "@/components/articledetail/RelatedArticles";

const ArticleDetailPage = ({article}) => {
    const isLiked = true;
    const likeCount = 12;
    // const [isLiked, setIsLiked] = useState(false)
    // const [likeCount, setLikeCount] = useState(article.likes || 0)
    // const [showShareOptions, setShowShareOptions] = useState(false)

    // Handle scroll progress


    // Format date
    const formatDate = (dateString) => {
        const options = {year: "numeric", month: "long", day: "numeric"}
        return new Date(dateString).toLocaleDateString("az-AZ", options)
    }

    // Handle like
    const handleLike = async () => {
        // setIsLiked(!isLiked)
        // setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
        //
        // try {
        //     await HttpClient.post(`/articles/${article.id}/like`)
        // } catch (error) {
        //     console.error("Error liking article:", error)
        //     // Revert on error
        //     setIsLiked(isLiked)
        //     setLikeCount(likeCount)
        // }
    }


    // Copy to clipboard


    // Calculate reading time
    const calculateReadingTime = (content) => {
        const wordsPerMinute = 200
        const textLength = content.split(" ").length
        if (textLength > 0) {
            const readingTime = Math.ceil(textLength / wordsPerMinute)
            return readingTime < 1 ? 1 : readingTime
        }
        return 1
    }

    const readingTime = calculateReadingTime(article.content)

    return (
        <div className="bg-gray-50 min-h-screen pb-16">
            {/* Reading Progress Bar */}
            <ArticleReadScroll/>

            {/* Hero Image */}
            <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
                <Image
                    src={article.image || "/placeholder.svg?height=600&width=1200"}
                    alt={article.title}
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
                    <div className="container mx-auto">
                        <h1
                            className="text-3xl animate-fadeInUp md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl"
                        >
                            {article.title}
                        </h1>
                        <div
                            className="flex animate-fadeInUpDelay flex-wrap items-center text-sm md:text-base gap-4 text-gray-200"
                        >
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                {formatDate(article.publishedAt)}
                            </div>
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2"
                                >
                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                                {article.viewCount || 0} baxış
                            </div>
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2"
                                >
                                    <path d="M12 20V10"></path>
                                    <path d="M18 20V4"></path>
                                    <path d="M6 20v-6"></path>
                                </svg>
                                {readingTime} dəqiqəlik oxunuş
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-10">
                <main className="bg-white rounded-t-2xl shadow-md md:p-10 sm:p-6 p-4">
                    {/* Author Info */}
                    <div className="flex items-center mb-8">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                            <Image
                                src={article.author.image || "/default-avatar.png"}
                                alt={article.author.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Müəllif: {article.author.name}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10">
                        {/* Main Article Content Section */}
                        <div>
                            <div className="prose prose-emerald text-justify max-w-none">
                                <div dangerouslySetInnerHTML={{__html: article.content}}></div>
                            </div>

                            {/* Action Buttons & Back Link */}
                            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
                                <ShareArticle article={article}/>

                                <Link
                                    href="/articles"
                                    className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                                    Bütün məqalələr
                                </Link>
                            </div>

                            {/* Tags */}
                            {article.tags && article.tags.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Etiketlər</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {article.tags.map((tag) => (
                                            <Link
                                                key={tag.id}
                                                href={`/search?tagId=${tag.id}`}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                            >
                                                {tag.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar Section */}
                        <div className="space-y-8">
                            <div className="bg-gray-50 rounded-xl sm:p-6 p-0">
                                <ArticleDetailCategories/>
                            </div>

                            <div className="bg-gray-50 rounded-xl sm:p-6 p-0">
                                <MostReadArticles />
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Related Articles */}
            <RelatedArticles article={article}/>

            {/* View Count Tracker (Hidden) */}
            <ArticleApiCount articleId={article.id}/>
        </div>
    )
}

export default ArticleDetailPage

// import MostReadArticles from "@/components/articledetail/MostReadArticles"
// import ArticleApiCount from "@/components/articledetail/ArticleApiCount"
// import ArticleDetailCategories from "@/components/articledetail/ArticleDetailCategories"
// import Image from "next/image"
// import ArticleCategories from "@/components/articles/ArticleCategories";
// import PopularArticles from "@/components/articles/PopularArticles";
//
// const ArticleDetail = async ({article}) => {
//     // console.log("ArticleDetail", article);
//     return (
//         <div>
//             {/* Full Width Image */}
//             <div className="relative w-full h-[700px]">
//                 <Image height={100} width={2000} src={article.image} alt="Blog Image"
//                        className="w-full h-full object-cover"/>
//                 {/* Overlay with Text */}
//                 <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                     <div className="text-center text-white px-4 md:px-8">
//                         <h1 className="text-2xl md:text-4xl font-bold mb-2">{article.title}</h1>
//                         {/* Yayınlanma Tarihi */}
//                         <p className="text-lg mb-4">
//                             {new Date(article.publishedAt).toLocaleDateString("az-AZ", {
//                                 year: "numeric",
//                                 month: "long",
//                                 day: "numeric",
//                             })}
//                         </p>
//                         <p className="text-yellow-500 font-semibold">
//                             {/*İMAN / PEYGAMBERE İMAN / HZ. MUHAMMED (sav)*/}
//                             {article?.author.name || "Bilinmiyor"}
//                         </p>
//                     </div>
//                 </div>
//             </div>
//
//             <div className=" mx-auto py-6 sm:py-12 px-4 ms:px-8">
//                 <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8">
//                     {/* Blog İçeriği */}
//                     <div className="flex flex-col justify-between bg-white rounded-lg shadow-md p-6 space-y-6">
//                         {/* Makale İçeriği */}
//                         <div className="prose text-justify max-w-none"
//                              dangerouslySetInnerHTML={{__html: article.content}}/>
//
//                         {/* Alt Bilgi Bölümü */}
//                         <div className="border-t pt-4 space-y-2 text-gray-600">
//                             <div className="flex items-center justify-between">
//                                 <span className="font-semibold">Oxunma sayı:</span>
//                                 <span className="text-gray-800">{article.readCount}</span>
//                             </div>
//
//                             <div className="flex items-center justify-between">
//                                 <span className="font-semibold">Yayımlanma Tarixi:</span>
//                                 <span className="text-gray-800">
//                   {" "}
//                                     {new Date(article.publishedAt).toLocaleDateString("az-AZ", {
//                                         year: "numeric",
//                                         month: "long",
//                                         day: "numeric",
//                                     })}
//                 </span>
//                             </div>
//
//                             <div className="flex flex-wrap items-center pt-2 space-x-4">
//                                 {article.author ? (
//                                     <div className="flex items-center space-x-2">
//                                         <img
//                                             src={article.author.image || "/default-avatar.png"}
//                                             alt={article.author.name}
//                                             className="w-8 h-8 rounded-full object-cover"
//                                         />
//                                         <span className="text-gray-800">{article.author.name}</span>
//                                     </div>
//                                 ) : (
//                                     <span className="text-gray-800">Bilinmiyor</span>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                     <ArticleApiCount/>
//
//                     <div className={"pr-2"}>
//                         <div className={"mb-6 mr-2"}>
//                             <aside className="bg-white p-6 rounded-lg  w-full">
//                                 <ArticleCategories category={0}/>
//                                 <PopularArticles/>
//                             </aside>
//
//                         </div>
//                         <MostReadArticles article={article}/>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default ArticleDetail
//

