'use client'

import {useRouter, useSearchParams} from "next/navigation";
import SearchComponent from "@/components/videos/SearchComponent";

const SearchAndToggle = ({content}) => {

    const searchParams = useSearchParams();
    const router = useRouter();

    const handleClick = (content) => {
        const currentParams = new URLSearchParams(searchParams);
        const key = "content";
        if (searchParams.has(content)) {
            return
        }

        if (searchParams.get(key) !== content || searchParams.get(key) == null) {
            currentParams.set(key, content.trim());
        }

        const path = `/videos?${currentParams.toString()}`;

        router.push(path);
    };


    return (

        <div className={"flex justify-center items-center w-full"}>
            <div className="flex justify-center mr-4">
                <button onClick={() => {
                    handleClick("playlists")
                }} className={`${content ==="playlists"? " bg-yellow-400 " : "bg-gray-700 "}text-white py-2 px-4 rounded-full`}>Playlistlər
                </button>
            </div>
            <div className="flex justify-center mr-4">
                <button onClick={() => {
                    handleClick("videos")
                }} className={`${content ==="videos"? " bg-yellow-400 " : "bg-gray-700 "} text-white py-2 px-4 rounded-full`}>Videolar
                </button>
            </div>
            <SearchComponent/>
        </div>
    )

}


export default SearchAndToggle;
