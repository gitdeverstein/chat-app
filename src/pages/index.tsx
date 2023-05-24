import SingIn from './login';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
export default function IndexPage() {

  return (
      <main>
        <SingIn />
      </main>
  )
}
