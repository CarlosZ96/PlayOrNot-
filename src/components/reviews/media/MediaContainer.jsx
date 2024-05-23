import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../stylesheets/reviews.module.css';
import ImageCont from '../../reviews/media/Image';

const MediaContainer = ({ agame }) => {

  const ImgTotalLenght = agame && agame[0] && agame[0].screenshots
    ? (agame[0].screenshots.length - 1) : 0;

  const ImghalfLenght = agame && agame[0] && agame[0].screenshots
    ? Math.floor(ImgTotalLenght / 2) : 0;

  const [selectedCard, setSelectedCard] = useState(ImghalfLenght);

  const handleMoveLeft = () => {
    setSelectedCard((prev) => (prev === 0 ? ImgTotalLenght : prev - 1));
  };

  const handleMoveRight = () => {
    setSelectedCard((prev) => (prev === ImgTotalLenght ? 0 : prev + 1));
  };


  return (
    <div className={styles['game-extra-info']}>
      <div className={styles['game-extra-media-container']}>
        <ImageCont game={agame} selectedCard={selectedCard}
          ImgTotalLenght={ImgTotalLenght} handleMoveRight={handleMoveRight} handleMoveLeft={handleMoveLeft}/>
      </div>
    </div>
  )
}

MediaContainer.propTypes = {
  agame: PropTypes.array.isRequired,
};

export default MediaContainer;
