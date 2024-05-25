import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Top10 from '../components/Top10';
import '../stylesheets/rankings/Rankings.css';
import Header from '../components/Header';

const Rankings = () => {
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  const years = ['2020', '2021', '2022', '2023', 'AllTimes'];
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      let timeFrame;
      switch (years[currentYearIndex]) {
        case '2020':
          timeFrame = "where first_release_date >= 1577854800 & first_release_date <= 1609390800  &";
          break;
        case '2021':
          timeFrame = "where first_release_date >= 1609477200 & first_release_date <= 1640926800  &";
          break;
        case '2022':
          timeFrame = "where first_release_date >= 1641013200 & first_release_date <= 1672462800  &";
          break;
        case '2023':
          timeFrame = "where first_release_date >= 1672549200 & first_release_date <= 1703998800  &";
          break;
        default:
          timeFrame = "where";
          break;
      }

      const body = `fields name,release_dates.human,total_rating,total_rating_count,platforms.name,cover.image_id;
        ${timeFrame} total_rating_count >= 110 & category=0;
        sort total_rating desc; limit 10;`;

      const response = await fetch('http://localhost:8080/https://api.igdb.com/v4/games/', {
        method: 'POST',
        headers: {
          'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
          'Authorization': 'Bearer xgs56m0we1a96ipiu3zrfk684qrymn',
          'Content-Type': 'text/plain',
        },
        body: body
      });

      if (response.ok) {
        const data = await response.json();
        setGames(data);
        console.log(games);
      } else {
        console.error('Error fetching data');
      }
    };

    fetchGames();
  }, [currentYearIndex, years]);

  const handleNextYear = () => {
    setCurrentYearIndex((prevIndex) => (prevIndex + 1) % years.length);
  };

  const handlePreviousYear = () => {
    setCurrentYearIndex((prevIndex) => (prevIndex - 1 + years.length) % years.length);
  };

  return (
    <div className='All-rankings-Container'>
      <Header />
      <div className='rankings-body'>
        <div className='Rankings-Container'>
          <div className='Rankings-years-container'>
            <button onClick={handlePreviousYear}>&lt;</button>
            <span>{years[currentYearIndex]}</span>
            <button onClick={handleNextYear}>&gt;</button>
          </div>
          <Top10 games={games} />
        </div>
        <div className='rankings-consoles-container'>
          <h1 className='rankings-consoles-title'>Best Games of..</h1>
          <h2 className='rankings-consoles-console-name'>Nintendo</h2>
          <h2 className='rankings-consoles-console-name'>Playstation</h2>
          <h2 className='rankings-consoles-console-name'>Xbox</h2>
          <h2 className='rankings-consoles-console-name'>PC</h2>
          <h2 className='rankings-consoles-console-name'>Mobile Devices</h2>
        </div>
      </div>
    </div>
  );
}

Rankings.propTypes = {
  games: PropTypes.array.isRequired,
};

export default Rankings;
