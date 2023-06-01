import { useEffect, useState } from 'react';
import { Stack, Button, Typography } from '@mui/material';
import NavBar from '@/components/NavBar';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  bio: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const token = Cookies.get('token');
          console.log('Token:', token);
  
          const response = await axios.get('http://localhost:8080/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.status === 200 && response.data.status) {
            setUser(response.data.user);
          } else {
            router.push('/login')
          }
        } catch (error) {
          console.error(error);
          router.push('/login')
        }
      };
  
      fetchUserData();
    }, []);

  const handleEditProfile= () => {
    router.push('/profile/edit')
  }

  if (!user) {
    return <Stack alignItems="center"><p>Loading...</p></Stack>;
  }

  return (
    <div>
      <Stack alignItems="center">
        <NavBar/>
      <h1>Profile</h1>
      <form>
        <Typography>
        Name: {user.name}
        </Typography>
        <br />
        <Typography>
        Email: {user.email}
        </Typography>
        <br />
        <Typography>
        Bio: {user.bio || 'Hello World'}
        </Typography>
        <br />
        <Button variant='contained' onClick={handleEditProfile}>Edit profile</Button>
      </form>
      </Stack>
    </div>
  );
}
