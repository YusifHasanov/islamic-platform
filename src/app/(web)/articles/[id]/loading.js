export default function Loading() {
    return (
        <div className="bg-gray-50 min-h-screen pb-16 animate-pulse">
            {/* Hero Image Skeleton */}
            <div className="relative w-full h-[40vh] md:h-[60vh] bg-gray-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                    <div className="container mx-auto">
                        <div className="h-10 md:h-12 bg-gray-400/50 rounded-lg w-3/4 mb-4"></div>
                        <div className="flex flex-wrap gap-4">
                            <div className="h-5 bg-gray-400/50 rounded-lg w-32"></div>
                            <div className="h-5 bg-gray-400/50 rounded-lg w-24"></div>
                            <div className="h-5 bg-gray-400/50 rounded-lg w-40"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-10">
                <div className="bg-white rounded-t-2xl shadow-md p-6 md:p-10">
                    {/* Author Info Skeleton */}
                    <div className="flex items-center mb-8">
                        <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                        <div>
                            <div className="h-5 bg-gray-300 rounded w-32 mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-16"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10">
                        {/* Article Content Skeleton */}
                        <div>
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-300 rounded w-full"></div>
                                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-300 rounded w-full"></div>
                                <div className="h-4 bg-gray-300 rounded w-4/5"></div>
                                <div className="h-4 bg-gray-300 rounded w-full"></div>
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-300 rounded w-full"></div>
                                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-300 rounded w-full"></div>
                                <div className="h-4 bg-gray-300 rounded w-4/5"></div>
                                <div className="h-4 bg-gray-300 rounded w-full"></div>
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            </div>

                            {/* Action Buttons Skeleton */}
                            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="h-10 w-20 bg-gray-300 rounded-lg"></div>
                                    <div className="h-10 w-24 bg-gray-300 rounded-lg"></div>
                                </div>
                                <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
                            </div>

                            {/* Tags Skeleton */}
                            <div className="mt-8">
                                <div className="h-6 bg-gray-300 rounded w-32 mb-3"></div>
                                <div className="flex flex-wrap gap-2">
                                    <div className="h-8 w-16 bg-gray-300 rounded-full"></div>
                                    <div className="h-8 w-20 bg-gray-300 rounded-full"></div>
                                    <div className="h-8 w-24 bg-gray-300 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Skeleton */}
                        <div className="space-y-8">
                            <div className="bg-gray-100 rounded-xl p-6">
                                <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                                <div className="space-y-3">
                                    <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                                    <div className="h-5 bg-gray-300 rounded w-2/3"></div>
                                    <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                                    <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                                </div>
                            </div>

                            <div className="bg-gray-100 rounded-xl p-6">
                                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                                <div className="space-y-6">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="flex space-x-4">
                                            <div className="w-24 h-16 bg-gray-300 rounded-lg"></div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-gray-300 rounded w-full"></div>
                                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Articles Skeleton */}
            <div className="container mx-auto px-4 mt-12">
                <div className="h-8 bg-gray-300 rounded w-64 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white rounded-xl overflow-hidden shadow-sm">
                            <div className="bg-gray-300 aspect-[16/9]"></div>
                            <div className="p-5">
                                <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                                <div className="h-4 bg-gray-300 rounded w-24"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

