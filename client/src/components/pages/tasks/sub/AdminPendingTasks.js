import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';

import ModalAssignTask from './ModalAssignTask';
import ModalModifyTask from './ModalModifyTask';
import ModalDeleteTask from './ModalDeleteTask';

import { getTask } from '../../../../store/actions/taskActions';

const AdminPendingTasks = () => {
    const [modalAssign, setModalAssign] = useState(false);
    const [modalModifyTask, setModalModifyTask] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [assignedTask, setAssignedTask] = useState({});
    const [modifyTask, setModifyTask] = useState({});
    const [deleteID, setDeleteID] = useState('');
    const dispatch = useDispatch();

    const { tasks } = useSelector(state => state.task);

    const handleDelete = id => {
        setModalDelete(true)
        setDeleteID(id)
    }

    const handleAssign = task => {
        setModalAssign(true)
        setAssignedTask(task)
    }

    const handleModify = task => {
        setModalModifyTask(true)
        setModifyTask(task)
    }

    useEffect(() => {
        dispatch(getTask())
    }, [])
    
    const fetchTasks = tasks.length ? (tasks.map(task => {
        return (
            <li key={task._id}>
                <div className="tasktitle">
                    <Link to={`/tasks/${task._id}`}><strong>{task.title}</strong></Link>
                    <div className="created">
                        <small>Created by: <Link to={`/employees/user/${task.createdBy.split(' ').join('-')}`}>{task.createdBy.split(' ').slice(0, 1).join(' ')}</Link></small>
                        <small>{moment(task.date).format('LLLL')}</small>
                    </div>
                </div>
                <div className="taskinstruction">{ReactHtmlParser(task.instruction)}</div>
                {/* <div className="instruction" dangerouslySetInnerHTML={{ __html: task.instruction }}></div> */}
                <div className="taskactions">
                    <button onClick={() => handleAssign(task)}>Assign</button>
                    <button onClick={() => handleModify(task)}>Modify</button>
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
            { modalModifyTask && <ModalModifyTask setModalModifyTask={setModalModifyTask} modifyTask={modifyTask} /> }
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