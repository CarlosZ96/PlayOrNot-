import React, { useEffect } from 'react';
import axios from 'axios';

function GameReleases() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.rawg.io/api/games/in-the-valley-of-gods-2?key=f40cb22a32854188aa4cbf6538242b50');
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
     Hola
    </div>
  );
}

export default GameReleases;
