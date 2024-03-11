import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReleases} from '../redux/Games/GameSlice';


function GameReleases() {
  const releases = useSelector(state => state.games.releases);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReleases()); // Despacha la acción para obtener los lanzamientos
  }, [dispatch]);

  console.log(releases);
  return (
    <div>
     Hola
    </div>
  );
}

export default GameReleases;
