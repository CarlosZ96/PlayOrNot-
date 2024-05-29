import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FindGameByName } from '../redux/Games/FindaGameSlice';
import { NavLink, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/Header';
import '../stylesheets/gamedetails.css';
import Search from '../img/search.png';
import LogIn from '../img/Muhamad Ulum.png';

const GameDetails2 = ({ headername }) => {
  var UID = uuidv4();
  const dispatch = useDispatch();
  const [gameName, setGameName] = useState('');
  headername = useParams();
  console.log(headername);
  const [findgameName, setFindGameName] = useState(`${headername.gamename}`);
  const [games, setGames] = useState([]);
  const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';
  const headers = {
    'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
    'Authorization': 'Bearer xgs56m0we1a96ipiu3zrfk684qrymn',
    'Content-Type': 'text/plain',
  };
  const body2 = `fields name,genres.name,cover.image_id,total_rating,total_rating_count,
  release_dates.human,artworks.image_id,screenshots.image_id,videos.video_id,involved_companies.company,involved_companies.publisher,
  involved_companies.developer,platforms.name,language_supports.language,multiplayer_modes.onlinecoop,
  multiplayer_modes.campaigncoop,multiplayer_modes.offlinecoop,game_modes.name,summary; 
  where name ~ *"${findgameName}"* & category=0; sort total_rating_count desc; limit 1;`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: `fields name,cover.image_id;
          where name ~ *"${gameName}"* & category = 0;
          sort total_rating_count desc; limit 5;`
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
        <Header
          route={"Categories"}
          route2={"Reviews"}
          route3={"Rankings"}
          optioName={"Categories"}
          optioName2={"Reviews"}
          optioName3={"Rankings"}
        />
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

GameDetails2.propTypes = {
  headername: PropTypes.string.isRequired,
};

export default GameDetails2;
