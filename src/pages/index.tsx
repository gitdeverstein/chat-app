import SingIn from './login';
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'


const inter = Inter({ subsets: ['latin'] })
export default function IndexPage() {
  const router = useRouter();

  return (
      <main>
        <SingIn />
      </main>
  )
}
