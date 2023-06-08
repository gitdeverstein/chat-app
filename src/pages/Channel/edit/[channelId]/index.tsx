import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import NavBar from '@/components/NavBar';

interface User {
  id: number;
  name: string;
}

const AddMemberPage = () => {
  const router = useRouter();
  const [selectmembers, setSelectMembers] = useState<number[]>([]);
  const [success, setSuccess] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [userAdded, setUserAdded] = useState<number[]>([]);
  const { channelId } = router.query;

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('http://localhost:8080/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddMember = async () => {
    if (selectmembers.length === 0) {
      setError('Please enter a member ID');
      return;
    }

    try {
      const token = Cookies.get('token');
      const response = await axios.post(`http://localhost:8080/channel/${channelId}`, {
        members: selectmembers,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 && response.data.status) {
        setSuccess(true);
        setUserAdded(response.data.userAdded);
        setError('');
      } else {
        setError('User not found');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const memberId = parseInt(event.target.value);
    setSelectMembers([memberId]);
  };

  return (
    <div>
      <NavBar />
      <h1>Add Member</h1>
      {success && <p>Member added successfully</p>}
      {error && <p>{error}</p>}
      <div>
        <label>Members</label>
        <input type="number" onChange={handleChange} />
      </div>

      {userAdded.length > 0 && (
        <div>
          <h2>Members Added:</h2>
          <ul>
            {userAdded.map((userId) =>
            ( <li key={userId}>{userId}</li> ))}
          </ul>
        </div>
      )}
      <button onClick={handleAddMember}>Add Member</button>
    </div>
  );
};

export default AddMemberPage;
