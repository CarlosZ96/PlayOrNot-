import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReleases } from '../redux/Games/GameSlice';

function GameReleases() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/https://api.igdb.com/v4/games/', {
          method: 'POST',
          headers: {
            'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
            'Authorization': 'Bearer yol7xd1r00hd58t8i081u1a2yzjcsm',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fields: 'name,release_date.human',
            where: 'rating > 75',
          }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        dispatch(getReleases(data));
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      Hola
    </div>
  );
}

export default GameReleases;
