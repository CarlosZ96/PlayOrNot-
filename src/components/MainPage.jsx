import React, { useState, useEffect } from 'react';
import GameReleases from './GamesReleases.jsx';
import GamesTop from './GamesTop.jsx';
import { NavLink } from 'react-router-dom';
import PC from '../img/computer-mouse.png';
import ANDROID from '../img/mobile.png';
import SWITCH from '../img/console.png';
import PLAY from '../img/playstation.png';
import XBOX from '../img/XBOX.png';
import '../stylesheets/mainpage.css';
import Header from '../components/Header';
import back from '../img/ConsolesBackground.png';

function MainPage() {
  const [findgameName, setFindGameName] = useState('');
  const [games, setGames] = useState([]);
  const [gameName, setGameName] = useState('');

  const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';
  const headers = {
    'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
    'Authorization': 'Bearer xgs56m0we1a96ipiu3zrfk684qrymn',
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
    <div className='mid' style={{ backgroundImage: `url(${back})` }}>
      <Header
        route={"Categories"}
        route2={"Reviews"}
        route3={"Rankings"}
        optioName={"Categories"}
        optioName2={"Reviews"}
        optioName3={"Rankings"}
      />
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
