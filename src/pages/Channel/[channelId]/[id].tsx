import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import NavBar from '@/components/NavBar';

interface Channel {
  id: number;
  name: string;
  type: string;
  ownerId: number;
  updatedAt: string;
  createdAt: string;
}

const ChannelIdPage = () => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { channelId } = router.query;
  const [createError, setCreateError] = useState(false);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(`http://localhost:8080/channel/${channelId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200 && response.data.status) {
          setChannel(response.data.channel);
        } else {
            setCreateError(true);
        }
      } catch (error) {
        console.error(error);
        setCreateError(true);
        router.push(`/channel/create`)
      }
    };

    if (channelId) {
      fetchChannelData();
    }
  }, [channelId]);

  if (!channel) {
    return <p>Loading...</p>;
  }

  const handleAddMembers = () => {
    router.push(`channel/${channelId}/members`);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:8080/message',
        {
          channelId: channel.id,
          content: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 && response.data.status) {
        setMessage('');
        router.reload();
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavBar/>
      <h1>Channel {channel.id}</h1>
      <div>
      <h3>Name: {channel.name}</h3>
      <button onClick={handleAddMembers}>Edit</button>
      </div>
      <p>Type: {channel.type}</p>
      <p>Owner ID: {channel.ownerId}</p>
      <p>Updated At: {channel.updatedAt}</p>
      <p>Created At: {channel.createdAt}</p>
      <input
      type="text"
      placeholder="Type your message"
      value={message}
      onChange={handleMessageChange} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChannelIdPage;
