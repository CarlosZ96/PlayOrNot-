import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReleases } from '../redux/Games/GameSlice';
import { nanoid } from 'nanoid';
import '../stylesheets/gamereleases.css';

function GameReleases() {
  const dispatch = useDispatch();
  const releases = useSelector((store) => store.games.releases);
  useEffect(() => {
    dispatch(getReleases());
  }, [dispatch]);

  return (
    <div className='releases-container'>
          <h1 className='releases-title'>Now available!</h1>
      <div className='releases'>
        {releases.map((release) => (
          <div key={nanoid()} className='release-card'>
            <div className='card-container'>
            <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${release.url}.png`} alt="" className='game-image' />
            </div>
            <h2 className='new'>NEW!</h2>
            <h2 className='new'>{release.date}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameReleases;
