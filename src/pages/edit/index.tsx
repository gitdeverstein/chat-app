import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import NavBar from '@/components/navBar';
import { Stack, TextField } from '@mui/material';

const EditProfilePage= ()=>{
    const { register, handleSubmit, formState: { errors } } = useForm();
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
        router.push('/users/profile');
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
        <Stack alignItems="center">
            <h2>Edit profil</h2>
        {editError && <p>Error occurred while editing profile</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
        id="outlined-required"
        label="Nom"
        type="text" {...register('name')} />
        <br />
        <TextField/>
        </form>
        </Stack>
        
        </>
    );
}

export default EditProfilePage;