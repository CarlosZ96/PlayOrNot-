import React from 'react'
import PropTypes from 'prop-types';
import Steam from './../../img/Stores/steam.png';
import gog from './../../img/Stores/gog.png';
import xboxs from './../../img/Stores/xbox_store.jpg';
import epic from './../../img/Stores/Epic_Games.png';
import amazon from './../../img/Stores/amazon_pocike.png';
import microsoft from './../../img/Stores/microsoft.png';
import googleplay from './../../img/Stores/google-play.png';
import playstore from './../../img/Stores/psstore-shoppingbag.png';
import styles from '../../stylesheets/reviews.module.css';
import { v4 as uuidv4 } from 'uuid';

const GameInfo = ({ game }) => {
  console.log(game);
  return (
    <div className={styles['game-info-details']}>
      <div className={styles['game-genres-container']}>
        <h2 className={styles['game-info-title']}>Genres:</h2>
        <p className={styles['game-info-txt-p']}>
          {game[0].genres && game[0].genres.map((genre, index) => (
            <React.Fragment key={index}>
              {genre.name}
              {index !== game[0].genres.length - 1 && ', '}
              {index === game[0].genres.length - 1 && '. '}
            </React.Fragment>
          ))}
        </p>
      </div>
      <div className={styles['release-data-container']}>
        <h2 className={styles['game-info-tittle']}>Release Data:</h2>
        <h3 className={styles['game-info-txt']}>{game[0].release_dates[0].human ?
          game[0].release_dates[0].human : 'N/A'}.</h3>
      </div>
      <div className={styles['Plarforms-container']}>
        <h2 className={styles['game-info-tittle']}>Plarforms:</h2>
        <p className={styles['game-info-txt']} key={uuidv4()}>
          {game[0].platforms && game[0].platforms.map((platform, index) => {
            if (platform.name !== 'Linux' && platform.name !== 'Mac' && platform.name !== 'iOS'
              && platform.name !== 'Windows Phone'
            ) {
              return (
                <React.Fragment key={index}>
                  {platform.name}
                  {index !== game[0].platforms.length - 1 && ', '}
                  {index === game[0].platforms.length - 1 && '. '}
                </React.Fragment>
              );
            }
            return null;
          })}
        </p>
      </div>
      <div className={styles['Stores-container']}>
        <h2 className={styles['game-info-tittle']}>Available in:</h2>
        <div className={styles['game-info-stores']}>
          {game[0].external_games && game[0].external_games.map(ext => {
            if (ext.category == '1') {
              return <img key={uuidv4()} src={Steam} alt="" className={styles['Store-img']} />;
            }
            if (ext.category == '5') {
              return <img key={uuidv4()} src={gog} alt="" className={styles['Store-img']} />;
            }
            if (ext.category == '31') {
              return <img key={uuidv4()} src={xboxs} alt="" className={styles['Store-img']} />;
            }
            if (ext.category == '26') {
              return <img key={uuidv4()} src={epic} alt="" className={styles['Store-img']} />;
            }
            if (ext.category == '20') {
              return <img key={uuidv4()} src={amazon} alt="" className={styles['Store-img']} />;
            }
            if (ext.category == '11') {
              return <img key={uuidv4()} src={microsoft} alt="" className={styles['Store-img']} />;
            }
            if (ext.category == '15') {
              return <img key={uuidv4()} src={googleplay} alt="" className={styles['Store-img']} />;
            }
            if (ext.category == '36') {
              return <img key={uuidv4()} src={playstore} alt="" className={styles['Store-img']} />;
            }
          })}
        </div>
      </div>
    </div>
  )
}

GameInfo.propTypes = {
  game: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GameInfo;
