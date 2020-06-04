import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainTasks from './sub/MainTasks';
import MyPendingTasks from './sub/MyPendingTasks';
import MyETC from './sub/MyETC';
import TeamTasks from './sub/TeamTasks.js';
import AdminPendingTasks from './sub/AdminPendingTasks.js';
import NoMatch from '../NoMatch';
import Task from './sub/Task';
import TaskAssigned from './sub/TaskAssigned';

const TasksRight = () => {
    return (
        <Switch>
            <Route path="/tasks" exact component={MainTasks} />
            <Route path="/tasks/mypending" component={MyPendingTasks} />
            <Route path="/tasks/myetc" component={MyETC} />
            <Route path="/tasks/teamtasks" component={TeamTasks} />
            <Route path="/tasks/pending" component={AdminPendingTasks} />
            <Route path="/tasks/:id" exact component={Task} />
            <Route path="/tasks/assigned/:id" component={TaskAssigned} />
            <Route component={NoMatch} />
        </Switch>
    )
}

export default TasksRight
