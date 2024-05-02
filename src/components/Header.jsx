import React, { useEffect, useState, useRef } from 'react';
import LogIn from '../img/Muhamad Ulum.png';
import search from '../img/zoom.png';
import '../stylesheets/header.css';

const Header = () => {
  const [gameName, setGameName] = useState('');
  const [games, setGames] = useState([]);
  const [showGameList, setShowGameList] = useState(false);
  const node = useRef();
  const node2 = useRef();

  const handleInputChange = (e) => {
    const inputValue = node.current.querySelector('.input-game-review').value;
    setGameName(inputValue);
  };

  const handleGameItemClick = () => {
    node.current.querySelector('.input-game-review').value = '';
    setShowGameList(false);
    setGameName('');
  };

  const headers = {
    'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
    'Authorization': 'Bearer xgs56m0we1a96ipiu3zrfk684qrymn',
    'Content-Type': 'text/plain',
  };
  const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (node.current && !node.current.contains(event.target)) {
        setShowGameList(false);
        setGameName('');
      }if (node.current && node.current.contains(event.target)) {
        setShowGameList(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: `fields name,cover.image_id;
          where name ~ *"${gameName}"* & category = 0;
          sort total_rating_count desc; limit 10;`
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
  }, [gameName]);

  return (
      <header className='h-container'>
        <div className='options'>
          <div className='logo'>
            <h1 className='tittle'>Play Or Not?</h1>
          </div>
          <div className='options-buttons-container'>
            <button className='h-options-button'>Categories</button>
            <button className='h-options-button'>Reviews</button>
            <button className='h-options-button'>Rankings</button>
          </div>
        </div>
        <div className='search-game-container' ref={node}>
          <div className='input-button-container'>
            <div className='search-containerd'>
              <input
                type="text"
                className='input-game-review'
                placeholder="  Search.."
                onChange={() => setShowGameList(true)}
              />
              <button ref={node2} className='LogIn'><img onClick={handleInputChange} src={search} alt="LogIn" className='search-img' /></button>
            </div>
            <button className='LogIn'><img src={LogIn} alt="LogIn" className='Mar' /></button>
          </div>
          <ul className={showGameList && gameName ? 'input-games-found-expanded' : 'hide'}>
            {games && games.map(fgame => (
              <li className='games-found-container-li' key={fgame.id} onClick={() => handleGameItemClick(fgame.name)}>
                {fgame.cover && <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${fgame.cover.image_id}.png`} alt="" className='gamef-image' />}
                <h3 className='games-found-name'>{fgame.name}</h3>
              </li>
            ))}
          </ul>
        </div>
      </header>
  )
}

export default Header