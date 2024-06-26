import { Link } from 'react-router-dom';

const Inbox = () => {
    return (
        <>
            <div className="main_right_con col-4">
                <div className="styledtitle">
                    <h3>Inbox</h3>
                </div>
                <div className="underconst">
                    <p>This page is still in progress....</p>
                    <p>Please check <Link to="/employees">Employees</Link> and <Link to="/tasks">Tasks</Link> pages.</p>
                </div>
            </div>
        </>
    )
}

export default Inbox