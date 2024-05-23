import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../stylesheets/reviews.module.css';

const MediaButtons = ({ dinamicClass, showMediaSection }) => {
  const screenshotsRef = useRef();
  const videosRef = useRef();
  const dlcRef = useRef();

  const handleMediaSectionToggle = (ref) => {
    const container = ref.current;
    if (container) {
      if (!container.classList.contains(styles['selected'])) {
        screenshotsRef.current.classList.remove(styles['selected']);
        videosRef.current.classList.remove(styles['selected']);
        dlcRef.current.classList.remove(styles['selected']);
        screenshotsRef.current.classList.add(styles['unselected']);
        videosRef.current.classList.add(styles['unselected']);
        dlcRef.current.classList.add(styles['unselected']);
        container.classList.remove(styles['unselected']);
        container.classList.add(styles['selected']);
        dinamicClass();
      }
    }
  };

  return (
    <div className={styles['game-extra-content-txt-container']}>
      <div onClick={() => { handleMediaSectionToggle(screenshotsRef); showMediaSection('screenshots'); }} ref={screenshotsRef} className={styles['selected']}>Screenshots</div>
      <div onClick={() => { handleMediaSectionToggle(videosRef); showMediaSection('videos'); }} ref={videosRef} className={styles['unselected']}>Videos</div>
      <div onClick={() => { handleMediaSectionToggle(dlcRef); showMediaSection('dlc'); }} ref={dlcRef} className={styles['unselected']}>DLC</div>
    </div>
  )
}

MediaButtons.propTypes = {
  dinamicClass: PropTypes.func.isRequired,
  showMediaSection: PropTypes.func.isRequired,
};

export default MediaButtons;
