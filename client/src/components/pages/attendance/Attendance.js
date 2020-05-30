import React from 'react';

import AttendanceLeft from './AttendanceLeft';
import AttendanceRight from './AttendanceRight';

const Attendance = ({hidden, setHidden}) => {
    return (
        <>
            <h2>Attendance</h2>
            <div className="main_con attendance">
                <div className={ hidden ? 'hidden main_left' : 'main_left' }>
                    <AttendanceLeft hidden={hidden} setHidden={setHidden} />
                </div>
                <div className={ hidden ? 'hidden main_right' : 'main_right' }>
                    <AttendanceRight/>
                </div>
            </div>
        </>
    )
}

export default Attendance
