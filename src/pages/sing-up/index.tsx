import { useEffect, useState } from 'react';
import { Stack, TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';

const creatUser=()=> ({ user: null, loading: false});
export default function SingUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: ''
  });
  
  const {user, loading}= creatUser();

  useEffect(()=>{
    if(!(user || loading)){
      router.push('/');
    }
  }, [user, loading]);

  return (
      <div>
    <Stack alignItems="center">
    <h1>Inscription</h1>
    <form>
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
      <Button variant="contained" type='submit' onClick={()=>{  //mila token vao mety
        router.push('/channel', '/channel', {locale: 'fr'})
        }}>S'inscrire
        </Button>
    </form>
    </Stack>
  </div>
  );
}
