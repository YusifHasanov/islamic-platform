import Navigation from '@/src/components/navigation/Navigation' 

import '@/styles/globals.css'
import {ThemeProvider} from 'next-themes'
import type { AppProps, AppType } from 'next/app'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
 import {SessionProvider } from 'next-auth/react'
import { trpc } from '@/server/utils/trpc'
export const queryClient = new QueryClient()
export function reportWebVitals(metric :  any) {
 
}

const MyApp :AppType =({ Component, pageProps }: AppProps) =>{
  return (
    // <SessionProvider session={pageProps.session}>
   <ThemeProvider attribute='class' >
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Navigation />
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      </ThemeProvider>
      // </SessionProvider> 
  )
}

export default trpc.withTRPC(MyApp);