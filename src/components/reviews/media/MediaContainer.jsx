import React from 'react';
import ReactPlayer from 'react-player';
import styles from '../../../stylesheets/reviews.module.css';
import { v4 as uuidv4 } from 'uuid';

const MediaContainer = () => {
  return (
    <div className={styles['game-extra-info']}>
      <div className={styles['game-extra-media-container']}>
        <div className={styles['game-extra-dlc-container']}>
          {GameDetailsReview && GameDetailsReview[0] && GameDetailsReview[0].dlcs && GameDetailsReview[0].dlcs.length > 0 && (
            <div className={styles['game-dlc-container']}>
              {GameDetailsReview[0].dlcs[0].screenshots && GameDetailsReview[0].dlcs[0].screenshots[0] && (
                <div className={styles['game-extre-dlc-img-container']} style={{ backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_original/${GameDetailsReview[0].dlcs[0].screenshots[0].image_id}.webp)` }}>
                </div>
              )}
            </div>
          )}
          DLC
        </div>
      </div>
    </div>
  )
}

export default MediaContainer