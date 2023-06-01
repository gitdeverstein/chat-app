import Link from 'next/link';
import { Stack, Button, List, ListItem } from '@mui/material';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { jsx } from '@emotion/react';

function NavBar () {
  const router= useRouter();

  const handleProfileClick = () => {
    const token = Cookies.get('token');
    
    if (token) {
      router.push('/users/profile');
    } else {
      router.push('/users/login');
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');

    router.push('/users/login');
  };
    
  const handleCreateChannel = () => {
    const token = Cookies.get('token');
    
    if (token) {
      router.push('/channel/create');
    } else {
      router.push('/login');
    }
  };
  
  return (
    <>
    <div>
      <Stack alignItems="center">
      <List>
        <ListItem>
            <Button component="a" variant="contained" color="primary" onClick={handleProfileClick}>Profile</Button>
        </ListItem>
        <ListItem>
          <Link href="/channel" passHref>
            <Button component="a" variant="contained" color="primary">Channel</Button>
          </Link>
        </ListItem>
        <ListItem>
            <Button component="a" variant="contained" color="primary" onClick={handleCreateChannel}>Create channel</Button>
        </ListItem>
      </List>
      <Button onClick={handleLogout}>Logout</Button>
      </Stack>
    </div>
    </>
  );
}

export default NavBar;
