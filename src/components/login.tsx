import {NextPage} from 'next';
import { TextField, Stack, Button } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage: NextPage= ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const router= useRouter();

    const handleLogin =async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try{
          const response= await fetch('localhost:8080/user',{
            method:'GET',
            headers:{'Content-type': 'application/json'},
            body: JSON.stringify({email, password}),
          });
          if(response.ok){
            const userData= await response.json();
            if(userData.exists){
                router.push('/profilePage');
            }else{
                router.push('/sign-up');
            }}else{console.error('Login failed')}
        }catch(error){
          console.error('An unexepted error occured:', error);
        }
      };
      
      const handleSingUp= () => {
        router.push('/sing-up')
      }

      const handleProfilePage= () => {
        router.push('/profilePage')
      }

    return(
        <>
          <Stack alignItems="center">
      <h1>Connexion</h1>
      <form onSubmit={handleLogin}>
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
        <Button variant="contained" type='submit' onClick={handleProfilePage}>Se connecter</Button>
      </form>
      <h4>Vous n'avez pas encore de compte?</h4>
        <Button variant="contained" onClick={handleSingUp}>
          S'inscrire
        </Button>
      </Stack>  
        </>
    )
}
export default LoginPage;