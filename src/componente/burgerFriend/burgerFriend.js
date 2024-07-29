import React, { useEffect, useState } from 'react';
import FriendList from '../friendList/friendList';
import FriendRequestItem from '../friendRequestItem/friendRequestItem';
import SendFriendRequest from '../sendFriendRequest/sendFriendRequest';
import './App.css'

const BurgerFriend = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div id="mySidenav" className={`sidenav ${isOpen ? 'open' : ''}`}>
                <a href="#" className="close" onClick={toggleNav}>×</a>
                <FriendRequestItem />
                <SendFriendRequest />
                <FriendList />
            </div>

            <a href="#" id="openBtn" onClick={toggleNav}>
                <span className="burger-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </a>
        </div>
    );
};

export default BurgerFriend;