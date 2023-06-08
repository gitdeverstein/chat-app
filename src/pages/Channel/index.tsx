import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { Button, Stack } from '@mui/material';
import NavBar from '../../components/NavBar';

interface Message {
  sender: any;
  id: number;
  senderId: number;
  channelId: number | null; 
  recipientId: number;
  content: string;
  updatedAt: string;
  createdAt: string;
}

const ChannelPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const router = useRouter();
  const [message, setMessage] = useState('');
  const { userId } = router.query;
  const token = Cookies.get('token');

useEffect(() => {
const fetchChannels = async () => {
try {
const token = Cookies.get('token');

    const response = await axios.post('http://localhost:8080/channel', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 && response.data.status) {
      setMessages(response.data.channels);
    } else {
      router.push('/login');
    }
  } catch (error) {
    console.error(error);
    router.push('/login');
  }
};

fetchChannels();
}, []);

const handleClickChannel = (channelId: number) => {
router.push('channel/${channelId}');
};

const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setMessage(event.target.value);
};

const handleCreateChannel= () => {
  router.push('/channel/create')
}

const handleSendMessage = async () => {
  try {
    const response = await axios.post(
      'http://localhost:8080/message',
      {
        recipientId: userId,
        content: message,
      },{headers: {Authorization: `Bearer ${token}`},}
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
  <>
  <Stack alignItems="center">
  <div>
  <NavBar/>
<h1>Channel</h1>
{messages.map((channel) => (
<div key={channel.id} onClick={() => handleClickChannel(channel.id)}>
<div>
{messages.map((message) => (
              <div key={message.id}>
              <h6>{message.sender.name} :  </h6>
              <p>{`Message: ${message.content}`}</p> 
            </div>
            ))}
</div>

          <div>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type your message"
                value={message}
                onChange={handleMessageChange}
              />
              <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
            </div>
          </div>

</div>
))}
<h4>No channels?</h4>
<Button variant="contained" onClick={handleCreateChannel}>Create channel</Button>
</div>
  </Stack>
  </>
);
};

export default ChannelPage;