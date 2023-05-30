import {NextPage} from 'next';
import { TextField, Stack, Button } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';

const LoginPage: NextPage= ()=>{
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [loginError, setLoginError] = useState(false);

    const onLogin =async (data: any) => {
      try {
        const response = await axios.post('http://localhost:8080/users/login', data);
        if (response.status === 200) {
          const token = response.data.user.token;

          const idUser = response.data.user.id;

          Cookies.set('id', idUser);
          
          Cookies.set('token', token);
  
          router.push('/profile');
        } else {
          setLoginError(true);
        }
      } catch (error) {
        console.error(error);
        setLoginError(true);
      }
    };
      
      const handleSingUp= () => {
        router.push('/sign-up')
      }

    return(
        <>
          <Stack alignItems="center">
      <h1>Login</h1>
      {loginError && <p>Incorrect email or password</p>}
      <form onSubmit={handleSubmit(onLogin)}>
      <TextField
          required
          id="outlined-required"
          label="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
        <br />
        <TextField
          required
          id="standard-password-input"
          label="password"
          type="password"
          autoComplete="current-password"
          {...register('password', { required: true })} />
        <br />
        <Button variant="contained" type='submit'>Sign in</Button>
      </form>
      <h4>Don't have an account?</h4>
        <Button variant="contained" onClick={handleSingUp}>
          Sign up
        </Button>
      </Stack>  
        </>
    )
}
export default LoginPage;