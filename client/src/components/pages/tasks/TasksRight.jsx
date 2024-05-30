import { Switch, Route } from 'react-router-dom';

import MainTasks from './sub/MainTasks';
import MyPendingTasks from './sub/MyPendingTasks';
import MyETC from './sub/MyETC';
import TeamTasks from './sub/TeamTasks';
import AdminPendingTasks from './sub/AdminPendingTasks';
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
            <Route path="/tasks/id/:id" exact component={Task} />
            <Route path="/tasks/assigned/:id" exact component={TaskAssigned} />
            <Route exact component={NoMatch} />
        </Switch>
    )
}

export default TasksRight
