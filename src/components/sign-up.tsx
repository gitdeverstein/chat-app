import { useRouter } from 'next/router';
import {NextPage} from 'next';
import { Stack, TextField, Button } from '@mui/material';
import { useState } from 'react';

const SingUpPage: NextPage= ()=>{
    const router= useRouter();
    const [name, setName]= useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
    const [bio, setBio]= useState("");

    const handleSingUp =async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try{
          const response= await fetch('http://localhost:8080/users/',{
            method:'POST',
            headers:{'Content-type': 'application/json'},
            body: JSON.stringify({name, email, password, confirmPassword, bio}),
          });
          if(response.ok){
            const userData= await response.json();
            if(userData.exists){
                router.push('/ProfilePage');
            }else{
                router.push('/sign-up');
            }}else{console.error('Login failed')}
        }catch(error){
          console.error('An unexepted error occured:', error);
        }
      };

      return(
        <>
        <Stack alignItems="center">
    <h1>Inscription</h1>
    <form onSubmit={handleSingUp}>
    <TextField
          required
          id="outlined-required"
          label="Nom"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
      <br />
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
      <TextField
          required
          id="standard-password-input"
          label="confirmer le mot de passe"
          type="password"
          autoComplete="current-password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
        />
      <br />
      <TextField
          id="outlined-multiline-static"
          label="Biographie"
          multiline
          rows={4}
          value={bio}
          onChange={(e)=>setBio(e.target.value)}
        />
      <br />
      <Button variant="contained" type='submit' onClick={handleSingUp}>S'inscrire</Button>
    </form>
    </Stack>
        </>
    )
}

export default SingUpPage;
