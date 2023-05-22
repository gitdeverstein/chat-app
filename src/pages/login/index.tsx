import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Stack } from '@mui/material';
import useAuth from './store';

const userEmail=()=> ({ user: null, loading: false});
export default function SingIn() {
  const {isAuthenticated , authenticate, logout} = useAuth( state => state )
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");
  const {user, loading}= userEmail();

  useEffect(()=>{
    if(!(user || loading)){
      router.push('/');
    }
  }, [user, loading]);

  const handleClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      authenticate();
    }
  };

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
          label="mot de passe"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <br />
        <Button variant="contained" type='submit' onClick={handleClick}>
          {isAuthenticated ? "Se déconnecter" : "Se connecter"}</Button>
        <h4>Vous n'avez pas encore de compte?</h4>
        <Button variant="contained" onClick={()=>{router.push('/sing-up', '/sing-up', {locale: 'fr'})}}>
          S'inscrire
        </Button>
      </form>
      </Stack>
    </div>
  );
}

