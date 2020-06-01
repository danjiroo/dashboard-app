import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { assignTask, reAssignTask } from '../../../../store/actions/taskActions';
import { getAllUsers } from '../../../../store/actions/allUsersActions';

// redux store
const ModalAssignTask = ({setModalAssign, assignedTask, assign}) => {
    const [developer, setDeveloper] = useState('');
    const [error, setError] = useState(false);
    const users = useSelector(state => state.user);
    const dispatch = useDispatch();

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
        let newAssignedTask = { ...assignedTask, assignedTo: developer }
        if (assign === 'reassign') {
            dispatch(reAssignTask(newAssignedTask))
        } else {
            dispatch(assignTask(newAssignedTask))
        }
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
                        <h3>Assign Task</h3>
                        <p>Select developer in the dropdown below: { error && <span className="spanerror">Please select a developer.</span> }</p>
                        <form onSubmit={handleSubmit}>
                            <select onChange={handleSelectDev} value={developer}>
                                <option>Select a Developer</option>
                                { users.users.length && users.users.map(user => {
                                    return <option key={user._id} value={user.name}>{user.name}</option>
                                }) }
                            </select>
                            <button type="submit">Assign</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAssignTask
