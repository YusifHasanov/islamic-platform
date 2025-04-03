'use client'
import React, {useState} from 'react';

const ShareArticle = ({article}) => {
    const [showShareOptions, setShowShareOptions] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(article.likes || 0)
    const handleShare = async () => {
        setShowShareOptions(!showShareOptions)
    }

    const shareViaNavigator = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: article.title,
                    text: article.description,
                    url: window.location.href,
                })
            } catch (error) {
                console.error("Error sharing:", error)
            }
        } else {
            copyToClipboard()
        }
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
    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href)
        alert("Link kopyalandı!")
        // setShowShareOptions(false)
    }

    return (
        <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        isLiked ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={isLiked ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={isLiked ? "text-emerald-600" : "text-gray-600"}
                    >
                        <path
                            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>{likeCount}</span>
                </button>

                <div className="relative">


                    <button
                        onClick={handleShare}
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-600"
                        >
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                            <polyline points="16 6 12 2 8 6"></polyline>
                            <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                        <span>Paylaş</span>
                    </button>

                    {showShareOptions && (
                        <div
                            className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 overflow-hidden">
                            <button
                                onClick={shareViaNavigator}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 text-gray-600"
                                >
                                    <circle cx="18" cy="5" r="3"></circle>
                                    <circle cx="6" cy="12" r="3"></circle>
                                    <circle cx="18" cy="19" r="3"></circle>
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                                </svg>
                                Paylaş
                            </button>
                            <button
                                onClick={copyToClipboard}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="mr-2 text-gray-600"
                                >
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                    <path
                                        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                </svg>
                                Linki kopyala
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShareArticle;
