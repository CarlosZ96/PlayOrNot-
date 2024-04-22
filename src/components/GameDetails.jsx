import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchGameByName } from '../redux/Games/SearchGameSlice';
import { NavLink } from 'react-router-dom';
import Search from '../img/search.png';
import LogIn from '../img/Muhamad Ulum.png';
import '../stylesheets/gamedetails.css';


export const GameDetails = () => {
  const dispatch = useDispatch();
  const [gameName, setGameName] = useState('');
  const [findgameName, setFindGameName] = useState('Stardew Valley');
  const [agame, setAGame] = useState(null);

  useEffect(() => {
    dispatch(SearchGameByName(gameName));
  }, [dispatch, gameName]);

  const searchgamesf = useSelector((state) => state.searchgames.searchgames);
  const status = useSelector((state) => state.searchgames.status);
  const error = useSelector((state) => state.searchgames.error);


  const renderGame = (findgameName) => {
    const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';
    const headers = {
      'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
      'Authorization': 'Bearer yol7xd1r00hd58t8i081u1a2yzjcsm',
      'Content-Type': 'text/plain',
    };
    const body = `fields name,genres.name,cover.image_id,total_rating,total_rating_count,
      release_dates.human,artworks.image_id,screenshots.image_id,involved_companies.company,involved_companies.publisher,involved_companies.developer; 
      where name ~ *"${findgameName}"* & category=0; sort total_rating_count desc; limit 1;`;
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
        setAGame(data);
        
      })
      .catch(error => {
        console.error('There was a problem with fetch operation:', error);
      });
  };

  useEffect(() => {
    if (findgameName) {
      renderGame(findgameName);
    }
  }, [gameName, findgameName]);


  const handleInputChange = (e, gameNamef) => {
    setGameName(e.target.value);
    renderGame(gameNamef);
  };

  const handleInputChange2 = (gameNamef) => {
    setFindGameName(gameNamef);
    renderGame(gameNamef);
  };


  return (
    agame && agame.map(mgame => (
      <div key={mgame.id - 8} style={{ backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_original/${mgame.artworks ? mgame.artworks[0].image_id : mgame.screenshots[0].image_id}.webp)` }} className='game-details-containerd'>
        <header className='search-header-container'>
          <div className={gameName ? 'reduce' : 'header-container'}>
            <div className='options'>
              <div className='logo'>
                <h1 className='tittle'>Play Or Not?</h1>
              </div>
              <div className='options-buttons-container'>
                <NavLink to="/Categories" className='options-button'>Category</NavLink>
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
                  onChange={(e) => handleInputChange(e, findgameName)}
                />
                <button className='search-button'><img src={Search} alt="" className='search' /></button>
                <button className='LogIn'><img src={LogIn} alt="" className='Mar' /></button>
              </div>
            </div>
            <div className='finded-games-list-container'>
              <ul className={gameName ? 'find-games-container' : 'hide'}>
                {(searchgamesf).map(game => {
                  return (
                    <div key={game.id} className='games-input-container'>
                      <li key={game.id} className='Game-Find-Container' onClick={() => handleInputChange2(game.name)}>
                        {game.cover && <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.png`} alt="" className='gamef-image' />}
                        <span className='Game-Name'>{game.name}</span>
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </header>
        <div className='game-details-containerd-blur'>
          <div className='game-container'>
            {agame && agame.map(game => (
              <div key={game.id}>
                <h2>{game.name}</h2>
                <p>Total Rating: {game.total_rating}</p>
                <p>Date: {game.release_dates[0].human}</p>
                <h2>Genres:</h2>
                {game.genres.map(genre => (
                  <h3 key={genre.id}>{genre.name}</h3>
                ))}
                <h2>Related Companies:</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))
  );
}

export default GameDetails;
