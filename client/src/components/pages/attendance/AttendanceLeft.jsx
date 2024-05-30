/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

const AttendanceLeft = ({hidden, setHidden}) => {
    return (
        <div className="main_left_top">
            <ul className="main_own_links">
                <li><a onClick={() => setHidden(!hidden)} className="quicklinks">Quick Links</a></li>
                <li><NavLink to="/attendance" exact>Attendance</NavLink></li>
                <li><NavLink to="/attendance/coc">Code of Conduct</NavLink></li>
                <li><NavLink to="/attendance/leaves">Leaves</NavLink></li>
                <li><NavLink to="/attendance/payroll">Payroll</NavLink></li>
            </ul>
        </div>
    )
}

export default AttendanceLeft
