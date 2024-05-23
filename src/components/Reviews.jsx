import React, { useEffect, useState, useRef } from 'react';
import styles from '../stylesheets/reviews.module.css';
import LogIn from '../img/Muhamad Ulum.png';
import Search from '../img/search.png';
import Mncito from '../img/Mncito.png';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import GameInfo from './reviews/GameInfo';
import MediaContainer from './reviews/media/MediaContainer';

const Reviews = () => {
  var UID = uuidv4();
  const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';
  const body2 = `fields name,first_release_date,total_rating,total_rating_count,cover.image_id,artworks.image_id;
  where total_rating_count >= 40 & category = 0 & first_release_date <= 1713070800 & first_release_date >= 1704085200; sort total_rating desc;
  limit 4;`;
  const headers = {
    'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
    'Authorization': 'Bearer xgs56m0we1a96ipiu3zrfk684qrymn',
    'Content-Type': 'text/plain',
  };

  const [gameName, setGameName] = useState('');
  const [Game, setGame] = useState([]);
  const [findgameName, setFindGameName] = useState('');
  const [GameDetailsReview, setGameDetailsReview] = useState('');
  const [gameNameFiltered, setGameNameFiltered] = useState('');
  const [showGameList, setShowGameList] = useState(false);

  const handleInputChange = (e) => {
    setGameName(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (node.current && !node.current.contains(event.target)) {
        setShowGameList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const node = useRef();
  const imgRef = useRef();
  const nodecla2 = useRef();

  const showMediaSection = () => {
    const imgContaineRef = imgRef.current;
    const container2 = nodecla2.current;
    if (imgContaineRef.classList.contains(styles['game-extra-image-container'])) {
      imgContaineRef.classList.remove(styles['game-extra-image-container']);
      imgContaineRef.classList.add(styles['hide']);
      container2.classList.add(styles['hidden']);
      container2.classList.remove(styles['hide']);
    } else {
      imgContaineRef.classList.remove(styles['hide']);
      container2.classList.remove(styles['hidden']);
      imgContaineRef.classList.add(styles['game-extra-image-container']);
      container2.classList.add(styles['hide']);
    }
  }

  const handleGameItemClick = (gameName) => {
    setGameNameFiltered(gameName);
    setGameName(gameName);
    setShowGameList(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: `fields name,rating,rating_count,total_rating,total_rating,total_rating_count,screenshots.image_id,
          cover.image_id,videos.video_id,dlcs.name,dlcs.cover.image_id,dlcs.release_dates.human,external_games.url,external_games.category,
          first_release_date,release_dates.human,release_dates.date,genres.name,platforms.name,category,artworks.image_id;
          where name ~ *"${gameName}"* & category = 0;
          sort total_rating_count desc; limit 5;`
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const findGames = await response.json();
        setFindGameName(findGames);
        return findgameName;
      } catch (error) {
        console.error('There was a problem with fetch operation:', error);
      }
    };
    fetchData();
  }, [gameName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: `fields name,rating,rating_count,total_rating,total_rating,total_rating_count,screenshots.image_id,
          cover.image_id,videos.video_id,dlcs.name,dlcs.cover.image_id,dlcs.screenshots.image_id,dlcs.release_dates.human,external_games.url,external_games.category,
          first_release_date,release_dates.human,release_dates.date,genres.name,platforms.name,category,artworks.image_id;
          where name ~ *"${gameNameFiltered}"* & category = 0;
          sort total_rating_count desc; limit 1;`
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const findGames = await response.json();
        const updatedGames = findGames.map(game => {
          const uniqueExternalGames = game.external_games.filter((game, index, self) => {
            return index === self.findIndex((g) => (
              g.category === game.category
            ));
          });

          return {
            ...game,
            external_games: uniqueExternalGames
          };
        });

        setGameDetailsReview(updatedGames);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, [gameNameFiltered]);

  useEffect(() => {
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: body2
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const roundedData = data.map(game => ({
          ...game,
          total_rating: Math.round(game.total_rating)
        }));
        setGame(roundedData);
        return Game;
      })
      .catch(error => {
        console.error('There was a problem with fetch operation:', error);
      });
  }, []);

  return (

    <div className={styles['Reviews-body']}>
      <header className={styles['search-header-container']}>
        <div className={styles['header-container']}>
          <div className={styles['options']} >
            <div className={styles['logo']}>
              <h1 className='tittle'>Play Or Not?</h1>
            </div>
            <div className={styles['options-buttons-container']}>
              <button className={styles['options-button']}>Home</button>
              <button className={styles['options-button']}>Category</button>
              <button className={styles['options-button']}>Rankings</button>
            </div>
          </div>
          <button className='LogIn'><img src={LogIn} alt="LogIn" className='Mar' /></button>
        </div>
      </header>
      <div className={styles['Reviews-Container']}>
        <div className={styles['game-review-container']}>
          <div className={styles['search-game-container']}>
            <div className={styles['search-game-review']}>
              <div className={styles['input-container']} ref={node}>
                <div className={styles['input-container-tittle-button']}>
                  <h1 className={styles['search-game-title']}>Find a Game : </h1>
                  <div className={styles['input-button-container']}>
                    <input
                      type="text"
                      className={styles['input-game-review']}
                      placeholder="game name. . ."
                      value={gameName}
                      onChange={handleInputChange}
                      onFocus={() => setShowGameList(true)}
                    />
                    <button className={styles['input-game-button']}><img src={Search} alt="" className='search' /></button>
                    <ul className={showGameList && gameName ? styles['input-games-found-expanded'] : styles['hide']}>
                      {findgameName && findgameName.map(fgame => (
                        UID = uuidv4(),
                        <li className={styles['games-found-container-li']} key={UID} onClick={() => handleGameItemClick(fgame.name)}>
                          {fgame.cover && <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${fgame.cover.image_id}.png`} alt="" className='gamef-image' />}
                          <h3 className={styles['games-found-name']}>{fgame.name}</h3>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {GameDetailsReview && GameDetailsReview[0] && (
            UID = uuidv4(),
            <div key={UID} className={styles['game-info-container']}>
              <div className={styles['game-info']}>
                <div className={styles['game-caratule']}>
                  {GameDetailsReview[0].cover && <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${GameDetailsReview[0].cover.image_id}.png`} alt="game-image" className={styles['game-info-car']} />}
                </div>
                <h1 className={styles['game-caregory']}></h1>
                <GameInfo game={GameDetailsReview} />
              </div>
              <div className={styles['game-review-info']}>
                <div className={styles['game-review-rating-container']}>
                  <div className={styles['game-rating-container']}>
                    <h1 className={styles['PR']}>Play or Not?</h1>
                    <div className={styles['game-rating-YMN-ccontainer']}>
                      <div className={styles['game-rating-Y-container']}>
                        <h1 className={styles['rating-txt']}>Yes!!</h1>
                        <div className={styles['Game-rating-Mncito-container']}>
                          <img className={styles['Game-rating-Mncito-img']} src={Mncito} alt="approving image" />
                        </div>
                        <h1 className={styles['rating-txt']}>This game is..</h1>
                      </div>
                    </div>
                    <div className={styles['game-rating-bar-container']}>
                      <div className={styles['game-rating-bar']}>
                        <h1 style={{ width: `${Math.round(GameDetailsReview[0].rating)}%` }} className={styles['rating-number']}>
                          “Very Good” {Math.round(GameDetailsReview[0].rating)}%</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <MediaContainer agame={GameDetailsReview} />
              </div>
            </div>
          )}
        </div>
        <div className={styles['last-reviewed-container']}>
          <h1 className={styles['last-reviewed-title']}>Last Reviewed</h1>
          <div className={styles['last-reviewed-game-container']}>
            {Game.map((gamef) => (
              UID = uuidv4(),
              <div key={UID} className={styles['last-game-container']}>
                <h1 className={styles['last-reviewed-game-title']}>{gamef.name}</h1>
                <div className={styles['last-reviewed-game-background']}></div>
                <img src={`https://images.igdb.com/igdb/image/upload/t_original/${gamef.artworks[0].image_id}.webp`} alt="game-image" className={styles['last-reviewed-game-img']} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews;
