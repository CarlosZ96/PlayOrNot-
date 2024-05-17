import React from 'react'

const Image = () => {
  return (
    <div>
      <div onClick={showMediaSection} ref={nodecla2} className={styles['hide']}>Screenshots</div>
      <div ref={nodecla} className={styles['hide']}>
        {GameDetailsReview[0].screenshots && GameDetailsReview[0].screenshots.map((screenshots, index) => {
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
        <button className={styles['game-extra-screenshots-button-r']} onClick={() => { handleMoveRight(); }}></button>
        <button className={styles['game-extra-screenshots-button-l']} onClick={() => { handleMoveLeft(); }}></button>
      </div>
    </div>
  )
}

export default Image