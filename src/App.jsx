import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import './stylesheets/app.css';
import Categories from './components/Categories';
import GameDetails from './components/GameDetails';
import Reviews from './components/Reviews';
import CategorieItem from './components/CategorieItem';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/GameDetails" element={<GameDetails />} />
        <Route path="/CategorieItem" element={<CategorieItem />} />
      </Routes>
    </div>
  );
}

export default App;
