import { Playlist, Video } from '@prisma/client';
import { atom } from 'jotai';
 


export const playlistState = atom<Playlist | null>(null)


// export const selectedPlaylistId = atom<string>("") 
export const playlistVideosAtom = atom<Video[]>([])