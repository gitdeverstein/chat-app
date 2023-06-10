import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, TextField, Stack, FormControl, Select, MenuItem, Typography} from '@mui/material';
import NavBar from "@/components/NavBar";
import Cookies from "js-cookie";
import axios from "axios";
import { useForm } from "react-hook-form";

interface User {
  id: number;
  name: string;
}

export default function CreateChannel() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [createError, setCreateError] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  const onSubmit = async (data: any) => {
    try {
      const token = Cookies.get('token');
      const requestData = {
        ...data,
        members: selectedMembers
      };

      const response = await axios.post('http://localhost:8080/channel', requestData, {
        headers: { Authorization: `Bearer ${token}`,},
      });

      if (response.status === 201 && response.data.status) {
        const channelId = response.data.channel.id;
        router.push(`/channel/${channelId}`);
      } else {
        setCreateError(true);
        {createError && <h4>Error occurred while redirecting into this page</h4>}
      }
    } catch (error) {
      console.error(error);
      setCreateError(true);
    }
  };

  const handleMemberSelection = (userId: number) => {
    if (selectedMembers.includes(userId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== userId));
    } else {
      setSelectedMembers([...selectedMembers, userId]);
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
          <Select label="type" labelId="demo-simple-select-label" id="demo-simple-select">
            <MenuItem value="Public">Public</MenuItem>
            <MenuItem value="Pivate">Private</MenuItem>
          </Select>
        </FormControl>
        <br/>
        <div>
          <Typography>Member</Typography>
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id}>
                <input
                  type="checkbox"
                  onChange={() => handleMemberSelection(user.id)}
                  checked={selectedMembers.includes(user.id)}
                />
                <label>{user.name}</label>
              </div>
            ))
          ) : (
            <p>Loading ...</p>
          )}
        </div>
        <Button variant="contained" type="submit">Create channel</Button>
      </form>
    </Stack>
    </>
  );
}