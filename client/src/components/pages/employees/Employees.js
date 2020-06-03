import React from 'react';
import { useSelector } from 'react-redux';

import EmployeesLeft from './EmployeesLeft';
import EmployeesRight from './EmployeesRight';

const Employees = ({hidden, setHidden}) => {
    const auth = useSelector(state => state.auth);
    const { user } = auth; // for current user

    return (
        <>
            <div className="main_head">
                <h2>Employees</h2>
            </div>
            <div className="main_con employees">
                <div className={ hidden ? 'hidden main_left' : 'main_left' }>
                    <EmployeesLeft hidden={hidden} setHidden={setHidden} user={user} />
                </div>
                <div className={ hidden ? 'hidden main_right' : 'main_right' }>
                    <EmployeesRight user={user} setHidden={setHidden} />
                </div>
            </div>
        </>
    )
}

export default Employees
