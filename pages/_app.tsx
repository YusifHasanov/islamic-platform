import Navigation from '@/src/components/navigation/Navigation'
import 'react-toastify/dist/ReactToastify.css';
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
import MainHeader from '@/src/components/globals/MainHeader'
import { useRouter } from 'next/router'
export const queryClient = new QueryClient()

export function reportWebVitals(metric: any) {
  
}

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {

  useEffect(() => { import('preline' as any) }, [])
  const excludeNav = useRouter().pathname.startsWith("/admin")

  return (
    // <SessionProvider session={pageProps.session}>

    <>
      <MainHeader />
      <ThemeProvider attribute='class' >
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
          {!excludeNav && <Navigation />}
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