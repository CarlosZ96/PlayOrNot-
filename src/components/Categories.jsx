import React, { useState, useEffect } from 'react';
import Shooter from '../img/Duck_Hunt.gif';
import '../stylesheets/Categories.css';

export default function Categories() {
  const [categoriesApi, setCategoriesApi] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const url = 'http://localhost:8080/https://api.igdb.com/v4/genres/';
        const body = `fields *; where name="Shooter" | name="Simulator" | name="Fighting" | name="Music" | name="Platform"
        | name="Racing" | name= *"Role-playing"* | name= "Sport" | name= "Indie" | name= "Strategy";
        limit 30;`;
        const headers = {
          'Client-ID': 'jeqorghffhp2lzx25w4hjazivbkahe',
          'Authorization': 'Bearer yol7xd1r00hd58t8i081u1a2yzjcsm',
          'Content-Type': 'text/plain',
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: body
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setCategoriesApi(data);
      } catch (error) {
        console.error('There was a problem with fetch operation:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='Categories-container'>
      {categoriesApi.map(category => (
        <div key={category.id} className='categorie-card'>
          <img src={Shooter} alt="" className='cat-img' />
          <h1 className='categorie-name'>{category.name}</h1>
        </div>
      ))}
    </div>
  );
}
