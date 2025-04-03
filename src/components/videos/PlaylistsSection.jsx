import { BASE_URL } from "@/util/Const"
import Link from "next/link"
import SearchComponent from "@/components/videos/SearchComponent"
import ConsoleLog from "@/components/common/ConsoleLog"

export const revalidate = 60

const PlaylistsSection = async ({ playlistId, search }) => {
  const res = await fetch(`${BASE_URL}/playlists`, {
    next: { revalidate: 60 },
  })
  let playlists = await res.json()

  if (search && search !== "") {
    playlists = playlists.filter((x) => x.title.toLowerCase().includes(search.toLowerCase()))
  }

  if (playlistId) {
    playlists = playlists.sort((a, b) => (a.playlistId === playlistId ? -1 : b.playlistId === playlistId ? 1 : 0))
  }

  const isCurrentPlaylist = (id) => {
    return playlistId === id ? "bg-slate-200" : ""
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/*<Script>*/}
      {/*    alert("d");*/}
      {/*</Script>*/}
      <div className="py-3 mx-auto px-7">
        {/*<div className="flex justify-center space-x-4 mb-8">*/}
        {/*    <button className="bg-gray-700 text-white py-2 px-4 rounded-full">Oynatma Listeleri</button>*/}
        {/*    <button className="bg-gray-700 text-white py-2 px-4 rounded-full">Son Yüklenenler</button>*/}
        {/*</div>*/}

        <div className={"flex justify-center items-center w-full"}>
          <div className="flex justify-center mr-4">
            <button className="bg-gray-700 text-white py-2 px-4 rounded-full">Playlistlər</button>
          </div>
          <SearchComponent />
        </div>
        <ConsoleLog log={playlists} />

        {/* Playlists Grid */}
        {playlists?.length === 0 ? (
          <NoAnyPlaylist />
        ) : (
          <div className="grid grid-cols-1 mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {playlists.map((playlist, index) => (
              <Link
                href={`/videos?playlistId=${playlist.playlistId}`}
                key={playlist.playlistId}
                className="bg-white playlistCard cursor-pointer rounded-2xl overflow-hidden  shadow-sm"
              >
                {/*<Image*/}
                {/*    loading={"lazy"}*/}
                {/*    src={playlist.thumbnail.split("+")[2] ?? playlist.thumbnail.split("+")[1] ?? playlist.thumbnail.split("+")[0]}*/}
                {/*    alt={playlist.title}*/}
                {/*    className="w-full object-cover "*/}
                {/*    height={50}*/}
                {/*    width={500}*/}
                {/*/>  */}
                <img
                  src={
                    playlist.thumbnail.split("+")[2] ??
                    playlist.thumbnail.split("+")[1] ??
                    playlist.thumbnail.split("+")[0]
                  }
                  alt={playlist.title}
                  className="w-full object-cover "
                />
                <div
                  className={`px-4 pt-1 min-h-20 flex flex-col justify-between pb-1 ${isCurrentPlaylist(playlist.playlistId)}`}
                >
                  <h3 className="text-lg font-semibold">{playlist.title}</h3>
                  <p className="text-gray-500 text-center">{playlist.videoCount} Video</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PlaylistsSection

const NoAnyPlaylist = () => {
  return (
    <div className=" mt-24 items-center justify-center bg-gray-100">
      <div className="text-center">
        <svg
          className="mx-auto h-16 w-16 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">Heç bir playlst tapılmadı</h2>
        <p className="mt-2 text-gray-500">Axtarisa uygun bir nəticə tapılmadı</p>
      </div>
    </div>
  )
}

