import { router } from '../trpc';
import { articleRouter } from './article.router';
import { authorRouter } from './author.router';
import { bookRouter } from './book.router';
import { playlistRouter } from './playlist.router';
import { videoRouter } from './video.router';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { youtubeStatRouter } from './youtubeStat.router';

export const appRouter = router({
    playlist: playlistRouter,
    video: videoRouter,
    author: authorRouter,
    book: bookRouter,
    article: articleRouter,
    youtubeStat: youtubeStatRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;


// @filename: client.ts


export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
