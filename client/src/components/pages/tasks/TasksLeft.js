import React from 'react';
import { NavLink } from 'react-router-dom';

const TasksLeft = ({hidden, setHidden, user}) => {
    return (
        <>
            <div className="main_left_top">
                <ul className="main_own_links">
                    <li><a onClick={() => setHidden(!hidden)} className="quicklinks">Quick Links</a></li>
                    <li><NavLink to="/tasks" exact>My Tasks</NavLink></li>
                    <li><NavLink to="/tasks/mypending">My Pending Tasks</NavLink></li>
                    <li><NavLink to="/tasks/myetc">Time Tracker</NavLink></li>
                    <li><NavLink to="/tasks/teamtasks" exact>Team Tasks</NavLink></li>
                </ul>
            </div>
            { (user.role === 'Administrator' || user.role === 'Senior Developer') && (
                <ul className="main_other_links admin">
                    <li><a onClick={() => setHidden(!hidden)} className="quicklinks">Admin</a></li>
                    <li><NavLink to="/tasks/pending" exact>Pending Tasks</NavLink></li>
                </ul>
            ) }
        </>
    )
}

export default TasksLeft
