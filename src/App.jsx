import './App.css';
import MainPage from './components/MainPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
