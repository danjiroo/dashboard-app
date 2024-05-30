/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

const InboxLeft = ({hidden, setHidden}) => {
    return (
        <>
            <div className="main_left_top">
                <ul className="main_own_links">
                    <li><a onClick={() => setHidden(!hidden)} className="quicklinks">Quick Links</a></li>
                    <li><NavLink to="/inbox/announcement">Announcement</NavLink></li>
                    <li><NavLink to="/inbox/allmail">All Mail</NavLink></li>
                    <li><NavLink to="/inbox" exact>Inbox</NavLink></li>
                    <li><NavLink to="/inbox/sent">Sent</NavLink></li>
                    <li><NavLink to="/inbox/draft">Draft</NavLink></li>
                    <li><NavLink to="/inbox/trash">Trash</NavLink></li>
                </ul>
            </div>
            <ul className="main_other_links compose">
                <li><NavLink to="/inbox/compose">Compose</NavLink></li>
            </ul>
        </>
    )
}

export default InboxLeft
