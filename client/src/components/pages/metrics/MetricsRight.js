import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Achievements from './sub/Achievements';
import MyPerformance from './sub/MyPerformance';
import QATracker from './sub/QATracker';
import MainMetrics from './sub/MainMetrics';
import NoMatch from '../NoMatch';

const MetricsRight = () => {
    return (
        <Switch>
            <Route path="/metrics/achievements" component={Achievements} />
            <Route path="/metrics/myperformance" component={MyPerformance} />
            <Route path="/metrics/qatracker" component={QATracker} />
            <Route path="/metrics" exact component={MainMetrics} />
            <Route component={NoMatch} />
        </Switch>
    )
}

export default MetricsRight
