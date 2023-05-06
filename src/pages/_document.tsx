import { Html, Head, Main, NextScript } from 'next/document'
import Accueil from './homepage'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Accueil />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
