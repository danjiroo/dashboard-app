import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';

import ModalAssignTask from './ModalAssignTask';
import ModalDeleteTask from './ModalDeleteTask';

import { getTask } from '../../../../store/actions/taskActions';

const AdminPendingTasks = () => {
    const [modalAssign, setModalAssign] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [assignedTask, setAssignedTask] = useState({});
    const [deleteID, setDeleteID] = useState('');
    const dispatch = useDispatch();

    const { tasks } = useSelector(state => state.task);

    const handleDelete = id => {
        setModalDelete(true)
        setDeleteID(id)
    }

    const handleAssign = (id, title, instruction, name) => {
        setModalAssign(true)
        setAssignedTask({ id, title, instruction, name })
    }

    useEffect(() => {
        dispatch(getTask())
    }, [])
    
    const fetchTasks = tasks.length ? (tasks.map(task => {
        return (
            <li key={task._id}>
                <div>
                    <strong>{task.title}</strong>
                    <div className="created">
                        <small>Created by: {task.createdBy}</small>
                        <small>{moment(task.date).format('LLLL')}</small>
                    </div>
                </div>
                <div className="instruction">{ReactHtmlParser(task.instruction)}</div>
                {/* <div className="instruction" dangerouslySetInnerHTML={{ __html: task.instruction }}></div> */}
                <div>
                    <button onClick={() => handleAssign(task._id, task.title, task.instruction, task.createdBy)}>Assign</button>
                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                </div>  
            </li>
        )
    })) : (
        <li className="stylednoresult">No task found...</li>
    )

    return (
        <>
            { modalAssign && <ModalAssignTask setModalAssign={setModalAssign} assignedTask={assignedTask} assign={'assign'} /> }
            { modalDelete && <ModalDeleteTask setModalDelete={setModalDelete} deleteID={deleteID} /> }
            <div className="main_right_con">
                <div className="styledtitle">
                    <h3>Pending Tasks</h3>
                </div>
                <div className="styledsubtitle">
                    <span>Title</span>
                    <span>Instructions</span>
                    <span>Actions</span>
                </div>
                <ul className="styledul">
                    { fetchTasks }
                </ul>
            </div>
        </>
    )
}

export default AdminPendingTasks