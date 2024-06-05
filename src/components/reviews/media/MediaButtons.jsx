import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../stylesheets/reviews.module.css';

const MediaButtons = ({ showMediaSection }) => {
  const screenshotsRef = useRef();
  const videosRef = useRef();
  const dlcRef = useRef();

  const handleMediaSectionToggle = (ref) => {
    const container = ref.current;
    if (container) {
      const buttons = [screenshotsRef, videosRef, dlcRef];
      buttons.forEach((btnRef) => {
        if (btnRef.current !== ref.current) {
          btnRef.current.classList.remove(styles['selected']);
          btnRef.current.classList.add(styles['unselected']);
        }
      });
      container.classList.remove(styles['unselected']);
      container.classList.add(styles['selected']);
    }
  };

  return (
    <div className={styles['game-extra-content-txt-container']}>
      <div onClick={() => { showMediaSection('screenshots'); handleMediaSectionToggle(screenshotsRef); }} ref={screenshotsRef} className={styles['selected']}>Screenshots</div>
      <div onClick={() => { showMediaSection('videos'); handleMediaSectionToggle(videosRef); }} ref={videosRef} className={styles['unselected']}>Videos</div>
      <div onClick={() => { showMediaSection('dlc'); handleMediaSectionToggle(dlcRef); }} ref={dlcRef} className={styles['unselected']}>DLC</div>
    </div>
  );
};

MediaButtons.propTypes = {
  showMediaSection: PropTypes.func.isRequired,
};

export default MediaButtons;
