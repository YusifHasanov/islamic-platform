export default function Loading() {
    return (
        <div className="p-8 space-y-12 animate-pulse">
            {/* Full Width Image Skeleton */}
            <div className="relative w-full h-[500px] bg-gray-300 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
            </div>

            {/* Başlık Skeleton */}
            <div className="h-10 bg-gray-300 rounded w-3/4 mx-auto"></div>

            {/* Yayınlanma Tarihi ve Yazar Skeleton */}
            <div className="flex justify-center space-x-4 mb-8">
                <div className="h-6 w-32 bg-gray-300 rounded"></div>
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
            </div>

            {/* İçerik Skeleton */}
            <div className="space-y-4 px-8">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>

            {/* Sağ Sidebar (En Çok Okunanlar) Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8">
                <div className="flex flex-col space-y-6">
                    {/* Makale İçeriği Skeleton */}
                    <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>

                {/* En Çok Okunanlar Listesi Skeleton */}
                <div className="space-y-6">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <div className="w-24 h-16 bg-gray-300 rounded-lg"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}