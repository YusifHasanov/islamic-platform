import { Playlist } from '@prisma/client';
import { atom } from 'jotai';
 


export const playlistState = atom<Playlist | null>(null)