import Navigation from '@/src/components/Navigation' 
import '@/styles/globals.css'

import type { AppProps } from 'next/app'
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

export default function App({ Component, pageProps }: AppProps) {
  return (
   
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Navigation />
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      
  )
}
