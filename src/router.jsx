import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inscription from './pages/inscription/inscription';
import Login from './pages/login/login'
import Chat from './pages/chat/chat'
import Home from './pages/home/home'
import Friend from './pages/friend/friend';
import Lobby from './pages/lobby/lobby';

      
function Router() {
  return (

    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path='/register' element={<Inscription />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path='/friend' element={<Friend />} />
      <Route path='/lobby' element={<Lobby />} />
    </Routes>

  );
}

export default Router;
