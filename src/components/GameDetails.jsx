import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/gamedetails.css';

export const GameDetails = ({ findgameName }) => {
  const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';
  const body = `fields name,genres.name,cover.image_id,total_rating,total_rating_count,
  release_dates.human,artworks.image_id; 
  where name ~ *"${findgameName}"* & category=0; sort total_rating_count desc; limit 1;`;
  const headers = {
    'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
    'Authorization': 'Bearer yol7xd1r00hd58t8i081u1a2yzjcsm',
    'Content-Type': 'text/plain',
  };

  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: body
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const gameData = data.map(game => ({
          ...game,
          total_rating: Math.round(game.total_rating),
          millisecondsDate: game.first_release_date,
          name: game.name,
          platforms: game.platforms,
          cover: game.cover.image_id,
          release_datesa: game.release_dates,
          background: game.artworks[0].image_id,
          genres: game.genres,
          date: null
        }));
        gameData.forEach(game => {
          game.release_datesa.forEach(date => {
            if (game.millisecondsDate === date.date) {
              game.date = date.human;
            }
          });
        });
        setGames(gameData);
        console.log(gameData);
      })
      .catch(error => {
        console.error('There was a problem with fetch operation:', error);
      });

  }, []);

  const backgroundImage = games.length > 0 ? {
    backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_original/${games[0].background}.webp)`,
  } : null;

  return (
    <div style={backgroundImage} className='game-details-containerd'>
      <div className='game-details-containerd-blur'>
        <div className='game-container'>
          {games.map(game => (
            <div key={game.id}>
              <h2>{game.name}</h2>
              <p>Total Rating: {game.total_rating}</p>
              <p>Date: {game.date}</p>
              <h2>Genres:</h2>
              {game.genres.map(genre => (
                <h3 key={genre.id}>{genre.name}</h3>
              ))}
              <h2>Related Companies:</h2>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

GameDetails.propTypes = {
  findgameName: PropTypes.string.isRequired,
}

export default GameDetails;
