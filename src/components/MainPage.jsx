import React from 'react';
import GameReleases from './GamesReleases.jsx';
import GamesTop from './GamesTop.jsx';
import PC from '../img/computer-mouse.png';
import ANDROID from '../img/mobile.png';
import SWITCH from '../img/console.png';
import PLAY from '../img/playstation.png';
import XBOX from '../img/buttons.png';
import '../stylesheets/mainpage.css';

function MainPage() {
  return (
  <body className='mid'>
   <section className='releases-top'>
   <GameReleases />
   <div className="Ranking">
   <GamesTop />
   </div>
   </section> 
   <div className="Consoles">
    <div className='platform'>
    <img src={PC} alt="" className='platform-img'/>
    </div>
    <div className='platform'>
    <img src={ANDROID} alt="" className='platform-img'/>    
    </div>
    <div className='platform'>
    <img src={SWITCH} alt="" className='platform-img'/>   
    </div>
    <div className='platform'>
    <img src={PLAY} alt="" className='platform-img'/>   
    </div>
    <div className='platform'>
    <img src={XBOX} alt="" className='platform-img' />   
    </div>
   </div>
  </body>
  );
}

export default MainPage;
