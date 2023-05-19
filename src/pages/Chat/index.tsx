import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}