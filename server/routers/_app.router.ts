import { router } from '../trpc';
import { playlistRouter } from './playlist.router';
import { videoRouter } from './video.router'; 
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'; 
 
export const appRouter = router({
    playlist: playlistRouter,
    video:videoRouter,
    // author:authorRouter,
    // book:bookRouter,
    // article:articleRouter,
    // youtubeStat:youtubeStatRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;


// @filename: client.ts


export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
