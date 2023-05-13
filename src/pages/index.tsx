import HomePage from './homepage/homepage'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'


const inter = Inter({ subsets: ['latin'] })
export default function Index() {
  const router= useRouter

  return (
      <main>
        <HomePage />
      </main>
  )
}
