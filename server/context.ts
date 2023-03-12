import prisma from '@/prisma/prisma';
import { initTRPC, type inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import * as trpcNext from '@trpc/server/adapters/next';


export const createContext = async ({
    req,
    res,
}: trpcNext.CreateNextContextOptions) => {
    return {
        req,
        res,
        prisma,
    };
};
export type Context = inferAsyncReturnType<typeof createContext>;


