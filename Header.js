import React, { useEffect, useState } from 'react';
import './Header.css';
import cart from './img/cart.png';
import logo from './img/logo.png';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from './firebase'; // Import Firestore

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [userName, setUserName] = useState(''); // New state for user's name

  // Fetch user's name from Firestore
  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserName(userData.name); // Set user's name
        }
      }
    };

    fetchUserName();
  }, [user]); // Dependency on user

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
      setUserName(''); // Clear userName on sign out
    }
  };

  const handleSearch = (e) => {
    dispatch({
      type: 'SET_SEARCH_QUERY',
      query: e.target.value.toLowerCase() // Convert to lowercase for case-insensitive search
    });
  };

  return (
    <div className="header">
      <Link to='/'>
        <img className="header__logo" src={logo} alt="Logo" />  
      </Link>
      <div className="header__search">
        <input 
          className="header__searchInput" 
          placeholder='Search for gadgets' 
          type="text" 
          onChange={handleSearch}
        />
      </div>

      <div className="header__nav">
        <Link to={!user && '/login'}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">Hello, {!user ? 'Guest' : userName}</span> {/* Display user's name */}
            <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">View</span>
            <span className="header__optionLineTwo">Orders</span>
          </div>
        </Link>
        <div className="header__optionBasket">
          <Link to="/checkout">
            <img className='basket__icon' src={cart} alt="Cart"/>
          </Link>
          <span className="header__optionLineTwo header__basketCount">
            {basket?.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
