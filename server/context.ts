
import prisma from '@/prisma/prisma'; 
import { type inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import * as trpcNext from '@trpc/server/adapters/next';
  

interface CreateContextOptions {
    req?: CreateNextContextOptions['req'];
    res?: CreateNextContextOptions['res'];
    // session: Session | null
}
export async function createContextInner(_opts: CreateContextOptions) {
    return {
        prisma,
        req: _opts?.req,
        res: _opts?.res,

    };
}



export type Context = inferAsyncReturnType<typeof createContextInner>;




export async function createContext(
    opts?: trpcNext.CreateNextContextOptions
): Promise<Context> {
    return await createContextInner({});
}