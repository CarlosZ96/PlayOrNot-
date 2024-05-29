import React from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/rankings/top10.css';

const Top10 = ({ games }) => {

  const getBackgroundColor = (rating) => {
    return rating >= 90 && rating <= 100 ? 'blueviolet' :
           rating >= 86 && rating <= 89 ? '#33F051' :
           rating >= 80 && rating <= 85 ? '#33F0C3' :
           rating >= 0 && rating < 80 ? '#337FF0' :
           '';
  };

  return (
    <div className='years-rankings-games-container'>
      {games.map((game) => (
        <div key={game.id} className='Ranking-game-container'>
          {game.cover && <img src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.png`} alt="" className='rankings-image' />}
          <div className='Rankings-game-info-container'>
            <h1 className='Rankings-game-title'>{game.name}</h1>
            <div className='Rankings-game-info-details-container'>
              {game.platforms && game.platforms.map((platform, index) => {
                if (platform.name !== 'Linux' && platform.name !== 'Mac' && platform.name !== 'iOS' && platform.name !== 'Windows Phone') {
                  return (
                    <React.Fragment key={index}>
                      {platform.name}
                      {index !== game.platforms.length - 1 && ', '}
                      {index === game.platforms.length - 1 && '. '}
                    </React.Fragment>
                  );
                }
                return null;
              })}
              <p className='ratings-name-txt'>Based on {game.total_rating_count} Critics.</p>
              <p className='ratings-name-txt'>{game.release_dates[0].human}.</p>
            </div>
          </div>
          <h1 style={{ width: `${Math.round(game.total_rating)}`, backgroundColor: getBackgroundColor(Math.round(game.total_rating)) }} className='Rankings-game-rating'>{Math.round(game.total_rating)}</h1>
        </div>
      ))}
    </div>
  )
}

Top10.propTypes = {
  games: PropTypes.array.isRequired,
};

export default Top10;
