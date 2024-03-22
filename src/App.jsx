import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import Search from './img/search.png';
import LogIn from './img/Muhamad Ulum.png';
import './stylesheets/app.css';

function App() {
  return (
    <div className="App">
      <header className='header-container'>
        <div className='options'>
          <div className='logo'>
            <h1 className='tittle'>Play Or Not?</h1>
          </div>
          <div className='options-buttons'>
            <button className='options-button'>Category</button>
            <button className='options-button'>Reviews</button>
            <button className='options-button'>Rankings</button>
          </div>
        </div>
        <div className='search-container'>
          <input type="text" className="searchi" placeholder="  Search.."/>
          <button className='search-button'><img src={Search} alt="" className='search' /></button>
          <button className='LogIn'><img src={LogIn} alt="" className='Mar' /></button>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;

