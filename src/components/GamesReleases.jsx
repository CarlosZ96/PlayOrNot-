import React, { useEffect } from 'react';
import axios from 'axios';

function GameReleases() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://api.igdb.com/v4/games', {
          fields: '*',
        }, {
          headers: {
            'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
            'Authorization': 'Bearer yol7xd1r00hd58t8i081u1a2yzjcsm'
          }
        });
        console.log(response);
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
