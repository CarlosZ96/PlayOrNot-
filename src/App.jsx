import React, { useState, useEffect } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import Search from './img/search.png';
import LogIn from './img/Muhamad Ulum.png';
import './stylesheets/app.css';
import Categories from './components/Categories';
import GameDetails from './components/GameDetails';
import { nanoid } from '@reduxjs/toolkit';

function App() {
  const [gameName, setGameName] = useState('');
  const [findgameName, setFindGameName] = useState('');
  const [games, setGames] = useState([]);
  const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';
  const headers = {
    'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
    'Authorization': 'Bearer yol7xd1r00hd58t8i081u1a2yzjcsm',
    'Content-Type': 'text/plain',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: `fields name,cover.image_id; where name ~ *"${gameName}"* & category = 0; sort total_rating_count desc;
          limit 5;`
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const findGames = await response.json();
        setGames(findGames);
      } catch (error) {
        console.error('There was a problem with fetch operation:', error);
      }
    };
    fetchData();
  }, [gameName]);

  const handleInputChange = (e) => {
    setGameName(e.target.value);
  };

  return (
    <div className="App">
      <header className='search-header-container'>
        <div className={gameName ? 'reduce' : 'header-container'}>
          <div className='options'>
            <div className='logo'>
              <h1 className='tittle'>Play Or Not?</h1>
            </div>
            <div className='options-buttons'>
              <button className='options-button'>Category</button>
              <button className='options-button'>Reviews</button>
              <button className='options-button'>Rankings</button>
            </div>
          </div>
        </div>
        <div className={gameName ? 'expand' : 'search-container'}>
          <div className='search-bar-container'>
            <div className='search-bar'>
              <input
                type="text"
                className="searchi"
                placeholder="  Search.."
                value={gameName}
                onChange={handleInputChange}
              />
              <button className='search-button'><img src={Search} alt="" className='search' /></button>
              <button className='LogIn'><img src={LogIn} alt="" className='Mar' /></button>
            </div>
          </div>
          <div className='finded-games-list-container'>
            <ul className={gameName ? 'find-games-container' : 'hide'}>
              {games.map(game => {
                return (
                  <NavLink key={nanoid()} to="/GameDetails" onClick={() => setFindGameName(game.name)}>
                    <li key={game.id} className='Game-Find-Container'>
                      {game.cover && <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.png`} alt="" className='gamef-image' />}
                      <span className='Game-Name'>{game.name}</span>
                    </li>
                  </NavLink>
                );
              })}
            </ul>
          </div>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/GameDetails" element={<GameDetails findgameName={findgameName} />} />
      </Routes>
    </div>
  );
}

export default App;
