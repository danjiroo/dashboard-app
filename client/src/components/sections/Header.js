import React from 'react';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'

import { logout } from '../../store/actions/authActions';

const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        dispatch(logout())
        history.push('/');
    }

    return (
        <header>
            <div className="logo">
                <h4>codeyuri</h4>
            </div>
            <div className="header_btns">
                <span></span>
                <span></span>
                <span onClick={handleLogout}>Logout</span>
            </div>
        </header>
    )
}

export default Header