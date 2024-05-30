/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import AllEmployees from './sub/AllEmployees';
import MyTeam from './sub/MyTeam';
import Register from './sub/Register';
import Employee from './sub/Employee';
import NoMatch from '../NoMatch';

const EmployeesRight = ({user, setHidden}) => {
    const userList = useSelector(state => state.user);
    const { users } = userList; // for all users

    return (
        <Switch>
            <Route path="/employees" exact render={props => <AllEmployees user={user} users={users} />} />
            <Route path="/employees/myteam" component={MyTeam} />
            { (user.role === 'Administrator' || user.role === 'Senior Developer') 
                && <Route path="/employees/register" render={props => <Register setHidden={setHidden} users={users} />} /> 
            }
            <Route path="/employees/user/:empId" component={Employee} />
            <Route component={NoMatch} />
        </Switch>
    )
}

export default EmployeesRight
