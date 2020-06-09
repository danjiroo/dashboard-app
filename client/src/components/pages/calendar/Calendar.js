import React from 'react';
import { Link } from 'react-router-dom';

const Calendar = () => {
    return (
        <>
            <div className="main_head">
                <h2>Calendar</h2>
            </div>
            <div className="main_con">
                <div className="main_right_con col-4">
                    <div className="styledtitle">
                        <h3>Calendar</h3>
                    </div>
                    <div className="underconst">
                        <p>This page is still in progress....</p>
                        <p>Please check <Link to="/employees">Employees</Link> and <Link to="/tasks">Tasks</Link> pages.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Calendar