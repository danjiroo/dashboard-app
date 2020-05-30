import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

import ModalCreateTask from './ModalCreateTask';
import ModalDeleteTask from './ModalDeleteTask';

const AdminPendingTasks = () => {
    const [modalCreate, setModalCreate] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [deleteID, setDeleteID] = useState('');

    const { tasks } = useSelector(state => state.task);

    const handleDelete = id => {
        setModalDelete(true)
        setDeleteID(id)
    }
    
    const fetchTasks = tasks.length ? (tasks.map(task => {
        return (
            <li key={task.id}>
                <strong>{task.title}</strong>
                <div className="instruction">{ReactHtmlParser(task.instruction)}</div>
                {/* <div className="instruction" dangerouslySetInnerHTML={{ __html: task.instruction }}></div> */}
                <div>
                    <button>Assign</button>
                    <button onClick={() => handleDelete(task.id)}>Delete</button>
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