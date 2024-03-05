import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';

function App() {
  return (
    <div className="App">
      <header>
        <div className='logo'>
          <h1>Play Or Not?</h1>
        </div>
        <div>
          <button>Review</button>
          <button>Reviews</button>
          <button>Rankings</button>
        </div>
        <input type="text" className="search" placeholder="Search.." />
        <button>Login</button>
      </header>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;

