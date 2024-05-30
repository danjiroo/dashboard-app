import { useDispatch } from 'react-redux';

import { logout } from '../../store/actions/authActions';

const Header = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout())
        window.location.href = '/'
    }

    return (
        <header>
            <div className="logo">
                <h4>workbin</h4>
            </div>
            <div className="header_btns">
                <span></span>
                <span></span>
                <span onClick={handleLogout}>Logout</span>
            </div>
        </header>
    )
}

export default Header