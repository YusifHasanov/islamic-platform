import Navigation from '@/src/components/navigation/Navigation'

import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps, AppType } from 'next/app'

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SessionProvider } from 'next-auth/react'
import { trpc } from '@/server/utils/trpc'
import { useEffect } from 'react'
import Head from 'next/head'
export const queryClient = new QueryClient()

export function reportWebVitals(metric: any) {

}

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  useEffect(() => { import('preline' as any) }, [])
  return (
    // <SessionProvider session={pageProps.session}>

    <>
      <Head>
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
            {
              "@context": "https://ehlisunne.vercel.app/",
              "@type": "WebSite",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://ehlisunne.vercel.app/"
              },
              "headline": "Əhli sünnə mədrəsəsi",
              "description": "Əhli sünnə mədrəsəsi youtube kanalı ilə tanış ola bilərsiniz", 
              "image": "https://ehlisunne.vercel.app/assets/logo.png",
              "author": {
                "@type": "Person",
                "name": "Yusif Hasanov"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Əhli sünnə mədrəsəsi",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://ehlisunne.vercel.app/assets/logo.png"
                }
              },
              "datePublished": "Your publication date here",
              "dateModified": "Your last modified date here"
            }
          `,
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
      </Head>
      <ThemeProvider attribute='class' >
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Navigation />
            <Component {...pageProps} />
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </>

    // </SessionProvider> 
  )
}

export default trpc.withTRPC(MyApp);