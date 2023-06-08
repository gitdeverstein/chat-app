import Link from 'next/link';
import { Stack, Button, List, ListItem } from '@mui/material';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

function NavBar () {
  const router= useRouter();

  const handleClickProfile = () => {
    const token = Cookies.get('token');
    
    if (token) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  };


  const handleLogout = () => {
    const token= Cookies.get('token')
    if (token) {
    Cookies.remove('token');
    router.push('/login');
    }
  };

  const handleChannel= ()=>{
    const token= Cookies.get('token')

    if (token) {
      router.push('/channel');
    } else {
      router.push('/login');
    }
  }
    
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
            <Link href="/Profile">
            <Button component="a" variant="contained" color="primary" onClick={handleClickProfile}>Profile</Button>
            </Link>
        </ListItem>
        <ListItem>
          <Link href="/channel" passHref>
            <Button component="a" variant="contained" color="primary" onClick={handleChannel}>Channel</Button>
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/channel/create" passHref>
            <Button component="a" variant="contained" color="primary" onClick={handleCreateChannel}>Create channel</Button>
          </Link>
        </ListItem>
      </List>
        <Link href="/Login">
        <Button onClick={handleLogout}>Logout</Button>
        </Link>
      </Stack>
    </div>
    </>
  );
}

export default NavBar;
