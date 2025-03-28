'use client';

import { useRouter, useSearchParams } from "next/navigation";
import SearchComponent from "@/components/videos/SearchComponent";
import Link from "next/link";

const SearchAndToggle = ({ content, search }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const createHref = (contentValue) => {
        const currentParams = new URLSearchParams(searchParams);
        const key = "content";
        if (searchParams.has(contentValue)) {
            return;
        }

        if (searchParams.get(key) !== contentValue || searchParams.get(key) == null) {
            currentParams.set(key, contentValue.trim());
        }

        const path = `/videos?${currentParams.toString()}`;

        // router.push(path);
        return path;
    };

    return (
        <div className="flex flex-col md:flex-row justify-center items-center w-full space-y-4 md:space-y-0 md:space-x-4 p-4">
            <div className="flex justify-center">
                <Link scroll={false} href={createHref("playlists")}

                    className={`mr-2 ${content === "playlists" ? "bg-yellow-400" : "bg-gray-700"} text-white py-2 px-4 rounded-full`}
                >
                    Playlistlər
                </Link>
                <Link scroll={false} href={createHref("videos")}
                    className={`${content === "videos" ? "bg-yellow-400" : "bg-gray-700"} text-white py-2 px-4 rounded-full`}
                >
                    Videolar
                </Link>
            </div>
            <div className="w-full md:w-auto flex justify-center">
                <SearchComponent searchProps={search}/>
            </div>
        </div>
    );
};

export default SearchAndToggle;
