import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../stylesheets/reviews.module.css';

const MediaButtons = ({ dinamicClass }) => {
  const screenshotsRef = useRef();
  const videosRef = useRef();
  const dlcRef = useRef();

  const handleMediaSectionToggle = (ref) => {
    const container = ref.current;
    if (container) {
      if (container.classList.contains(styles['Screenshots-button'])) {
        container.classList.remove(styles['Screenshots-button']);
        container.classList.add(styles['Screenshots-buttonh']);
      } else {
        container.classList.remove(styles['Screenshots-buttonh']);
        container.classList.add(styles['Screenshots-button']);
      }
    }
  }

  return (
    <div className={styles['game-extra-content-txt-container']}>
      <div onClick={() => { handleMediaSectionToggle(screenshotsRef); dinamicClass(); }} ref={screenshotsRef} className={styles['Screenshots-button']}>Screenshots</div>
      <div onClick={() => { handleMediaSectionToggle(videosRef); dinamicClass(); }} ref={videosRef} className={styles['Videos-button']}>Videos</div>
      <div onClick={() => { handleMediaSectionToggle(dlcRef); dinamicClass(); }} ref={dlcRef} className={styles['DLC-button']}>DLC</div>
    </div>
  )
}

MediaButtons.propTypes = {
  dinamicClass: PropTypes.func.isRequired,
};

export default MediaButtons;
