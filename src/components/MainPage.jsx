import React from 'react';
import GameReleases from './GamesReleases.jsx';
import GamesTop from './GamesTop.jsx';
import PC from '../img/computer-mouse.png';
import ANDROID from '../img/mobile.png';
import SWITCH from '../img/console.png';
import PLAY from '../img/playstation.png';
import XBOX from '../img/buttons.png';

function MainPage() {
  return (
  <body>
   <section className='releases-top'>
   <GameReleases />
   <div className="Ranking">
   <GamesTop />
   </div>
   </section> 
   <div className="Consoles">
    <div className='platform'>
    <img src={PC} alt="" />
    </div>
    <div className='platform'>
    <img src={ANDROID} alt="" />    
    </div>
    <div className='platform'>
    <img src={SWITCH} alt="" />   
    </div>
    <div className='platform'>
    <img src={PLAY} alt="" />   
    </div>
    <div className='platform'>
    <img src={XBOX} alt="" />   
    </div>
   </div>
  </body>
  );
}

export default MainPage;
