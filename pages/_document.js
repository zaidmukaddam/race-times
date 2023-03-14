import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className={'bg-white dark:bg-gray-900 dark:text-white text-black'}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}