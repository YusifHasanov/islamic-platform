import Link from "next/link"
import Image from "next/image"

const ArticleCard = ({ id, title, description, image, date, authorName, authorImage }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-md">
      <Link href={`/articles/${id}`} className="block overflow-hidden relative aspect-[16/9]">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
            {new Date(date).toLocaleDateString("az-AZ", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <Link href={`/articles/${id}`}>
          <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-emerald-700 transition-colors">
            {title}
          </h2>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Author details positioned at the bottom */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center space-x-3">
          <div className="relative h-8 w-8 rounded-full overflow-hidden">
            <Image src={authorImage || "/default-avatar.png"} alt={authorName} fill className="object-cover" />
          </div>
          <span className="text-sm font-medium text-gray-700">{authorName}</span>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard

