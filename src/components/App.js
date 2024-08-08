import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Footer from './Footer';
import FeaturedMovie from './FeaturedMovie';
import MovieDetail from './MovieDetail';
import FeaturedSeries from './FeaturedSeries';
import SeriesDetail from './SeriesDetail';
import Home from './Home';
import SearchResults from './SearchResults';
import Dashboard from './Dashboard';
import '../css/HeaderFooter.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const fetchMoviesAndSeries = useCallback(() => {
    const fetchOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch('https://finalhuko-backend-ad893b87634b.herokuapp.com/movies', fetchOptions)
      .then(response => response.json())
      .then(data => {
        setMovies(data.body);
      })
      .catch(error => console.error('Error fetching the movies data:', error));

    fetch('https://finalhuko-backend-ad893b87634b.herokuapp.com/shows', fetchOptions)
      .then(response => response.json())
      .then(data => {
        setSeries(data.body);
      })
      .catch(error => console.error('Error fetching the shows data:', error));
  }, []);

  useEffect(() => {
    fetchMoviesAndSeries();
  }, [fetchMoviesAndSeries]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserDetails(token);
    }
  }, []);

  const fetchUserDetails = (token) => {
    fetch('https://finalhuko-backend-ad893b87634b.herokuapp.com/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('User Details:', data.body[0]);
      setUserDetails(data.body[0]);
    })
    .catch(error => console.error('Error fetching user details:', error));
  };

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    fetchUserDetails(token);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserDetails(null);
    navigate('/home');
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('token');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="main-content">
        <Routes>
          <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home movies={movies} series={series} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard userDetails={userDetails} /> : <Navigate to="/signin" />} />
          <Route path="/movie/:id" element={<MovieDetail isAuthenticated={isAuthenticated} />} />
          <Route path="/series/:id" element={<SeriesDetail isAuthenticated={isAuthenticated} />} />
          <Route path="/movies" element={<FeaturedMovie movies={movies} showAll={true} />} />
          <Route path="/series" element={<FeaturedSeries series={series} showAll={true} />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/home"} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
