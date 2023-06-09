import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import NavBar from '@/components/NavBar';

interface User {
  id: number;
  name: string;
}

const editChannelPage = () => {
  const router = useRouter();
  const [selectmembers, setSelectMembers] = useState<number[]>([]);
  const [success, setSuccess] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
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

  const handleMemberSelection = (userId: number) => {
    if (selectmembers.includes(userId)) {
      setSelectMembers(selectmembers.filter((id) => id !== userId));
    } else {
      setSelectMembers([...selectmembers, userId]);
    }
  };

  const handleAddMember = async () => {
    if (selectmembers.length === 0) {
      setError('Please enter a member');
      return;
    }

    try {
      const token = Cookies.get('token');
      const response = await axios.post(`http://localhost:8080/channel/${channelId}/memmbers`, {
        members: selectmembers,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 && response.data.status) {
        setSuccess(true);
      } else {
        setError('User not found');
        router.push('/channel/create')
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred');
    }
  };

  return (
    <div>
      <NavBar />
      <h1>Add Member</h1>
      {success && <p>Member added !</p>}
      {error && <p>{error}</p>}
      <div>
        <label>Members</label>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id}>
              <input
                type="checkbox"
                onChange={() => handleMemberSelection(user.id)}
                checked={selectmembers.includes(user.id)}
              />
              <label>{user.name}</label>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <button onClick={handleAddMember}>Add Member</button>
    </div>
  );
};

export default editChannelPage;
