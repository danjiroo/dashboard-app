import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Attendance from '../pages/attendance/Attendance';
import Calendar from '../pages/calendar/Calendar';
import Employees from '../pages/employees/Employees';
import Inbox from '../pages/inbox/Inbox';
import Metrics from '../pages/metrics/Metrics';
import Notes from '../pages/notes/Notes';
import Settings from '../pages/settings/Settings';
import Tasks from '../pages/tasks/Tasks';
import NoMatch from '../pages/NoMatch';

const ContentArea = () => {
    // this is another hidden state for content area
    const [ hidden, setHidden ] = useState(false);

    return (
        <main>
            <Switch>
                <Route path="/" exact render={props => <Home hidden={hidden} setHidden={setHidden} />} />
                <Route path="/attendance" render={props => <Attendance hidden={hidden} setHidden={setHidden} />} />
                <Route path="/calendar" render={props => <Calendar hidden={hidden} setHidden={setHidden} />} />
                <Route path="/employees" render={props => <Employees hidden={hidden} setHidden={setHidden} />} />
                <Route path="/inbox" render={props => <Inbox hidden={hidden} setHidden={setHidden} />} />
                <Route path="/metrics" render={props => <Metrics hidden={hidden} setHidden={setHidden} />} />
                <Route path="/notes" render={props => <Notes hidden={hidden} setHidden={setHidden} />} />
                <Route path="/settings" render={props => <Settings hidden={hidden} setHidden={setHidden} />} />
                <Route path="/tasks" render={props => <Tasks hidden={hidden} setHidden={setHidden} />} />
                <Route component={NoMatch} />
            </Switch>
        </main>
    )
}

export default ContentArea