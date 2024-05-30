import { useState } from 'react';

import Nav from './Nav';
import Main from './Main';

const Dashboard = () => {
    const [ hidden, setHidden ] = useState(false);
    
    return (
        <>
            <Nav hidden={hidden} setHidden={setHidden} />
            <Main hidden={hidden} />
        </>
    )
}

export default Dashboard
