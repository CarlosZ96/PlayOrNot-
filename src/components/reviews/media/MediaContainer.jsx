import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../stylesheets/reviews.module.css';
import ImageCont from '../../reviews/media/Image';
import { v4 as uuidv4 } from 'uuid';

const MediaContainer = ({ agame }) => {
  const nodecla = useRef();
  const nodecla2 = useRef();

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

  const showMediaSection = () => {
    const container = nodecla.current;
    const container2 = nodecla2.current;
    if (container.classList.contains(styles['game-extra-image-container'])) {
      container.classList.remove(styles['game-extra-image-container']);
      container.classList.add(styles['hide']);
      container2.classList.add(styles['hidden']);
      container2.classList.remove(styles['hide']);
    } else {
      container.classList.remove(styles['hide']);
      container2.classList.remove(styles['hidden']);
      container.classList.add(styles['game-extra-image-container']);
      container2.classList.add(styles['hide']);
    }
  }

  return (
    <div className={styles['game-extra-info']}>
      <div className={styles['game-extra-media-container']}>
        <ImageCont dynamiClass={showMediaSection} game={agame} selectedCard={selectedCard}
          ImgTotalLenght={ImgTotalLenght} handleMoveRight={handleMoveRight} handleMoveLeft={handleMoveLeft}
          reference={nodecla} reference2={nodecla2}/>
      </div>
    </div>
  )
}

MediaContainer.propTypes = {
  agame: PropTypes.array.isRequired,
};

export default MediaContainer;
