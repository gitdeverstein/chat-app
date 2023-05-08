import { useState } from 'react';
import { useRouter } from 'next/router';
import io from 'socket.io-client';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    const socket = io('http://localhost:3000');
    socket.on('connect', () => {
      console.log('Connected to socket.io server');
    });
socket.emit('chatMessage', 'Bonjour tout le monde !');

socket.on('chatMessage', message => {
  console.log('Nouveau message de chat :', message);
});
    
    router.push('/global-chat');
  };

  return (
    <div>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Adresse e-mail:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Mot de passe:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Confirmer le mot de passe:
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Biographie:
          <textarea name="bio" value={formData.bio} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}
