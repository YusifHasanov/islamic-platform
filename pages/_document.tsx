import { Html, Head, Main, NextScript } from 'next/document'
 

export default function Document() {
   
  return (
    <Html lang="az">
      <Head />
      <body  className='bg-gray-200 dark:bg-gray-800 scrollbar scrollbar-thumb-gray-500 dark:scrollbar-thumb-slate-600  scrollbar-track-gray-400 dark:scrollbar-track-inherit'>
        <Main  />
        <NextScript />
      </body>
    </Html>
  )
}
