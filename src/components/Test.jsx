import React, { useState } from 'react';
import '../stylesheets/test.css';
import zelda from '../img/zelda.png';
import cup from '../img/cup.png';
import age from '../img/age.png';
import gears from '../img/gears.png';
import star from '../img/star.png';
import left from '../img/Left.png';
import right from '../img/right.png';

export const Test = () => {
  const [selectedCard, setSelectedCard] = useState(2);

  const handleMoveLeft = () => {
    setSelectedCard(prev => (prev === 0 ? 4 : prev - 1));
  };

  const handleMoveRight = () => {
    setSelectedCard(prev => (prev === 4 ? 0 : prev + 1));
  };

  const imgs = [zelda, cup, age, gears, star];

  return (
    <div className='t-container'>
      <h1 className='tittle'>Disponibles ahora!</h1>
      <div className='cards-tittle-container'>
        <div className='cards-section'>
          {imgs.map((img, index) => {
            let cardClassName = 'cardt';
            const distanceToLeft = (selectedCard - index + 5) % 5;
            const distanceToRight = (index - selectedCard + 5) % 5;

            if (distanceToLeft === 0) cardClassName += ' centered';
            else if (distanceToLeft === 1) cardClassName += ' left';
            else if (distanceToRight === 1) cardClassName += ' right';
            else if (distanceToLeft === 2) cardClassName += ' left-small';
            else if (distanceToRight === 2) cardClassName += ' right-small';

            return (
              <div key={index} className={cardClassName}>
                <img src={img} className='card-img' alt={`Card ${index}`} />
              </div>
            );
          })}
        </div>
      </div>
      <div className='button-container'>
        <button className='side-button' onClick={handleMoveLeft}>
          <img src={left} alt="left" className='button-img' />
        </button>
        <button className='side-button' onClick={handleMoveRight}>
          <img src={right} alt="right" className='button-img' />
        </button>
      </div>
    </div>
  );
};

export default Test;

