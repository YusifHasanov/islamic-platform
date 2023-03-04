import prisma from '@/prisma/prisma';
export interface Video extends BaseEntity  {
    id: string;
    videoId: string;
    publishedAt: Date;
    thumbnail: string;
    title: string;
    playlistId: string;
    playlist: Playlist;
};

 

export interface Playlist extends BaseEntity  {
    id: string;
    playlistId: string;
    publishedAt: Date;
    thumbnail: string;
    title: string; 
    videos: Video[];
};  

 


export interface BaseFields {
    id: string;
  }
  

  interface BaseEntity {
    id: string;
    title: string;
    publishedAt: Date;
    thumbnail: string; 
  }


  export type prismaVideo = typeof prisma.video
  export type prismaPlaylist = typeof prisma.playlist


  export type prismaEntity = prismaVideo | prismaPlaylist