import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReleases } from '../redux/Games/GameSlice';

function GameReleases() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReleases());
  }, [dispatch]);
  
  return (
    <div>
      Test
    </div>
  );
}

export default GameReleases;
