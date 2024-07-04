import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Top10 from '../components/Top10';
import '../stylesheets/rankings/Rankings.css';
import Header from '../components/Header';
import wuarrow from '../img/right.png';
import back from '../img/ConsolesBackground.png';

const Rankings = () => {
  const [selectedYear, setSelectedYear] = useState('2021');
  const years = ['2021', '2022', '2023', 'AllTimes'];
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      let start, end;
      console.log('render');
      if (selectedYear === '2021') {
        start = 1609477200;
        end = 1640926800;
      } else if (selectedYear === '2022') {
        start = 1641013200;
        end = 1672462800;
      } else if (selectedYear === '2023') {
        start = 1672549200;
        end = 1703998800;
      } else {
        start = 0;
        end = Date.now() / 1000; // AllTimes
      }

      const body = `fields name,release_dates.human,total_rating,total_rating_count,platforms.name,cover.image_id;
        where first_release_date >= ${start} & first_release_date <= ${end} & total_rating_count >= 110 & category=0;
        sort total_rating desc; limit 10;`;

      const response = await fetch('http://localhost:8080/https://api.igdb.com/v4/games/', {
        method: 'POST',
        headers: {
          'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
          'Authorization': 'Bearer ld39wm9mmwhugmjva9zk95qu34ab5c',
          'Content-Type': 'text/plain',
        },
        body: body
      });

      if (response.ok) {
        const data = await response.json();
        setGames(data);
      } else {
        console.error('Error fetching data');
      }
    };

    fetchGames();
  }, [selectedYear]);

  const handleNextYear = () => {
    const currentIndex = years.indexOf(selectedYear);
    setSelectedYear(years[(currentIndex + 1) % years.length]);
  };

  const handlePreviousYear = () => {
    const currentIndex = years.indexOf(selectedYear);
    setSelectedYear(years[(currentIndex - 1 + years.length) % years.length]);
  };

  return (
    <div className='All-rankings-Container' style={{ backgroundImage: `url(${back})` }}>
      <Header
        route={""}
        route2={"Reviews"}
        route3={"Categories"}
        optioName={"Home"}
        optioName2={"Reviews"}
        optioName3={"Categories"}
      />
      <div className='rankings-body'>
        <div className='Rankings-Container'>
          <div className='Rankings-years-container'>
            <button className='years-button' onClick={handlePreviousYear}>
              <img src={wuarrow} alt="" className='ranking-arrow' />
            </button>
            <span className='years-name'>Top of {selectedYear}</span>
            <button className='years-button' onClick={handlePreviousYear}>
              <img src={wuarrow} alt="" className='ranking-arrow' />
            </button>
          </div>
          <Top10 games={games} />
          {console.log(games)}
        </div>
        <div className='rankings-consoles-container'>
          <h1 className='rankings-consoles-title'>Best Games of..</h1>
          <h2 className='rankings-consoles-console-name'>Nintendo</h2>
          <h2 className='rankings-consoles-console-name'>PlayStation</h2>
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
