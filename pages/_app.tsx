import Navigation from '@/src/components/navigation/Navigation';
import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps, AppType } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';


import MainHeader from '@/src/components/globals/MainHeader';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { store } from '@/src/redux/store/store';
import { Provider } from 'react-redux';

export function reportWebVitals(metric: any) {

}

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {

  useEffect(() => { import('preline' as any) }, [])
  const excludeNav = useRouter().pathname.startsWith("/admin")

  return (

    <Provider store={store}>
      <MainHeader />
      <ThemeProvider defaultTheme='light' attribute='class' >
        {!excludeNav && <Navigation />}
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp;