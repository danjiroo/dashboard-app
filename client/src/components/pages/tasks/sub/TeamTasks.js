import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';

import ModalAssignTask from './ModalAssignTask';
import ModalModifyTask from './ModalModifyTask';

import { getAssignedTask, createTask, deleteAssignedTask } from '../../../../store/actions/taskActions';

const TeamTasks = () => {
    const auth = useSelector(state => state.auth);
    const { user } = auth;

    const [modalAssign, setModalAssign] = useState(false);
    const [modalModifyTask, setModalModifyTask] = useState(false);
    const [assignedTask, setAssignedTask] = useState({});
    const [modifyTask, setModifyTask] = useState({});
    const dispatch = useDispatch();

    const { assignedTasks } = useSelector(state => state.task);

    const handleReAssign = task => {
        setModalAssign(true)
        setAssignedTask(task)
    }

    const handleModify = task => {
        setModalModifyTask(true)
        setModifyTask(task)
    }

    const handleUnAssign = task => {
        dispatch(createTask(task))
        dispatch(deleteAssignedTask(task._id))
    }

    useEffect(() => {
        dispatch(getAssignedTask())
    }, [])
    
    const fetchAssignedTasks = assignedTasks.length ? (assignedTasks.map(assignedTask => {
        return (
            <li key={assignedTask._id}>
                <div className="taskdev"><Link to={`/employees/user/${assignedTask.assignedToEmpId}`}>{assignedTask.assignedTo}</Link></div>
                <div className="tasktitle">
                    <Link to={`/tasks/assigned/${assignedTask.taskId}`}><strong>{assignedTask.title}</strong></Link>
                    <div className="created">
                        <small>Created by: <Link to={`/employees/user/${assignedTask.createdByEmpId}`}>{assignedTask.createdBy}</Link></small>
                        <small>{moment(assignedTask.date).format('LLLL')}</small>
                    </div>
                </div>
                <div className="taskinstruction">{ReactHtmlParser(assignedTask.instruction)}</div>
                {/* <div className="instruction" dangerouslySetInnerHTML={{ __html: assignedTask.instruction }}></div> */}
                { (user.role === 'Administrator' || user.role === 'Senior Developer') && (
                    <div className="taskactions">
                        <button onClick={() => handleReAssign(assignedTask)}>Re-assign</button>
                        <button onClick={() => handleModify(assignedTask)}>Modify</button>
                        <button onClick={() => handleUnAssign(assignedTask)}>Un-assign</button>
                    </div>
                )}
            </li>
        )
    })) : (
        <li className="stylednoresult">No task found...</li>
    )

    return (
        <>
            { modalAssign && <ModalAssignTask setModalAssign={setModalAssign} assignedTask={assignedTask} assign={'reassign'} /> }
            { modalModifyTask && <ModalModifyTask setModalModifyTask={setModalModifyTask} modifyTask={modifyTask} modify={'remodify'} /> }
            <div className="main_right_con col-4">
                <div className="styledtitle">
                    <h3>Team Tasks</h3>
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

export default TeamTasks