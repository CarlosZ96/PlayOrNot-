import React, { useEffect, useState } from 'react';
import '../stylesheets/gamestop.css';

function GamesTop() {
  const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';
  const body = `fields name,cover.image_id,total_rating,total_rating_count,release_dates.human; where total_rating >= 86 & total_rating_count >= 2000 & category=0; sort total_rating desc;limit 10;`;
  const headers = {
    'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
    'Authorization': 'Bearer xgs56m0we1a96ipiu3zrfk684qrymn',
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
        const roundedData = data.map(game => ({
          ...game,
          total_rating: Math.round(game.total_rating)
        }));
        setTop10(roundedData);
      })
      .catch(error => {
        console.error('There was a problem with fetch operation:', error);
      });
  }, []);

  return (
    <div className='top-container'>
      <h1 className='top-title'>Top 10 All times</h1>
      <ul className='list-top-container'>
        {top10.map((game, index) => (
          <li key={game.id} className='top-list'>
            <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.png`} alt="" className='top-image' />
            <div className='top-info-container'>
              <div className='top-title-container'>
                <h2 className='list-item'>#{`${index + 1}  ${game.name}`}</h2>
              </div>
              <h3 className='game-date'>{game.release_dates[0].human}</h3>
            </div>
            <div className='game-rating-container'>
              <p className='list-item-r'>{game.total_rating}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GamesTop;
