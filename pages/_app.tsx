import Navigation from '@/src/components/navigation/Navigation';
import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps, AppType } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';




import { useEffect } from 'react';
import { store } from '@/src/redux/store/store';
import { Provider } from 'react-redux';
import Footer from '@/src/components/footer/Footer';
import MainHeader from '@/src/components/globals/MainHeader';
import Layout from '@/src/components/globals/Layout';


export function reportWebVitals(metric: any) {

}

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {

  useEffect(() => { import('preline' as any) }, [])


  return (

    <Provider store={store}>
      <MainHeader />
      <ThemeProvider defaultTheme='light' attribute='class' >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp;