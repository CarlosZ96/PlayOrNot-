import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../stylesheets/Categories.css';
import '../stylesheets/app.css';
import back from '../img/categoriesback.jpg';

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
      <Header />
      <div className='Categories-body-container' style={{ backgroundImage: `url(${back})` }}>
        <div className='back-effect'></div>
        <div className='categories-cards-container'>
          <div className='Cards-Container'>
            {categoriesApi.map(category => (
              <button key={category.id} className='learn-more'>
                <div className='img-container'>
                  <img src={require(`../img/${category.name}.gif`)} alt="" className='cat-img' />
                </div>
                <div className='categorie-name-container'>
                  <h1 className='categorie-name'>
                    {category.name === 'Role-playing (RPG)' ? 'RPG' : category.name}
                  </h1>
                </div>
              </button>
            ))}
          </div>
          <div className='back'>
          </div>
        </div>
        <div className='caregorie-container'>
          <h1>CATEGORIES</h1>
        </div>
      </div>
      {console.log('render')}
    </div>
  );
}
