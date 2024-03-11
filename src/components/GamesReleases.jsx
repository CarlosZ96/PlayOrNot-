import React, { useEffect } from 'react';
import axios from 'axios';

function GameReleases() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.rawg.io/api/games/dragons-dogma-2?key=f40cb22a32854188aa4cbf6538242b50');
        const agame = response.data;
        console.log(agame);
        console.log(agame.id);
        console.log(agame.name);
        console.log(agame.parent_platforms[0].platform.name);
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
