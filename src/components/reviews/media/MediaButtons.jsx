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
      const isActive = container.classList.contains('selected');
      if (!isActive) {
        container.classList.add('selected');
        container.classList.remove('unselected');
      } else {
        container.classList.add('unselected');
        container.classList.remove('selected');
      }
    }
  };

  return (
    <div className={styles['game-extra-content-txt-container']}>
      <div onClick={() => { handleMediaSectionToggle(screenshotsRef); dinamicClass(); }} ref={screenshotsRef} className={styles['selected']}>Screenshots</div>
      <div onClick={() => { handleMediaSectionToggle(videosRef); dinamicClass(); }} ref={videosRef} className={styles['unselected']}>Videos</div>
      <div onClick={() => { handleMediaSectionToggle(dlcRef); dinamicClass(); }} ref={dlcRef} className={styles['unselected']}>DLC</div>
    </div>
  )
}

MediaButtons.propTypes = {
  dinamicClass: PropTypes.func.isRequired,
};

export default MediaButtons;
