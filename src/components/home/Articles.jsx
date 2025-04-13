import Image from "next/image";
import Link from "next/link"; // Assuming you use Next.js routing for articles
import {FiArrowRight} from "react-icons/fi";
import {BASE_URL} from "@/util/Const"
// Sample static data - replace with fetched data


const ArticleCard = async ({article}) => {
    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col group transition-shadow duration-300 hover:shadow-lg">
            <div className="relative w-full aspect-video overflow-hidden"> {/* Aspect ratio for image */}
                <Image
                    src={article.image}
                    alt={article.title}
                    fill // Use fill layout
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <p className="text-xs text-gray-500 mb-2">{article.date}</p>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">{article.title}</h3>
                {/*<p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">{article.excerpt}</p>*/}
                <Link href={`/articles/${article.id}`} // Adjust link as per your routing structure
                      className="inline-flex items-center text-sm font-medium text-[#43b365] hover:text-[#59a365] group mt-auto">
                    Davamını Oxu
                    <FiArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"/>
                </Link>
            </div>
        </div>
    );
};

const res = await fetch(`${BASE_URL}/articles/popular`)
const articles = await res.json()

export default function Articles() {
    // Fetch articles here if needed
    return (
        // Container is managed by HomePage section
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article}/>
            ))}
        </div>
    );
}


// import ArticleCard from "@/components/articles/ArticleCard"
// import { BASE_URL } from "@/util/Const"
// import Link from "next/link"
//
// export const revalidate = 60
//
// const Articles = async () => {
//   const res = await fetch(`${BASE_URL}/articles/popular`)
//   const articles = await res.json()
//   // console.log("articles", articles);
//   return (
//     <div className="py-16">
//       <h2 className="text-center homeArticlesHeader  mb-8">Məqalələr</h2>
//       <p className="text-center text-lg mb-12 container mx-auto">
//         İman, Fiqh və Siyarın İşığında – Mənəvi Səyahətinizə Yol Göstərir Bu kanalda, iman həqiqətləri, fiqh və siyer
//         mövzularında hazırlanmış məzmunlarla mənəvi dünyanızı zənginləşdirir, bilgi birikiminizi artırır və doğru
//         səyahətə çıxmanız üçün yol göstərişləri verir. Kanalımızı izləyərək ilim və mənəviyyatın dərinliklərinə çata
//         bilərsiniz.{" "}
//       </p>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
//         {articles?.map((article, idx) => (
//           <ArticleCard
//             id={article.id}
//             key={idx}
//             title={article.title}
//             description={article.description}
//             image={article.image}
//             date={article.date}
//             authorImage={article.authorImage}
//             authorName={article.authorName}
//           />
//         ))}
//       </div>
//       <div className="flex justify-center mt-12">
//         <Link
//           href={"/articles"}
//           className="bg-[#F7E652] text-[#fff] px-6 py-2 rounded-2xl font-semibold hover:bg-[#e0d048]"
//         >
//           Bütün Məqalələri göstər GÖSTER
//         </Link>
//       </div>
//     </div>
//   )
// }
//
// export default Articles
//
