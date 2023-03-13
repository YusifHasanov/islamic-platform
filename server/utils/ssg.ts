
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from '../routers/_app.router';
import { createContext } from '../context';
import superjson from 'superjson';


export const getSSG = async () => {
    const ssg = createProxySSGHelpers({
        router: appRouter,
        ctx: await createContext(),
        transformer: superjson
    });
    return ssg;
}