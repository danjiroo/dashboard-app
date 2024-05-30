/* eslint-disable react/prop-types */
import AttendanceLeft from './AttendanceLeft';
import AttendanceRight from './AttendanceRight';

const Attendance = ({hidden, setHidden}) => {
    return (
        <>
            <div className="main_head">
                <h2>Attendance</h2>
            </div>
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
