import './App.css';
import MainPage from './components/MainPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Cambiado a BrowserRouter

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>La tatuateria</h1>
        </div>
      </header>
      <Router> 
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router> {}
    </div>
  );
}

export default App;

