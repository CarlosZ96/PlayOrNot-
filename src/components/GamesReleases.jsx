import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReleases } from '../redux/Games/GameSlice';

function GameReleases() {
  const dispatch = useDispatch();
  const releases = useSelector(state => state.games.releases);
  const status = useSelector(state => state.games.status);
  const error = useSelector(state => state.games.error);

  useEffect(() => {
    dispatch(getReleases());
  }, [dispatch]);

  useEffect(() => {
    if (status === 'failed') {
      console.error("Error fetching releases:", error);
    }
  }, [status, error]);

  useEffect(() => {
    if (status === 'succeeded') {
      console.log("Releases:", releases);
    }
  }, [status, releases]);

  return (
    <div>
      Test
    </div>
  );
}

export default GameReleases;
