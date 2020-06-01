import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';

import ModalAssignTask from './ModalAssignTask';

import { getAssignedTask } from '../../../../store/actions/taskActions';

const AdminPendingTasks = () => {
    const [modalAssign, setModalAssign] = useState(false);
    const [assignedTask, setAssignedTask] = useState({});
    const dispatch = useDispatch();

    const { assignedTasks } = useSelector(state => state.task);

    const handleReAssign = (id, title, instruction, name) => {
        setModalAssign(true)
        setAssignedTask({ id, title, instruction, name })
    }

    useEffect(() => {
        dispatch(getAssignedTask())
    }, [])
    
    const fetchAssignedTasks = assignedTasks.length ? (assignedTasks.map(assignedTask => {
        return (
            <li key={assignedTask._id}>
                <div>
                    <strong>{assignedTask.title}</strong>
                    <div className="created">
                        <small>Assigned to: <b>{assignedTask.assignedTo}</b></small>
                        <small>Created by: <b>{assignedTask.createdBy}</b></small>
                        <small>{moment(assignedTask.date).format('LLLL')}</small>
                    </div>
                </div>
                <div className="instruction">{ReactHtmlParser(assignedTask.instruction)}</div>
                {/* <div className="instruction" dangerouslySetInnerHTML={{ __html: assignedTask.instruction }}></div> */}
                <div>
                    <button onClick={() => handleReAssign(assignedTask._id, assignedTask.title, assignedTask.instruction, assignedTask.createdBy)}>Re-assign</button>
                    <button onClick={() => handleDelete(assignedTask._id)}>Delete</button>
                </div>  
            </li>
        )
    })) : (
        <li className="stylednoresult">No task found...</li>
    )

    return (
        <>
            { modalAssign && <ModalAssignTask setModalAssign={setModalAssign} assignedTask={assignedTask} assign={'reassign'} /> }
            <div className="main_right_con">
                <div className="styledtitle">
                    <h3>Team Tasks</h3>
                </div>
                <div className="styledsubtitle">
                    <span>Title</span>
                    <span>Instructions</span>
                    <span>Actions</span>
                </div>
                <ul className="styledul">
                    { fetchAssignedTasks }
                </ul>
            </div>
        </>
    )
}

export default AdminPendingTasks