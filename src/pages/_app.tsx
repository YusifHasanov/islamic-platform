import Navigation from '@/src/components/globals/Navigation' 
import { trpc } from '@/src/utils/trpc'
import '@/styles/globals.css'
import {ThemeProvider} from 'next-themes'
import type { AppProps, AppType } from 'next/app'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

export const queryClient = new QueryClient()
export function reportWebVitals(metric :  any) {
  console.log(metric)
}

const MyApp :AppType =({ Component, pageProps }: AppProps) =>{
  return (
   <ThemeProvider attribute='class' >
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Navigation />
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      </ThemeProvider>
  )
}

export default trpc.withTRPC(MyApp);