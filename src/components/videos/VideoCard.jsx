import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {getBestThumbnailUrl} from "@/util/Thumbnail";
import {Calendar, Clock} from "lucide-react";

const VideoCard = ({video, content , link}) => {
    return (
        <Link
            href={link}
            key={video.videoId}
            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
            <div className="relative aspect-video">
                <Image
                    src={getBestThumbnailUrl(video.thumbnail) || "/placeholder.svg"}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                    12:34
                </div>
                <div className="absolute top-2 left-2">
                      <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded-md">
                        {content === "shorts" ? "Short" : "Video"}
                      </span>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-emerald-700">
                    {video.title}
                </h3>
                <div className="flex items-center text-xs text-gray-500 space-x-4">
                    <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>
                          {new Date(video.publishedAt).toLocaleDateString("az-AZ", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                          })}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>12:34</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;
