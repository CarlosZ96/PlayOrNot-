import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FindGamesByName, FindGameByName } from '../redux/Games/FindaGameSlice';
import { v4 as uuidv4 } from 'uuid';
import { NavLink } from 'react-router-dom';
import '../stylesheets/gamedetails.css';
import Search from '../img/search.png';
import LogIn from '../img/Muhamad Ulum.png';

const GameDetails2 = () => {
  var UID = uuidv4();
  const dispatch = useDispatch();
  const [gameName, setGameName] = useState('');
  const [findgameName, setFindGameName] = useState('Stardew Valley');
  const games = useSelector((state) => state.findgames.searchGames);
  const body = `fields name,cover.image_id;
  where name ~ *"${gameName}"* & category=0; sort total_rating_count desc; limit 5;`;
  const body2 = `fields name,genres.name,cover.image_id,total_rating,total_rating_count,
  release_dates.human,artworks.image_id,screenshots.image_id,videos.video_id,involved_companies.company,involved_companies.publisher,
  involved_companies.developer,platforms.name,language_supports.language,multiplayer_modes.onlinecoop,
  multiplayer_modes.campaigncoop,multiplayer_modes.offlinecoop,game_modes.name,summary; 
  where name ~ *"${findgameName}"* & category=0; sort total_rating_count desc; limit 1;`;

  useEffect(() => {
    dispatch(FindGamesByName(body));
  }, [dispatch, gameName]);

  useEffect(() => {
    dispatch(FindGameByName(body2));
  }, [dispatch, findgameName]);

  const agame = useSelector((state) => state.findgames.searchaGame);

  const handleInputChange = (e) => {
    setGameName(e.target.value);
  };

  const handleInputChange2 = (gameNamef) => {
    setFindGameName(gameNamef);
  }

  return (
    agame && agame.map(mgame => (
      UID = uuidv4(),
      <div key={UID} style={{ backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_original/${mgame.artworks ? mgame.artworks[0].image_id : mgame.screenshots[0].image_id}.webp)` }} className='game-details-containerd'>
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
                  onChange={(e) => handleInputChange(e, gameName)}
                />
                <button className='search-button'><img src={Search} alt="" className='search' /></button>
                <button className='LogIn'><img src={LogIn} alt="" className='Mar' /></button>
              </div>
            </div>
            <div className='finded-games-list-container'>
              <ul className={gameName ? 'find-games-container' : 'hide'}>
                {(games).map(game => {
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
              <div className='game-details-container-a' key={game.id - 2}>
                <div className='game-details-info-container'>
                  {game.cover && <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.png`} alt="" className='gamef-image' />}
                  <p>based on {game.total_rating_count} ratings</p>
                  <h2>Total Rating: {game.total_rating}</h2>
                  <h1>{game.name}</h1>
                  <p>Date: {game.release_dates[0].human}</p>
                  <h2>Related Companies:</h2>
                  {game.companies.map(companie => (
                    UID = uuidv4(),
                    <p key={UID}>{companie.name}</p>
                  ))}
                  <h2>Genres:</h2>
                  {game.genres.map(genre => (
                    UID = uuidv4(),
                    <p key={(UID)}>{genre.name}</p>
                  ))}
                  <h2>Platforms:</h2>
                  {game.platforms.map(platform => (
                    UID = uuidv4(),
                    <p key={UID}>{platform.name}</p>
                  ))}
                  <p>{game.summary}</p>
                  <h2>Languages:</h2>
                  <p>
                    {game.gamelanguages.map(gamelanguage => (
                      gamelanguage
                    ))}
                  </p>
                </div>
                <div className='game-details-extra-container'>
                  <div className='game-details-videos-img-container'>
                    <div className='game-details-videos-container'>

                    </div>
                    <div className='game-details-img-container'>
                      {game.screenshots.map(screenshot => (
                        UID = uuidv4(),
                        <img key={UID}
                          className={'game-details-img'}
                          src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${screenshot.image_id}.png`}
                        ></img>
                      ))}
                    </div>
                  </div>
                </div>
                {console.log(game)}
              </div>
            ))}
          </div>
        </div>
      </div>
    ))
  )
}

export default GameDetails2;
