import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Announcement from './sub/Announcement';
import AllMail from './sub/AllMail';
import MainInbox from './sub/MainInbox';
import Sent from './sub/Sent';
import Draft from './sub/Draft';
import Trash from './sub/Trash';
import Compose from './sub/Compose';
import NoMatch from '../NoMatch';

const InboxRight = () => {
    return (
        <Switch>
            <Route path="/inbox/announcement" component={Announcement} />
            <Route path="/inbox/allmail" component={AllMail} />
            <Route path="/inbox" exact component={MainInbox} />
            <Route path="/inbox/sent" component={Sent} />
            <Route path="/inbox/draft" component={Draft} />
            <Route path="/inbox/trash" component={Trash} />
            <Route path="/inbox/compose" component={Compose} />
            <Route component={NoMatch} />
        </Switch>
    )
}

export default InboxRight
