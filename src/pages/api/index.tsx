import axios from 'axios';
import { Button } from '@mui/material';

export default function FetchData() {
  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:8080/');
      console.log(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données : ', error);
    }
  };

  return (
    <div>
      <Button variant='contained' onClick={fetchData}>Fetch data</Button>
    </div>
  );
}
