import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';

import ModalAssignTask from './ModalAssignTask';

import { getAssignedTask, createTask, deleteAssignedTask } from '../../../../store/actions/taskActions';

const MainTasks = () => {
    const auth = useSelector(state => state.auth);
    const { user } = auth;

    const [modalAssign, setModalAssign] = useState(false);
    const [assignedTask, setAssignedTask] = useState({});
    const dispatch = useDispatch();

    const { assignedTasks } = useSelector(state => state.task);

    const handleReAssign = (id, title, instruction, name) => {
        setModalAssign(true)
        setAssignedTask({ id, title, instruction, name })
    }

    const handleUnAssign = (id, title, instruction, name) => {
        dispatch(createTask({ id, title, instruction, name }))
        dispatch(deleteAssignedTask(id))
    }

    useEffect(() => {
        dispatch(getAssignedTask())
    }, [])
    
    const fetchAssignedTasks = assignedTasks.length ? assignedTasks
        .filter(assignedTask => assignedTask.assignedTo === user.name)
        .map(owntask => {
            return (
                <li key={owntask._id}>
                    <div className="taskdev">{owntask.assignedTo}</div>
                    <div className="tasktitle">
                        <strong>{owntask.title}</strong>
                        <div className="created">
                            <small>Created by: <b>{owntask.createdBy}</b></small>
                            <small>{moment(owntask.date).format('LLLL')}</small>
                        </div>
                    </div>
                    <div className="taskinstruction">{ReactHtmlParser(owntask.instruction)}</div>
                    {/* <div className="instruction" dangerouslySetInnerHTML={{ __html: owntask.instruction }}></div> */}
                    { (user.role === 'Administrator' || user.role === 'Senior Developer') && (
                        <div className="taskactions">
                            <button onClick={() => handleReAssign(owntask._id, owntask.title, owntask.instruction, owntask.createdBy)}>Re-assign</button>
                            <button onClick={() => handleUnAssign(owntask._id, owntask.title, owntask.instruction, owntask.createdBy)}>Un-assign</button>
                        </div>
                    )}
                </li>
            )
        }
    ) : (
        <li className="stylednoresult">No task found...</li>
    )

    return (
        <>
            { modalAssign && <ModalAssignTask setModalAssign={setModalAssign} assignedTask={assignedTask} assign={'reassign'} /> }
            <div className="main_right_con col-4">
                <div className="styledtitle">
                    <h3>My Tasks</h3>
                </div>
                <div className="styledsubtitle">
                    <span>Dev</span>
                    <span>Title</span>
                    <span>Instructions</span>
                    { (user.role === 'Administrator' || user.role === 'Senior Developer') && <span>Actions</span> }
                </div>
                <ul className="styledul">
                    { fetchAssignedTasks }
                </ul>
            </div>
        </>
    )
}

export default MainTasks