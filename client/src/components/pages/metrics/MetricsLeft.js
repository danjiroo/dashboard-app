import React from 'react';
import { NavLink } from 'react-router-dom';

const MetricsLeft = ({hidden, setHidden}) => {
    return (
        <div className="main_left_top">
            <ul className="main_own_links">
                <li><a onClick={() => setHidden(!hidden)} className="quicklinks">Quick Links</a></li>
                <li><NavLink to="/metrics/achievements">Achievements</NavLink></li>
                <li><NavLink to="/metrics/myperformance">My Performance</NavLink></li>
                <li><NavLink to="/metrics/qatracker">QA Tracker</NavLink></li>
                <li><NavLink to="/metrics" exact>Team Rank</NavLink></li>
            </ul>
        </div>
    )
}

export default MetricsLeft
