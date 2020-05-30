import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import MainTasks from './sub/MainTasks';
import MyPendingTasks from './sub/MyPendingTasks';
import MyETC from './sub/MyETC';
import TeamTasks from './sub/TeamTasks.js';
import AdminPendingTasks from './sub/AdminPendingTasks.js';
import NoMatch from '../NoMatch';

const TasksRight = () => {
    const auth = useSelector(state => state.auth);
    const { user } = auth;
    return (
        <Switch>
            <Route path="/tasks" exact component={MainTasks} />
            <Route path="/tasks/mypending" component={MyPendingTasks} />
            <Route path="/tasks/myetc" component={MyETC} />
            <Route path="/tasks/teamtasks" component={TeamTasks} />
            { (user.role === 'Administrator' || user.role === 'Senior Developer') && <Route path="/tasks/pending" component={AdminPendingTasks} /> }
            <Route component={NoMatch} />
        </Switch>
    )
}

export default TasksRight
