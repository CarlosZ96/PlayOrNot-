// En App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import './stylesheets/app.css';
import Categories from './components/Categories';
import GameDetails2 from './components/GameDetails';
import Reviews from './components/Reviews';
import CategorieItem from './components/CategorieItem';
import Rankings from './components/Rankings';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/Rankings" element={<Rankings />} />
        <Route path="/GameDetails/:gamename" element={<GameDetails2 />} />
        <Route path="/CategorieItem" element={<CategorieItem />} />
      </Routes>
    </div>
  );
}

export default App;
