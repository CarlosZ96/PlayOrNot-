import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import '../stylesheets/gamestop.css';

function GamesTop()  {
  const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';
  const body = `fields name,total_rating,total_rating_count; where total_rating >= 86 & total_rating_count >= 2000 & category=0; sort total_rating desc;limit 10;`;
  const headers = {
    'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
    'Authorization': 'Bearer yol7xd1r00hd58t8i081u1a2yzjcsm',
    'Content-Type': 'text/plain',
  };
  
  const [top10, setTop10] = useState([]);

  useEffect(() => {
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: body
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Top data:', data);
      setTop10(data);
    })
    .catch(error => {
      console.error('There was a problem with fetch operation:', error);
    });
  }, []);

  return (
    <div className='top-container'>
      <h1 className='top-title'>Top 10 All time</h1>
      <ul>
      {top10.map((game, index) => (
  <li key={nanoid()} className='top-list'>
    <h2>{`${index + 1}. ${game.name}`}</h2>
    <p>Total Rating: {game.total_rating}</p>
  </li>
))}
      </ul>
    </div>
  );
}

export default GamesTop;
