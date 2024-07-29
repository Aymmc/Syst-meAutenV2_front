import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './login.css';
import Login from '../../Login.js';

function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    // Vérifier si le token est présent dans les cookies
    const token = Cookies.get('authToken');
    if (token) {
      setIsAuthenticated(true);
      navigate('/lobby');
    }
 
  }, [navigate]);

  
  if (!isAuthenticated) {
    return <Login />;
  }

  return null;

}

export default Home;