import { useState } from 'react';
import io from 'socket.io-client';
import { Stack, TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    const socket = io('http://localhost:3000');
    socket.on('connect', () => {
      console.log('Connected to socket.io server');
    });
socket.emit('chatMessage', 'connected');

socket.on('chatMessage', message => {
  console.log('Nouveau message de chat :', message);
});
    
  };
  
  const handleSignIn = () => {
    if("condition"){
      router.push('/dashboard');
    }else{
      router.push('/signIn');
    }

  }

  return (
    <center>
      <div>
    <h1>Inscription</h1>
    <Stack alignItems="center">
      
    <form onSubmit={handleSubmit}>
    <TextField
          required
          id="outlined-required"
          label="Nom"
        />
      <br />
      <TextField
          required
          id="outlined-required"
          label="Adresse e-mail:"
        />
      <br />
      <TextField
          required
          id="standard-password-input"
          label="nouveau mot de passe"
          type="password"
          autoComplete="current-password"
        />
      <br />
      <TextField
          required
          id="standard-password-input"
          label="confirmer le mot de passe"
          type="password"
          autoComplete="current-password"
        />
      <br />
      <TextField
          id="outlined-multiline-static"
          label="Biographie"
          multiline
          rows={4}
        />
      <br />
      <Button variant="contained" type='submit'>S'inscrire</Button>
      <h4>Compte éxistant?</h4>
      <Button variant="contained" onClick={handleSignIn}>Se connecter</Button>
    </form>
    </Stack>
  </div>
  </center>
  );
}
