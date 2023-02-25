import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context';
import MyButton from '../button/MyButton';

const Navbar = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    const Logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }

    return (
        
    <div className='navbar'>
        <MyButton onClick={Logout}>
            Logout
        </MyButton>
      <div className='navbar__links'>
        <Link to="/about">About</Link>
        <Link to="/posts">Posts</Link>
      </div>
    </div>
    );
};

export default Navbar;