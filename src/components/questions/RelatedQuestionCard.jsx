import Link from 'next/link';

export default function RelatedQuestionCard({ question }) {
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
            <span key={tag.id || tag.name}
                  className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
} 