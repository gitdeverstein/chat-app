import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function home() {
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
    <div>
      <h1>Welcome !</h1>
    </div>
  );
}
