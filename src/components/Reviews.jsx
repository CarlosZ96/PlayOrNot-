import React, { useEffect, useState, useRef } from 'react';
import styles from '../stylesheets/reviews.module.css';
import LogIn from '../img/Muhamad Ulum.png';
import Search from '../img/search.png';
import Steam from '../img/Stores/steam.png';
import gog from '../img/Stores/gog.png';
import xboxs from '../img/Stores/xbox_store.jpg';
import epic from '../img/Stores/Epic_Games.png';
import amazon from '../img/Stores/amazon_pocike.png';
import microsoft from '../img/Stores/microsoft.png';
import googleplay from '../img/Stores/google-play.png';
import playstore from '../img/Stores/psstore-shoppingbag.png';
import { v4 as uuidv4 } from 'uuid';

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
          cover.image_id,videos.video_id,dlcs.name,dlcs.cover.image_id,external_games.url,external_games.category,
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
          cover.image_id,videos.video_id,dlcs.name,dlcs.cover.image_id,external_games.url,external_games.category,
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
              <button className={styles['options-button']}>Category</button>
              <button className={styles['options-button']}>Reviews</button>
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
                  <h1 className={styles['search-game-title']}>Find a Game </h1>
                  <div className={styles['input-button-container']}>
                    <input
                      type="text"
                      className={styles['input-game-review']}
                      placeholder="  Search.."
                      value={gameName}
                      onChange={handleInputChange}
                      onFocus={() => setShowGameList(true)}
                    />
                    <button className={styles['input-game-button']}><img src={Search} alt="" className='search' /></button>
                  </div>
                </div>
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
          {GameDetailsReview && GameDetailsReview[0] && (
            console.log(GameDetailsReview),
            UID = uuidv4(),
            <div key={UID} className={styles['game-info-container']}>
              <div className={styles['game-info']}>
                <div className={styles['game-caratule']}>
                  {GameDetailsReview[0].cover && <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${GameDetailsReview[0].cover.image_id}.png`} alt="game-image" className={styles['game-info-car']} />}
                </div>
                <h1 className={styles['game-caregory']}></h1>
                <div className={styles['game-info-details']}>
                  <div className={styles['game-genres-container']}>
                    <h2 className={styles['game-info-tittle']}>Genres:</h2>
                    <p className={styles['game-info-txt-p']}>
                      {GameDetailsReview[0].genres && GameDetailsReview[0].genres.map(genres => (
                        genres.name
                      ))}
                    </p>
                  </div>
                  <div className={styles['release-data-container']}>
                    <h2 className={styles['game-info-tittle']}>Release Data:</h2>
                    <h3 className={styles['game-info-txt']}>{GameDetailsReview[0].release_dates[0].human ?
                      GameDetailsReview[0].release_dates[0].human : 'N/A'}</h3>
                  </div>
                  <div className={styles['Plarforms-container']}>
                    <h2 className={styles['game-info-tittle']}>Plarforms:</h2>
                    <p className={styles['game-info-txt']} key={UID}>
                      {GameDetailsReview[0].platforms && GameDetailsReview[0].platforms.map(platform => {
                        UID = uuidv4();
                        if (platform.name !== 'Linux' && platform.name !== 'Mac' && platform.name !== 'iOS'
                          && platform.name !== 'iOS') {
                          return platform.name
                        }
                      })}
                    </p>
                  </div>
                  <div className={styles['Stores-container']}>
                    <h2 className={styles['game-info-tittle']}>Available in:</h2>
                    <div className={styles['game-info-stores']}>
                      {GameDetailsReview[0].external_games && GameDetailsReview[0].external_games.map(external_game => {
                        if (external_game.category == '1') {
                          return <img key={uuidv4()} src={Steam} alt="" className={styles['Store-img']} />;
                        }
                        if (external_game.category == '5') {
                          return <img key={uuidv4()} src={gog} alt="" className={styles['Store-img']} />;
                        }
                        if (external_game.category == '31') {
                          return <img key={uuidv4()} src={xboxs} alt="" className={styles['Store-img']} />;
                        }
                        if (external_game.category == '26') {
                          return <img key={uuidv4()} src={epic} alt="" className={styles['Store-img']} />;
                        }
                        if (external_game.category == '20') {
                          return <img key={uuidv4()} src={amazon} alt="" className={styles['Store-img']} />;
                        }
                        if (external_game.category == '11') {
                          return <img key={uuidv4()} src={microsoft} alt="" className={styles['Store-img']} />;
                        }
                        if (external_game.category == '15') {
                          return <img key={uuidv4()} src={googleplay} alt="" className={styles['Store-img']} />;
                        }
                        if (external_game.category == '36') {
                          return <img key={uuidv4()} src={playstore} alt="" className={styles['Store-img']} />;
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles['game-review-info']}>
                <div className={styles['game-review-rating-container']}>
                  <div className={styles['game-rating-container']}>
                    <div className={styles['game-review-rating']}>
                      <div className={styles['rating-number-container']}>
                        <h1 className={styles['rating-number']}>{Math.round(GameDetailsReview[0].rating)}</h1>
                        {GameDetailsReview[0].rating > 89 ? <h1 className={styles['rating-txt']}>“Legendary”</h1> : <h1 className={styles['rating-txt']}>“Very Good”</h1>}
                      </div>
                      <h4 className={styles['rating-txt-2']}>Based on {GameDetailsReview[0].rating_count} reviews on IGDB</h4>
                    </div>
                    <div className={styles['game-review-separator']}></div>
                    <div className={styles['game-review-rating']}>
                      <div className={styles['rating-number-container']}>
                        <h1 className={styles['rating-number']}>{Math.round(GameDetailsReview[0].total_rating)}</h1>
                        {GameDetailsReview[0].total_rating >= 89 ? <h1 className={styles['rating-txt']}>“Legendary”</h1> : <h1 className={styles['rating-txt']}>“Very Good”</h1>}
                      </div>
                      <h4 className={styles['rating-txt-2']}>Based on {GameDetailsReview[0].total_rating_count} external reviews</h4>
                    </div>
                  </div>
                </div>
                <div className={styles['game-extra-info']}>
                  <h1 className={styles['game-review-extra-title']}>Extra Content</h1>
                  <div className={styles['game-extra-media-container']}>
                    <div className={styles['game-extra-video-container']}>
                      {GameDetailsReview[0].videos && GameDetailsReview[0].videos.map(videos => (
                        UID = uuidv4(),
                        <div key={UID} className={styles['game-video-container']}>
                          {/*<iframe
                            title={videos.name}
                            className={styles['game-info-video']}
                            src={`https://www.youtube.com/embed/${videos.video_id}`}
                            allowFullScreen
                      ></iframe>*/}
                        </div>
                      ))}
                    </div>
                    <div className={styles['game-extra-image-container']}>
                      <h1 className={styles['game-extre-image-txt']}>Videos</h1>
                      {GameDetailsReview[0].screenshots && GameDetailsReview[0].screenshots.map(screenshots => (
                        UID = uuidv4(),
                        <div key={UID} className={styles['game-extre-images-cont']}>
                          {<img src={`https://images.igdb.com/igdb/image/upload/t_original/${screenshots.image_id}.webp`} alt="game-image" className={styles['game-extre-img']} />}
                        </div>
                      ))}
                    </div>
                    <div className={styles['game-extra-dlc-container']}>
                      {GameDetailsReview[0].dlcs && GameDetailsReview[0].dlcs.map(dlc => (
                        UID = uuidv4(),
                        <div key={UID} className={styles['game-dlc-container']}>
                          {<img src={`https://images.igdb.com/igdb/image/upload/t_original/${dlc.cover.image_id}.webp`} alt="game-image" className={styles['game-extre-img']} />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
