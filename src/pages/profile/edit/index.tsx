import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import NavBar from '@/components/navBar';
import { Button, Stack, TextField } from '@mui/material';

const EditProfilePage= ()=>{
    const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [editError, setEditError] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.put('http://localhost:8080/user', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        router.push('/profile');
      } else {
        setEditError(true);
      }
    } catch (error) {
      console.error(error);
      setEditError(true);
    }
  };

    return(
      <>
        <NavBar/>
        <div>
          <Stack alignItems="center">
          <h2>Edit profil</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
        id="outlined-required"
        label="Name"
        type="text" {...register('name')} />
        <br />
        <TextField 
        id="outlined-required"
        label="Old password"
        type="Password" {...register('oldPassword')} />
        <br/>
        <TextField 
        id="outlined-required"
        label="New password"
        type="Password" {...register('password')} />
        <br/>
        <TextField
          id="outlined-multiline-static"
          label="Bio"
          type='text' {...register('bio')}/>
          <br/>
          <Button variant='contained' type="submit">Save</Button>
        </form>
          </Stack>
        </div>
      </>
    );
}

export default EditProfilePage;