import { Switch, Route } from 'react-router-dom';

import MainAttendance from './sub/MainAttendance';
import CodeOfConduct from './sub/CodeOfConduct';
import Leaves from './sub/Leaves';
import Payroll from './sub/Payroll';
import NoMatch from '../NoMatch';

const InboxRight = () => {
    return (
        <Switch>
            <Route path="/attendance" exact component={MainAttendance} />
            <Route path="/attendance/coc" component={CodeOfConduct} />
            <Route path="/attendance/leaves" component={Leaves} />
            <Route path="/attendance/payroll" component={Payroll} />
            <Route component={NoMatch} />
        </Switch>
    )
}

export default InboxRight
