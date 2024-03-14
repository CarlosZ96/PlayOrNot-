import React, { useEffect } from 'react';

function GameReleases() {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = 'http://localhost:8080/https://api.igdb.com/v4/games/';
      const body = JSON.stringify({
        fields: 'name, id, first_release_date, platforms, cover.url, summary, platforms.name, involved_companies.company.name, videos.video_id',
        where: 'id = 1942',
        fields: 'name, cover.url',
      });

      const headers = {
        'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
        'Authorization': 'Bearer yol7xd1r00hd58t8i081u1a2yzjcsm',
        'Content-Type': 'application/json',
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body,
      });

      console.log('Request:', response.url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('There was a problem fetching the data:', error);
    }
  };

  return (
    <div>
      Test
    </div>
  );
}

export default GameReleases;
