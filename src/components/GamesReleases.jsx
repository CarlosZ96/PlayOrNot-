import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReleases } from '../redux/Games/GameSlice';
import { nanoid } from 'nanoid';
import '../stylesheets/gamereleases.css';

function GameReleases()  {
  const dispatch = useDispatch();
  const releases = useSelector((store) => store.games.releases);
  useEffect(() => {
    dispatch(getReleases());
  }, [dispatch]);
  
  return (
    <div className='releases'>
      {releases.map((release) => (
        <div key={nanoid()} className='release-card'>
          <h2>{release.name}</h2>
          <h4>{release.date}</h4>
          <img src={release.url} alt="" />
        </div>
      ))}
    </div>
  );
}

export default GameReleases;
