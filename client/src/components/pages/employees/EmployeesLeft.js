import React from 'react';
import { NavLink } from 'react-router-dom';

const EmployeesLeft = ({hidden, setHidden, user}) => {
    return (
        <>
            <div className="main_left_top">
                <ul className="main_own_links">
                    <li><a onClick={() => setHidden(!hidden)} className="quicklinks">Quick Links</a></li>
                    <li><NavLink to="/employees" exact>All Employees</NavLink></li>
                    <li><NavLink to={`/employees/user/${user.name}`}>My Profile</NavLink></li>
                    <li><NavLink to="/employees/myteam">My Team</NavLink></li>
                </ul>
            </div>
            { (user.role === 'Administrator' || user.role === 'Senior Developer') && (
            <ul className="main_other_links compose">
                <li><NavLink to="/employees/register">Register New User</NavLink></li>
            </ul>
            ) }
        </>
    )
}

export default EmployeesLeft
