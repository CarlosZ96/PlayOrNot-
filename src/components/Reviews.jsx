import React, { useEffect, useState } from 'react';
import styles from '../stylesheets/reviews.module.css';
import LogIn from '../img/Muhamad Ulum.png';
import Search from '../img/search.png';
import { nanoid } from 'nanoid';

const Reviews = () => {
  const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';
  const body = `fields name,rating,rating_count,total_rating,total_rating,total_rating_count,screenshots.image_id,
  cover.image_id,videos.video_id,dlcs.name,dlcs.cover.image_id,external_games.url,external_games.category,
  first_release_date,release_dates.human,release_dates.date,genres.name,platforms.name;
  where id = 90101;`;
  const body2 = `fields name,first_release_date,total_rating,total_rating_count,cover.image_id;
  where total_rating_count >= 5 & category = 0 & first_release_date <= 1713070800 & first_release_date >= 1704085200; sort total_rating desc;
  limit 4;`;
  const headers = {
    'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
    'Authorization': 'Bearer yol7xd1r00hd58t8i081u1a2yzjcsm',
    'Content-Type': 'text/plain',
  };

  const [gameName, setGameName] = useState('');
  const [Game, setGame] = useState([]);

  const handleInputChange = (e) => {
    setGameName(e.target.value);
  };

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
              <h1 className={styles['search-game-title']}>Find a Game :</h1>
              <div className={styles['input-button-container']}>
                <input
                  type="text"
                  className={styles['input-game-review']}
                  placeholder="  Search.."
                  value={gameName}
                  onChange={handleInputChange}
                />
                <button className={styles['input-game-button']}><img src={Search} alt="" className='search' /></button>
              </div>
            </div>
          </div>
          <div className={styles['game-info-container']}>
            <div className={styles['game-info']}>
              <div className={styles['game-caratule']}>

              </div>
              <h1 className={styles['game-caregory']}></h1>
              <div className={styles['game-info-details']}>

              </div>
            </div>
            <div className={styles['game-review-info']}>
              <div className={styles['game-review-rating-container']}>
                <h1 className={styles['game-review-title']}></h1>
                <div className={styles['game-rating-container']}>
                  <div className={styles['game-review-rating']}>

                  </div>
                  <div className={styles['game-review-separator']}></div>
                  <div className={styles['game-review-rating']}>

                  </div>
                </div>
              </div>
              <div className={styles['game-extra-info']}>
                <h1 className={styles['game-review-extra-title']}></h1>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['last-reviewed-container']}>
        <h1 className={styles['last-reviewed-title']}>Last Reviewed</h1>
        {Game.map((gamef) => (
         <h1 key={nanoid} className={styles['last-reviewed-title']}>{gamef.name}</h1>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Reviews