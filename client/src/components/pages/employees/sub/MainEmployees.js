import React from 'react';

const MainEmployees = ({user}) => {
    return (
        <>
            <div className="main_right_con col-4">
                <div className="styledtitle">
                    <h3>My Profile</h3>
                </div>
                    <p className="underconst">Hi <strong>{user.name}</strong>! This page is still in progress, please check back next time...</p>
            </div>
        </>
    )
}

export default MainEmployees