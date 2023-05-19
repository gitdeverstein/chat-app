import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Input, Stack} from '@mui/material';

interface Message {
  id: number;
  text: string;
  author: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = true;
    if (!isAuthenticated) {
      router.push("/singIn");
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      author: "user",
    };
    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div>
      <Stack alignItems="center">
      <h1>Chat</h1>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <strong>{message.author}: </strong>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <Input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
        <Button variant="contained" type="submit">Send</Button>
      </form>
      </Stack>
    </div>
  );
}