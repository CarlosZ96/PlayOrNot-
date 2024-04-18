import React, { useState, useEffect } from 'react';
import GameReleases from './GamesReleases.jsx';
import GamesTop from './GamesTop.jsx';
import { NavLink} from 'react-router-dom';
import PC from '../img/computer-mouse.png';
import ANDROID from '../img/mobile.png';
import SWITCH from '../img/console.png';
import PLAY from '../img/playstation.png';
import XBOX from '../img/buttons.png';
import '../stylesheets/mainpage.css';
import Search from '../img/search.png';
import LogIn from '../img/Muhamad Ulum.png';

function MainPage() {
  const [findgameName, setFindGameName] = useState('');
  const [games, setGames] = useState([]);
  const [gameName, setGameName] = useState('');

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
    <div className='mid'>
      <header className='search-header-container'>
        <div className={gameName ? 'reduce' : 'header-container'}>
          <div className='options'>
            <div className='logo'>
              <h1 className='tittle'>Play Or Not?</h1>
            </div>
            <div className='options-buttons-container'>
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
                  <NavLink key={game.id} to="/GameDetails" onClick={() => setFindGameName(game.name)}>
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
      <section className='releases-top'>
        <GameReleases />
        <div className="Ranking">
          <GamesTop />
        </div>
      </section>
      <div className="Consoles">
        <div className='platform'>
          <img src={PC} alt="" className='platform-img' />
        </div>
        <div className='platform'>
          <img src={ANDROID} alt="" className='platform-img' />
        </div>
        <div className='platform'>
          <img src={SWITCH} alt="" className='platform-img' />
        </div>
        <div className='platform'>
          <img src={PLAY} alt="" className='platform-img' />
        </div>
        <div className='platform'>
          <img src={XBOX} alt="" className='platform-img' />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
