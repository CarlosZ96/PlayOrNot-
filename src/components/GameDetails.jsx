import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchGameByName } from '../redux/Games/SearchGameSlice';
import { NavLink } from 'react-router-dom';
import Search from '../img/search.png';
import LogIn from '../img/Muhamad Ulum.png';
import '../stylesheets/gamedetails.css';
import { v4 as uuidv4 } from 'uuid';

export const GameDetails = () => {
  var UID = uuidv4();
  const dispatch = useDispatch();
  const [gameName, setGameName] = useState('');
  const [findgameName, setFindGameName] = useState('Stardew Valley');
  const [agame, setAGame] = useState(null);

  useEffect(() => {
    dispatch(SearchGameByName(`fields name,genres.name,cover.image_id,total_rating,total_rating_count,
    release_dates.human,artworks.image_id,screenshots.image_id,involved_companies.company,involved_companies.publisher,
    involved_companies.developer,language_supports.language;
    where name ~ *"${gameName}"* & category=0; sort total_rating_count desc; limit 5;`));
  }, [dispatch, gameName]);

  const searchgamesf = useSelector((state) => state.searchgames.searchgames);
  const status = useSelector((state) => state.searchgames.status);
  const error = useSelector((state) => state.searchgames.error);

  const renderGame = (findgameName) => {
    dispatch(SearchGameByName(`fields name,genres.name,cover.image_id,total_rating,total_rating_count,
    release_dates.human,artworks.image_id,screenshots.image_id,videos.video_id,involved_companies.company,involved_companies.publisher,
    involved_companies.developer,platforms.name,language_supports.language,multiplayer_modes.onlinecoop,
    multiplayer_modes.campaigncoop,multiplayer_modes.offlinecoop,game_modes.name,summary; 
    where name ~ *"${findgameName}"* & category=0; sort total_rating_count desc; limit 1;`))
      .then(response => {
        setAGame(response.payload);
      })
      .catch(error => {
        console.error('There was an error fetching the game details:', error);
      });
  };

  useEffect(() => {
    if (findgameName) {
      renderGame(findgameName);
    }
  }, [findgameName]);

  const handleInputChange = (e) => {
    setGameName(e.target.value);
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
                  onChange={(e) => handleInputChange(e, gameName)}
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
              <div className='game-details-container-a' key={game.id - 2}>
                <div className='game-details-info-container'>
                  <div></div>
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
                      {game.videos.map(video => (
                        UID = uuidv4(),
                        <iframe key={UID}
                          title={video.name}
                          className={'game-info-video'}
                          src={`https://www.youtube.com/embed/${video.video_id}`}
                          allowFullScreen
                        ></iframe>
                      ))}
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
  );
}

export default GameDetails;
