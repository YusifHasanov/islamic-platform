import { Playlist, Video } from '@prisma/client';
import { atom } from 'jotai';
 


export const playlistState = atom<Playlist | null>(null)
