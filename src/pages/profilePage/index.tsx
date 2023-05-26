import { useEffect, useState } from 'react';
import { Stack, Button, Typography } from '@mui/material';
import NavBar from '@/components/navBar';
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

          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchUserData();
    }, []);

  const handleEditProfil= () => {
    router.push('/profile/edit')
  }

  if (!user) {
    return <p>Loading...</p>;
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
        Bio: {user.bio || 'N/A'}
        </Typography>
        <br />
        <Button variant='contained' type="submit" onClick={handleEditProfil}>Edit</Button>
      </form>
      </Stack>
    </div>
  );
}
