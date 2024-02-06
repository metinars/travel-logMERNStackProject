import { useEffect, useState } from 'react';
import Travels from '../components/Travels';

const TravelsPage = () => {
  const [travels, setTravels] = useState();

  useEffect(() => {
    const fetchTravels = async () => {
      const response = await fetch(
        import.meta.env.VITE_REACT_APP_SERVER_URL + '/travel/getAll'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();

      setTravels(responseData.result);
    };

    fetchTravels().catch((err) => {
      console.log(err);
    });
  }, []);

  return <Travels travels={travels} />;
};

export default TravelsPage;
