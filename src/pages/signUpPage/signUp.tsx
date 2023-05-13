import { useState } from 'react';
import io from 'socket.io-client';
import { Stack, TextField, Button } from '@mui/material';

export default function Signup() {
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
socket.emit('chatMessage', 'Bonjour tout le monde !');

socket.on('chatMessage', message => {
  console.log('Nouveau message de chat :', message);
});
    
  };

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
      <Button variant="contained">S'inscrire</Button>
    </form>
    </Stack>
  </div>
  </center>
  );
}
