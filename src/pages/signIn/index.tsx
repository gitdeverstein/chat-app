import { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Stack } from '@mui/material';
import io from 'socket.io-client';

export default function SingIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
    const socket = io('http://localhost:3000');
    socket.on('connect', () => {
      console.log('Connected to socket.io server');
    });
socket.emit('chatMessage', 'connected');

socket.on('chatMessage', message => {
  console.log('Nouveau message de chat :', message);
});}

  return (
    <div>
      <Stack alignItems="center">
      <h1>Connexion</h1>
      <form>
      <TextField
          required
          id="outlined-required"
          label="Adresse e-mail:"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <br />
        <TextField
          required
          id="standard-password-input"
          label="nouveau mot de passe"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <br />
        <Button variant="contained" type='submit' onClick={()=>{router.push('/chat', '/chat', {locale: 'fr'})}}>Se connecter</Button>
        <h4>Vous n'avez pas encore de compte?</h4>
        <Button variant="contained" onClick={()=>{router.push('/singUp', '/singUp', {locale: 'fr'})}}>
          S'inscrire
        </Button>
      </form>
      </Stack>
    </div>
  );
}

