import PopularMovies from './components/PopularMovies'
import Layout from './Layout';
import Home from './Home';
import Inscription from './Inscription';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Connexion from './Connexion';
import 'antd/dist/antd.css'
  
function App() {
  const [moviesData, setMoviesData] = useState();
  const navigate = useNavigate();

  return (
    <div>
    <Routes>
      <Route path="/" element={<Layout
      />}>
        <Route index element={<Home />} />
        <Route path="inscription" element={<Inscription />} />
        <Route path="connexion" element={<Connexion />} />
        <Route path="popular" element={<PopularMovies/>} />
      </Route>
    </Routes>
    
    </div>
  );
}

export default App;
