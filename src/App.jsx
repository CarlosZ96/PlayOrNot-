import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';

function App() {
  return (
    <div className="App">
      <header>
        <img src="https://cdn-icons-png.flaticon.com/128/921/921490.png" alt="planet img" />
        <h1>Play Or Not?</h1>
      </header>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;

