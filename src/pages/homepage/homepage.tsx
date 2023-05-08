import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Signup from '../inscriptionPage/inscription';

export default function Accueil() {
  const router = useRouter();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      router.push('/global-chat');
    } else {
      router.push('/signup');
    }
  }, []);

  return (
    <html>
      <div>
      <Signup></Signup>
      </div>
    </html>
  );
}
