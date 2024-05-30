import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import Dashboard from './components/sections/Dashboard';
import Login from './components/auth/Login';

import store from './store'
import { loadUser } from './store/actions/authActions';

const App = () => {
    const auth = useSelector(state => state.auth);
    const { isAuthenticated } = auth;

    useEffect(() => {
        if (isAuthenticated) return

        store.dispatch(loadUser())
    }, [isAuthenticated])

    return (
        <div className="app_con">
            <Router>
                { isAuthenticated ? <Dashboard /> : <Login /> }
            </Router>
        </div>
    )
}

export default App;
