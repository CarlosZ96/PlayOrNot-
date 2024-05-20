import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import styles from '../../../stylesheets/reviews.module.css';

const Image = ({ dynamiClass, reference, reference2, game, handleMoveRight, handleMoveLeft, selectedCard, ImgTotalLenght }) => {
  return (
    <div className={styles['game-extra-image-container']}>
      <div ref={reference} className={styles['game-extra-image-container']}>
        {game[0].screenshots && game[0].screenshots.map((screenshots, index) => {
          const UID = uuidv4();
          const distanceToLeft = (selectedCard - index + ImgTotalLenght) % ImgTotalLenght;
          const distanceToRight = (index - selectedCard + ImgTotalLenght) % ImgTotalLenght;
          let cardClassName = '';

          if (distanceToLeft === 0) cardClassName += 'centered';
          else if (distanceToLeft === 1) cardClassName += 'left';
          else if (distanceToRight === 1) cardClassName += 'right';
          else if (distanceToLeft >= 2 || distanceToRight >= 2) cardClassName += 'hide';

          return (
            <div key={UID} className={`${styles[cardClassName]} ${cardClassName}`}>
              <img src={`https://images.igdb.com/igdb/image/upload/t_original/${screenshots.image_id}.webp`} alt="game-image" className={styles['game-extre-img']} />
            </div>
          );
        })}
        <button className={styles['game-extra-screenshots-button-r']} onClick={handleMoveRight}></button>
        <button className={styles['game-extra-screenshots-button-l']} onClick={handleMoveLeft}></button>
      </div>
    </div>
  )
}

Image.propTypes = {
  dynamiClass: PropTypes.func.isRequired,
  handleMoveRight: PropTypes.func.isRequired,
  handleMoveLeft: PropTypes.func.isRequired,
  reference: PropTypes.object.isRequired,
  reference2: PropTypes.object.isRequired,
  game: PropTypes.array.isRequired,
  selectedCard: PropTypes.number.isRequired,
  ImgTotalLenght: PropTypes.number.isRequired,
};

export default Image;
