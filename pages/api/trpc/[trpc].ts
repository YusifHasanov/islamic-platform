import { createContext } from '@/server/context';
import { appRouter } from '@/server/routers/_app.router';
import * as trpcNext from '@trpc/server/adapters/next';


export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});