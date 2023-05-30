import { useRouter } from 'next/router';
import {NextPage} from 'next';
import { Stack, TextField, Button } from '@mui/material';
import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const SignUpPage: NextPage= ()=>{
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [signupError, setSignupError] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:8080/users', data);
      if (response.status === 201) {
        const token = response.data.user.token;

        const idUser = response.data.user.id;

        Cookies.set('id', idUser);

        Cookies.set('token', token);

        router.push('/profile');
      } else {
        setSignupError(true);
      }
    } catch (error) {
      console.error(error);
      setSignupError(true);
    }
  };

      return(
        <>
        <Stack alignItems="center">
        <h1>Sign up</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
    <TextField
          required
          id="outlined-required"
          label="name"
          {...register('name', { required: true })} />
      <br />
      <TextField
          required
          id="outlined-required"
          label="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })} />
      <br />
      <TextField
          required
          id="standard-password-input"
          label="new password"
          type="password"
          autoComplete="current-password"
          {...register('password', { required: true })} />
      <br />
      <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          label="bio"
          {...register('bio')} />
      <br />
      <Button variant="contained" type='submit'>Sign up</Button>
    </form>
        </Stack>
        </>
      )
}

export default SignUpPage;
