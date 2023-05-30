import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface Channel {
id: number;
name: string;
type: string;
ownerId: number;
updatedAt: string;
createdAt: string;
}

const ChannelPage = () => {
const [channels, setChannels] = useState<Channel[]>([]);
const router = useRouter();

useEffect(() => {
const fetchChannels = async () => {
try {
const token = Cookies.get('token');

    const response = await axios.get('http://localhost:8080/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200 && response.data.status) {
      setChannels(response.data.channels);
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

const handleChannelClick = (channelId: number) => {
router.push('/channels/channel/${channelId}');
};

return (
<div>
<h1>Channel</h1>
{channels.map((channel) => (
<div key={channel.id} onClick={() => handleChannelClick(channel.id)}>
<p>{channel.name}</p>
<p>{channel.type}</p>
<p>{channel.ownerId}</p>
</div>
))}
</div>
);
};

export default ChannelPage;