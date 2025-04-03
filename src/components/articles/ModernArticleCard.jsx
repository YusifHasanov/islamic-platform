// components/articles/ModernArticleCard.jsx (Example Structure)
import Image from 'next/image';
import Link from 'next/link';
import { User, Calendar } from 'lucide-react'; // Assuming you use lucide-react
import { formatDate } from '@/util/DateUtil'; // Assuming a date formatting utility

export default function ModernArticleCard({ id, title, image, date, authorName }) {
    const href = `/articles/${id}`;
    const formattedDate = date ? formatDate(date) : "Tarix yoxdur"; // Format date safely

    return (
        <Link href={href} className="group block bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300">
            <div className="relative w-full aspect-video overflow-hidden">
                <Image
                    src={image || '/placeholder-article.png'} // Add fallback image
                    alt={title || "Məqalə şəkli"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-4">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-emerald-700 mb-2 line-clamp-2 transition-colors">
                    {title || "Başlıq yoxdur"}
                </h3>
                <div className="text-xs md:text-sm text-gray-600 space-y-1.5">
                    {/* Author Info */}
                    {authorName && (
                        <p className="flex items-center">
                            <User className="h-3.5 w-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
                            <span className="line-clamp-1">{authorName}</span>
                        </p>
                    )}
                    {/* Date Info */}
                    <p className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
                        <span className="line-clamp-1">{formattedDate}</span>
                    </p>
                </div>
            </div>
        </Link>
    );
}
