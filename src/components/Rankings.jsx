import React, { useEffect, useState, useRef } from 'react';

const Rankings = () => {
const Y2020 = "first_release_date >= 1577854800 & first_release_date <= 1609390800";
const Y2021 = "first_release_date >= 1609477200 & first_release_date <= 1640926800";
const Y2022 = "first_release_date >= 1641013200 & first_release_date <= 1672462800";
const Y2023 = "first_release_date >= 1672549200 & first_release_date <= 1703998800";
const [Games, setGames] = useState([]);

const headers = {
  'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
  'Authorization': 'Bearer xgs56m0we1a96ipiu3zrfk684qrymn',
  'Content-Type': 'text/plain',
};

const body = `fields name,total_rating,total_rating_count,platforms.name,release_dates.human;
where ${Y2020};
sort total_rating_count desc; limit 10;`;

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
      const roundedData = data.map(game => ({
        ...game,
        total_rating: Math.round(game.total_rating)
      }));
      setGames(roundedData);
      console.log(Games);
      return Games;
    })
    .catch(error => {
      console.error('There was a problem with fetch operation:', error);
    });
}, []);

  return (
    <div>Rankings</div>
  )
}

export default Rankings;