import * as z from 'zod'

export const playlistType = z.object({
  playlistId: z.string(),
  title: z.string(),
  publishedAt: z.date(),
  thumbnail: z.string(),
  id: z.string().cuid()
})
export const playlistTypeArray = z.array(playlistType)


export const videoType = z.object({
  videoId: z.string(),
  title: z.string(),
  publishedAt: z.date(),
  thumbnail: z.string(),
  playlistId: z.string(),
  id: z.string().cuid()
})
export const videoPostType = z.object({
  videoId: z.string(),
  title: z.string(),
  publishedAt: z.date(),
  thumbnail: z.string(),
  playlistId: z.string(),
})
export const videoTypeArray = z.array(videoType)