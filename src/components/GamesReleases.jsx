import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReleases } from '../redux/Games/GameSlice';
import { nanoid } from 'nanoid';
import '../stylesheets/gamereleases.css';
import left from '../img/Left.png';
import right from '../img/right.png';

function GameReleases() {
  const [selectedCard, setSelectedCard] = useState(2);
  const [date, setdate] = useState('');

  const handleMoveLeft = () => {
    setSelectedCard((prev) => (prev === 0 ? 4 : prev - 1));
  };

  const handleMoveRight = () => {
    setSelectedCard((prev) => (prev === 4 ? 0 : prev + 1));
  };

  const dispatch = useDispatch();
  const releases = useSelector((store) => store.games.releases);

  useEffect(() => {
    dispatch(getReleases());
  }, [dispatch]);

  return (
    <div className='releases-container'>
      <h1 className='releases-title'>Now available!</h1>
      <div className='releases'>
        {releases.map((release, index) => {
          const distanceToLeft = (selectedCard - index + 5) % 5;
          const distanceToRight = (index - selectedCard + 5) % 5;
          let cardClassName = 'release-card';

          if (distanceToLeft === 0) cardClassName += ' centered';
          else if (distanceToLeft === 1) cardClassName += ' left';
          else if (distanceToRight === 1) cardClassName += ' right';
          else if (distanceToLeft === 2) cardClassName += ' left-small';
          else if (distanceToRight === 2) cardClassName += ' right-small';

          return (
            <div key={release.id} className={cardClassName}>
              <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${release.cover}.png`} alt="" className='game-image' />
              <h2 className='new'>Platforms</h2>
              <div className='platforms'>
                {release.platforms.map((platform) => (
                  <img key={platform.id} src={require(`../img/${ platform.id}.png`)} className='platforms-img' />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className='button-container'>
        <button className='side-button' onClick={handleMoveLeft}>
          <img src={left} alt="left" className='button-img' />
        </button>
        {date}
        <button className='side-button' onClick={handleMoveRight}>
          <img src={right} alt="right" className='button-img' />
        </button>
      </div>
    </div>
  );
}

export default GameReleases;
