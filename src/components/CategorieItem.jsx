import React, { useState, useEffect } from 'react';
import '../stylesheets/categoriesitem.css';
import g1 from '../img/street-fighter-ryu-epic-desktop-wallpaper.jpg';

const CategorieItem = () => {
  const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';
  const headers = {
    'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
    'Authorization': 'Bearer ld39wm9mmwhugmjva9zk95qu34ab5c',
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
      <div className='games-categorie-left'>
        <div className="miDiv">
          <div style={{ backgroundImage: `url(${g1})` }} className='div-item'></div>
          <div style={{ backgroundImage: `url(${g1})` }} className='div-item'></div>
          <div style={{ backgroundImage: `url(${g1})` }} className='div-item'></div>
        </div>
      </div>
      <div className='games-categorie'>
        <div className='game'>Button</div>
        <div className='game'></div>
        <div className='game'></div>
      </div>
      <div className='games-categorie-right'>
        <div className="miDiv">
          <div style={{ backgroundImage: `url(${g1})` }} className='div-itemr'></div>
          <div style={{ backgroundImage: `url(${g1})` }} className='div-itemr'></div>
          <div style={{ backgroundImage: `url(${g1})` }} className='div-itemr'></div>
        </div>
      </div>
    </div>
  )
}

export default CategorieItem