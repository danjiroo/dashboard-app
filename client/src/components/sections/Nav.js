import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'

const Nav = ({hidden, setHidden}) => {
    const auth = useSelector(state => state.auth);
    const { user } = auth;
    
    return (
        <nav className={ hidden ? 'hidden' : null }>
            <div className="toggle" onClick={() => setHidden(!hidden)}>
                <span></span>
            </div>
            <h2>{user.name}</h2>
            <h5>{user.role}</h5>
            <ul>
                <li><NavLink exact to="/">Home</NavLink></li>
                <li><NavLink to="/attendance">Attendance</NavLink></li>
                <li><NavLink to="/calendar">Calendar</NavLink></li>
                <li><NavLink to="/inbox">Inbox</NavLink></li>
                <li><NavLink to="/metrics">Metrics</NavLink></li>
                <li><NavLink to="/notes">Notes</NavLink></li>
                <li><NavLink to="/settings">Settings</NavLink></li>
                <li><NavLink to="/tasks">Tasks</NavLink></li>
            </ul>
        </nav>
    )
}

export default Nav