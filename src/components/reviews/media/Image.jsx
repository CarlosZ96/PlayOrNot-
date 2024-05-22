import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import styles from '../../../stylesheets/reviews.module.css';
import MediaButtons from './../media/MediaButtons';

const Image = ({ reference, game, handleMoveRight, handleMoveLeft, selectedCard, ImgTotalLenght }) => {
  const nodecla = useRef();
  const nodecla2 = useRef();
  const showMediaSection = () => {
    const container = nodecla.current;
    const container2 = nodecla2.current;
    

    if (container.classList.contains(styles['game-extra-image-container'])) {
      container.classList.remove(styles['game-extra-image-container']);
      container.classList.add(styles['hide']);
    } else {
      container.classList.remove(styles['hide']);
      container.classList.add(styles['game-extra-image-container']);
    }
  

    if (container2.classList.contains(styles['game-extra-image-container'])) {
      container2.classList.remove(styles['game-extra-image-container']);
      container2.classList.add(styles['hide']);
    } else {
      container2.classList.remove(styles['hide']);
      container2.classList.add(styles['game-extra-image-container']);
    }
  }

  return (
    <div className={styles['game-extra-image-container']} ref={nodecla}>
      <MediaButtons dinamicClass={showMediaSection} />
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
            <div key={UID} className={`${styles[cardClassName]}`}>
              <img src={`https://images.igdb.com/igdb/image/upload/t_original/${screenshots.image_id}.webp`} alt="game-image" className={styles['game-extre-img']} />
            </div>
          );
        })}
        <button className={styles['game-extra-screenshots-button-r']} onClick={handleMoveRight}></button>
        <button className={styles['game-extra-screenshots-button-l']} onClick={handleMoveLeft}></button>
      </div>
      <div ref={nodecla2} className={styles['hide']}>
        {game[0].videos && game[0].videos.map((screenshots, index) => {
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
  reference: PropTypes.object.isRequired,
  handleMoveRight: PropTypes.func.isRequired,
  handleMoveLeft: PropTypes.func.isRequired,
  game: PropTypes.array.isRequired,
  selectedCard: PropTypes.number.isRequired,
  ImgTotalLenght: PropTypes.number.isRequired,
};

export default Image;
