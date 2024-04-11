import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReleases } from '../redux/Games/GameSlice';
import { nanoid } from 'nanoid';
import '../stylesheets/gamereleases.css';
import left from '../img/Left.png';
import right from '../img/right.png';

function GameReleases() {
  const [selectedCard, setSelectedCard] = useState(2);
  const [selectedIndex, setSelectedIndex] = useState(2);

  const handleMoveLeft = () => {
    setSelectedCard((prev) => (prev === 0 ? 4 : prev - 1));
    setSelectedIndex((index) => (index === 0 ? 4 : index - 1));
  };

  const handleMoveRight = () => {
    setSelectedCard((prev) => (prev === 4 ? 0 : prev + 1));
    setSelectedIndex((index) => (index === 4 ? 0 : index + 1));
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
        {releases.map((release, index) => (
          <div key={release.id} className={`release-card ${index === selectedCard ? 'main' : 'side' && index === 1 || index == 3? 'side2': 'side'}`}>
            <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${release.cover}.png`} alt="" className='game-image' />
            <h2 className='new'>NEW!</h2>
          </div>
        ))}
      </div>
      <div className='button-container'>
        <button className='side-button' onClick={handleMoveLeft}><img src={left} alt="left" className='button-img' /></button>
        <button className='side-button' onClick={handleMoveRight}><img src={right} alt="right" className='button-img' /></button>
      </div>
    </div>
  );
}

export default GameReleases;
