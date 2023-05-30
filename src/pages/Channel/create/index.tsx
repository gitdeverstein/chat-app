import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, TextField, Stack, FormControl, Select, MenuItem} from '@mui/material';
import NavBar from "@/components/navBar";
import Cookies from "js-cookie";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function CreateChannel() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [createError, setCreateError] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.post('http://localhost:8080/channel', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 && response.data.status) {
        const channelId = response.data.channel.id;
        router.push(`/channels/channel/${channelId}`);
      } else {
        setCreateError(true);
        {createError && <h4>Error occurred while redirecting into this page</h4>}
      }
    } catch (error) {
      console.error(error);
      setCreateError(true);
    }
  };

  return (
    <>
      <Stack alignItems="center">
        <NavBar />
      <h2>Create channel</h2>
      {createError && <h4>Error occurred while creating channel</h4>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField required label="Name" type="text" {...register('name')} />
        <br/>
        <FormControl fullWidth>
          <Select label="Age" labelId="demo-simple-select-label" id="demo-simple-select">
            <MenuItem value="Public">Public</MenuItem>
            <MenuItem value="Pivate">Private</MenuItem>
          </Select>
        </FormControl>
        <br/>
        <TextField required label="Member" type="text" {...register('members')} />
        <br/>
        <Button variant="contained" type="submit">Create channel</Button>
      </form>
      </Stack>
    </>
  );
}