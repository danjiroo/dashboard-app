import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

import ModalCreateTask from './ModalCreateTask';
import ModalDeleteTask from './ModalDeleteTask';

import { getTask } from '../../../../store/actions/taskActions';

const AdminPendingTasks = () => {
    const [modalCreate, setModalCreate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [deleteID, setDeleteID] = useState('');
    const dispatch = useDispatch();

    const { tasks } = useSelector(state => state.task);

    const handleDelete = id => {
        setModalDelete(true)
        setDeleteID(id)
    }

    useEffect(() => {
        dispatch(getTask())
    }, [])
    
    const fetchTasks = tasks.length ? (tasks.map(task => {
        return (
            <li key={task._id}>
                <strong>{task.title}</strong>
                <div className="instruction">{ReactHtmlParser(task.instruction)}</div>
                {/* <div className="instruction" dangerouslySetInnerHTML={{ __html: task.instruction }}></div> */}
                <div>
                    <button>Assign</button>
                    <button onClick={() => handleDelete(task._id)}>Delete</button>
                </div>  
            </li>
        )
    })) : (
        <li className="stylednoresult">No task found...</li>
    )

    return (
        <>
            { modalCreate && <ModalCreateTask setModalCreate={setModalCreate} /> }
            { modalDelete && <ModalDeleteTask setModalDelete={setModalDelete} deleteID={deleteID} /> }
            <div className="main_right_con">
                <button className="styledbtn" onClick={() => setModalCreate(true)}>Create Task</button>
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