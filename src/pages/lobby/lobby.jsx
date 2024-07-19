import React from 'react';
import Friend from '../friend/friend'; 
import Chat from '../chat/chat'; 
import { Link } from 'react-router-dom';
function Lobby() {
  return (
    <>
      <Link to ='/chat'> Direction Chat</Link>
      <Link to ='/friend'> Direction friend</Link>
    </>
  );
}

export default Lobby;