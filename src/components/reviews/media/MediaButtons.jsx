import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../stylesheets/reviews.module.css';

const MediaButtons = ({ showMediaSection }) => {


  const handleMediaSectionToggle = (section) => {
    const screenshotsRef = useRef();
    const videosRef = useRef();
    const dlcRef = useRef();
    if (section === 'selected') {
      container.classList.remove(styles.hide);
    } 
  };

  return (
    <div className={styles['game-extra-content-txt-container']}>
      <div onClick={() => { showMediaSection('screenshots'); handleMediaSectionToggle(handleMediaSectionToggle); }} ref={screenshotsRef} className={styles['selected']}>Screenshots</div>
      <div onClick={() => { showMediaSection('videos'); handleMediaSectionToggle(handleMediaSectionToggle); }} ref={videosRef} className={styles['unselected']}>Videos</div>
      <div onClick={() => { showMediaSection('dlc'); handleMediaSectionToggle(handleMediaSectionToggle); }} ref={dlcRef} className={styles['unselected']}>DLC</div>
    </div>
  );
};

MediaButtons.propTypes = {
  showMediaSection: PropTypes.func.isRequired,
};

export default MediaButtons;
