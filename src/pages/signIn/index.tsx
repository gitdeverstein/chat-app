import { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button } from '@mui/material';

export default function SingIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  
  const {user, authenticated}= userAuth();
  if (user || authenticated) {
    router.push('/');
  }

  return (
    <div>
      <h1>Connexion</h1>
      <form>
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
        <Button variant="contained" type='submit' >Se connecter</Button>
      </form>
    </div>
  );
}
function userAuth(): { user: any; authenticated: any; } {
  throw new Error('Function not implemented.');
}

