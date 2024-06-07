import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import styles from '../../../stylesheets/reviews.module.css';

const Image = ({ game, handleMoveRight, handleMoveLeft, selectedCard, ImgTotalLenght }) => {
  const nodecla = useRef();
  const nodecla2 = useRef();
  const nodecla3 = useRef();
  const Screenshotsref = useRef();
  const videosref = useRef();
  const dlcref = useRef();

  const showMediaSection = (section, ref) => {
    const container = nodecla.current;
    const container2 = nodecla2.current;
    const container3 = nodecla3.current;
    const screenCont = Screenshotsref.current;
    const vidCont = videosref.current;
    const dlCont = dlcref.current;

    const text = ref.current.innerText;
    if (text === 'Screenshots') {
      screenCont.classList.remove(styles['unselected']);
      screenCont.classList.add(styles['selected']);
      vidCont.classList.remove(styles['selected']);
      vidCont.classList.add(styles['unselected']);
      dlCont.classList.remove(styles['selected']);
      dlCont.classList.add(styles['unselected']);
    } else if (text === 'Videos') {
      vidCont.classList.add(styles.selected);
      vidCont.classList.remove(styles.unselected);
      screenCont.classList.remove(styles.selected);
      screenCont.classList.add(styles.unselected);
      dlCont.classList.remove(styles.selected);
      dlCont.classList.add(styles.unselected);
    } else if (text === 'DLC') {
      dlCont.classList.add(styles.selected);
      dlCont.classList.remove(styles.unselected);
      screenCont.classList.remove(styles.selected);
      screenCont.classList.add(styles.unselected);
      vidCont.classList.remove(styles.selected);
      vidCont.classList.add(styles.unselected);
    }

    if (section === 'screenshots') {
      container.classList.remove(styles.hide);
      container.classList.add(styles['game-image-container']);
      container2.classList.remove(styles['game-extra-videos-container']);
      container2.classList.add(styles.hide);
      container3.classList.remove(styles['game-dlcs-container']);
      container3.classList.add(styles.hide);
    } else if (section === 'videos') {
      container2.classList.remove(styles.hide);
      container2.classList.add(styles['game-extra-videos-container']);
      container.classList.remove(styles['game-image-container']);
      container.classList.add(styles.hide);
      container3.classList.remove(styles['game-dlcs-container']);
      container3.classList.add(styles.hide);
    } else if (section === 'dlc') {
      container3.classList.remove(styles.hide);
      container3.classList.add(styles['game-dlcs-container']);
      container.classList.remove(styles['game-image-container']);
      container.classList.add(styles.hide);
      container2.classList.remove(styles['game-extra-videos-container']);
      container2.classList.add(styles.hide);
    }
  }

  return (
    <div className={styles['game-extra-image-container']}>
      <div className={styles['game-extra-content-txt-container']}>
        <div onClick={() => { showMediaSection('screenshots', Screenshotsref); }} ref={Screenshotsref} className={styles['selected']}>Screenshots</div>
        <div onClick={() => { showMediaSection('videos', videosref); }} ref={videosref} className={styles['unselected']}>Videos</div>
        <div onClick={() => { showMediaSection('dlc', dlcref); }} ref={dlcref} className={styles['unselected']}>DLC</div>
      </div>
      <div ref={nodecla} className={styles['game-image-container']}>
        {game[0].screenshots && game[0].screenshots.map((screenshots, index) => {
          const UID = uuidv4();
          const distanceToLeft = (selectedCard - index + ImgTotalLenght) % ImgTotalLenght;
          const distanceToRight = (index - selectedCard + ImgTotalLenght) % ImgTotalLenght;
          let cardClassName = '';

          if (distanceToLeft === 0) cardClassName += 'centered';
          else if (distanceToLeft === 1) cardClassName += 'hide';
          else if (distanceToRight === 1) cardClassName += 'hide';
          else if (distanceToLeft >= 2 || distanceToRight >= 2) cardClassName += 'hide';

          return (
            <div className={styles['Gameboy-Advance']} key={UID}>
              <div className={`${styles[cardClassName]}`}>
                <img src={`https://images.igdb.com/igdb/image/upload/t_original/${screenshots.image_id}.webp`} alt="game-image" className={styles['game-extre-img']} />
              </div>
            </div>
          );
        })}
        <div className={styles['gameboy-name']}>{game[0].name}</div>
        <button className={styles['game-extra-screenshots-button-r']} onClick={handleMoveRight}></button>
        <button className={styles['game-extra-screenshots-button-l']} onClick={handleMoveLeft}></button>
      </div>
      <div ref={nodecla2} className={styles.hide}>
        {game[0].videos && game[0].videos.map((video, index) => {
          const UID = uuidv4();
          const distanceToLeft = (selectedCard - index + ImgTotalLenght) % ImgTotalLenght;
          const distanceToRight = (index - selectedCard + ImgTotalLenght) % ImgTotalLenght;
          let cardClassName = '';

          if (distanceToLeft === 0) cardClassName += 'centered';
          else if (distanceToLeft === 1) cardClassName += 'hide';
          else if (distanceToRight === 1) cardClassName += 'hide';
          else if (distanceToLeft >= 2 || distanceToRight >= 2) cardClassName += 'hide';

          return (
            <div key={UID} className={`${styles[cardClassName]}`}>
              <iframe
                title={`game-video-${index}`}
                src={`https://www.youtube.com/embed/${video.video_id}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles['game-extre-img']}
              ></iframe>
            </div>
          );
        })}
        <div className={styles['gameboy-name']}>{game[0].name}</div>
        <button className={styles['game-extra-screenshots-button-r']} onClick={handleMoveRight}></button>
        <button className={styles['game-extra-screenshots-button-l']} onClick={handleMoveLeft}></button>
      </div>
      <div ref={nodecla3} className={styles.hide}>
          {game[0].dlcs && game[0].dlcs.map((dlc) => {
            const UID = uuidv4();
            return (
              <div key={UID} className={styles['game-dlc-container']}>
                {dlc.cover && <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${dlc.cover.image_id}.png`} alt="" className={styles['gamef-image']} />}
                <div className={styles['game-dlc-info-container']}>
                  <p>{dlc.name}</p>
                  <p>{dlc.release_dates[0].human}</p>
                </div>
              </div>);
          })}

        <div className={styles['gameboy-name']}>{game[0].name}</div>
        <button className={styles['game-extra-screenshots-button-r']} onClick={handleMoveRight}></button>
        <button className={styles['game-extra-screenshots-button-l']} onClick={handleMoveLeft}></button>
      </div>
    </div>
  );
};

Image.propTypes = {
  handleMoveRight: PropTypes.func.isRequired,
  handleMoveLeft: PropTypes.func.isRequired,
  game: PropTypes.array.isRequired,
  selectedCard: PropTypes.number.isRequired,
  ImgTotalLenght: PropTypes.number.isRequired,
};

export default Image;
