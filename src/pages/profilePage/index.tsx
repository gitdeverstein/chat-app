import { SetStateAction, useState } from 'react';
import { Stack, TextField, Button } from '@mui/material';
import NavBar from '@/components/navBar';

export default function ProfilePage() {
  const [name, setName] = useState('Elin Mask');
  const [email, setEmail] = useState('lin.mask@test.com');
  const [password, setPassword] = useState('HardToGuess!1960');

  const handleNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <Stack alignItems="center">
        <NavBar/>
      <h1>Profile</h1>
      <form>
        <TextField 
        id="outlined-required"
        label="Nom"
        type="text" value={name} onChange={handleNameChange}/>
        <br />
        <TextField 
        id="outlined-required"
        label="Email"
        type="text" value={email} onChange={handleEmailChange}/>
        <br />
        <TextField 
        id="outlined-required"
        label="Password"
        type="text" value={password} onChange={handlePasswordChange}/>
        <br />
        <Button variant='contained' type="submit">Save</Button>
      </form>
      </Stack>
    </div>
  );
}
