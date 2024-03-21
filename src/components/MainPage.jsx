import React from 'react';
import GameReleases from './GamesReleases.jsx';
import GamesTop from './GamesTop.jsx';

function MainPage() {
  return (
  <body>
   <div className="Releases">
   <GameReleases />
   </div>
   <div className="Ranking">
   <GamesTop />
   </div>
   <div className="Consoles">
   </div>
  </body>
  );
}

export default MainPage;
