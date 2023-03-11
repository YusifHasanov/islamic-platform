import { router } from '../trpc';
import { playlistRouter } from './playlist.router';

export const appRouter = router({
    playlist: playlistRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;