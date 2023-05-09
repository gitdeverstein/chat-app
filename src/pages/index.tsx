import HomePage from './homepage/homepage'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'


// Stack , Grid, Box  
const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  const router= useRouter

  return (
      <main>
        <HomePage />
      </main>
  )
}
