import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { assignTask, reAssignTask } from '../../../../store/actions/taskActions';
import { getAllUsers } from '../../../../store/actions/allUsersActions';

// redux store
const ModalAssignTask = ({setModalAssign, assignedTask, assign}) => {
    const [developer, setDeveloper] = useState('');
    const [error, setError] = useState(false);
    const users = useSelector(state => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSelectDev = e => {
        setError(false)
        setDeveloper(e.target.value)
    }

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        if( !developer || developer === 'Select a Developer' || developer === null ) {
            setError(true);
            return          
        }
        let assignedDev = users.users.filter(user => user.empId == developer).map(name => name.name)
        let reAssignedTo = { ...assignedTask, assignedToEmpId: developer, assignedTo: assignedDev[0].split(' ').slice(0, 1).join(' ') }
        if (assign === 'reassign') {
            dispatch(reAssignTask(reAssignedTo))
        } else {
            dispatch(assignTask(reAssignedTo))
            setTimeout(() => {
                history.push('/tasks/teamtasks')
            }, 500)
        }
        setDeveloper('')
        setModalAssign(false)
        setError(false)
    }

    return (
        <div className="modal assigntask">
            <div className="modal_con">
                <div className="modal_div">
                    <div className="modal_close" onClick={() => setModalAssign(false)}>
                        <span>x</span>
                    </div>
                    <div className="modal_body">
                        { assign === 'reassign' ? <h3>Re-Assign Task</h3> : <h3>Assign Task</h3> }
                        <p>Select developer in the dropdown below: { error && <span className="spanerror">Please select a developer.</span> }</p>
                        <form onSubmit={handleSubmit}>
                            <select onChange={handleSelectDev} value={developer}>
                                <option>Select a Developer</option>
                                { users.users.length && users.users.map(user => {
                                    return <option key={user._id} value={user.empId}>{user.name}</option>
                                }) }
                            </select>
                            <button type="submit">Re-assign</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAssignTask
