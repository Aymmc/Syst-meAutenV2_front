import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inscription from './pages/inscription/inscription';
import Login from './pages/login/login'
import Chat from './pages/chat/chat'
import Home from './pages/home/home'
function Router() {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/register' element={<Inscription />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>

  );
}

export default Router;
