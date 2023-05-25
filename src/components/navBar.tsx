import Link from 'next/link';
import { Stack, Button, List, ListItem } from '@mui/material';

const NavBar= ()=>{

    return (
      <div>
        <Stack alignItems="center">
        <List>
          <ListItem>
            <Link href="/profilePage" passHref>
              <Button component="a" variant="contained" color="primary">
                Profile
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/channel/create" passHref>
              <Button component="a" variant="contained" color="primary">
                Channel
              </Button>
            </Link>
          </ListItem>
        </List>
        </Stack>
      </div>
    );
  };

export default NavBar;
