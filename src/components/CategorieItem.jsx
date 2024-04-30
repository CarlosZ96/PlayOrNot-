import React, { useState, useEffect } from 'react';
import '../stylesheets/categoriesitem.css';

const CategorieItem = () => {
  const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';
  const headers = {
    'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
    'Authorization': 'Bearer yol7xd1r00hd58t8i081u1a2yzjcsm',
    'Content-Type': 'text/plain',
  };

  const [games, setGames] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: `fields name,genres.name,artworks.image_id,screenshots.image_id;
          where genres = 10 & total_rating_count >= 50; sort total_rating desc; limit 3;`
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const findGames = await response.json();
        setGames(findGames);
        return games;
      } catch (error) {
        console.error('There was a problem with fetch operation:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='Categorie-item'>
      <div className="miDiv">
        {games && games.map(game => (
          <div style={{ backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_original/${game.artworks ? game.artworks[0].image_id : game.screenshots[0].image_id}.webp)` }} key={game.id} className='div-item'></div>
        ))}
      </div>
    </div>
  )
}

export default CategorieItem