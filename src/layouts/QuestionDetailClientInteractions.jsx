"use client"

import React, { useState } from 'react';
import { ThumbsUp, Share2 } from 'lucide-react';
import HttpClient from '@/util/HttpClient'; // Assuming HttpClient is needed for like action

export default function QuestionDetailClientInteractions({ questionId, initialLikeCount, questionTitle }) {
  const [hasLiked, setHasLiked] = useState(false); // TODO: Fetch initial liked state if available
  const [likeCount, setLikeCount] = useState(initialLikeCount || 0);
  const [isLiking, setIsLiking] = useState(false); // Prevent multiple clicks

  // --- Event Handlers ---
  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);

    // Update UI immediately
    const newLikedState = !hasLiked;
    setHasLiked(newLikedState);
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);

    try {
      // Send API request to update like status/count
      // Adjust endpoint and method as needed
      await HttpClient.post(`/questions/${questionId}/like`);
      // Optionally fetch the real count after success if needed
    } catch (error) {
      console.error("Error updating like status:", error);
      // Revert UI changes on error
      setHasLiked(!newLikedState);
      setLikeCount(prev => !newLikedState ? prev + 1 : prev - 1);
      // Optionally show an error toast/message to the user
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: questionTitle,
      text: `Sual: ${questionTitle}`,
      url: window.location.href, // Get current URL client-side
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
      if (err.name !== 'AbortError') {
        alert("Paylaşarkən xəta baş verdi.");
      }
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-5 border-t border-gray-100">
      <button
        className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all border ${
          hasLiked
            ? "bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm"
            : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50"
        }`}
        onClick={handleLike}
        aria-pressed={hasLiked}
        disabled={isLiking}
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
    </div>
  );
} 