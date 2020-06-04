import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';

import ModalAssignTask from './ModalAssignTask';
import ModalModifyTask from './ModalModifyTask';
import ModalDeleteTask from './ModalDeleteTask';

import { getTask } from '../../../../store/actions/taskActions';

const Task = () => {
    const [modalAssign, setModalAssign] = useState(false);
    const [modalModifyTask, setModalModifyTask] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [assignedTask, setAssignedTask] = useState({});
    const [modifyTask, setModifyTask] = useState({});
    const [deleteID, setDeleteID] = useState('');

    const { id } = useParams();
    const { tasks } = useSelector(state => state.task);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

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

    // para ig refresh makuha gihapon
    useEffect(() => {
        dispatch(getTask())
    }, [])

    return (
        <>
            { modalAssign && <ModalAssignTask setModalAssign={setModalAssign} assignedTask={assignedTask} assign={'assign'} /> }
            { modalModifyTask && <ModalModifyTask setModalModifyTask={setModalModifyTask} modifyTask={modifyTask} /> }
            { modalDelete && <ModalDeleteTask setModalDelete={setModalDelete} deleteID={deleteID} /> }
            {tasks.filter(taskkk => taskkk._id === id).map(task => {
                return (
                    <div key={task._id} className="main_right_con">
                        <div className="styledtitle">
                            <h3>Title: {task.title}</h3>
                        </div>
                        <ul className="viewtask">
                            <li>
                                <div className="divgroup">
                                    <strong>Assigned to:</strong>
                                    <div style={{color: 'red'}}>{task.assignedTo || 'Unassigned'}</div>
                                </div>
                                <div className="divgroup">
                                    <strong>Created By:</strong>
                                    <div>{task.createdBy}</div>
                                </div>
                            </li>
                            <li>
                                <div className="divgroup">
                                    <strong>Status:</strong>
                                    <div>(wala pa ni)</div>
                                </div>
                                <div className="divgroup">
                                	<strong>Date Created:</strong>
                                	<div>{moment(task.date).format('LLLL')}</div>
                                </div>
                            </li>
                            <li>
                                <div className="divgroup">
                                    <strong>Instruction:</strong>
                                    <div className="divinstruction">{ReactHtmlParser(task.instruction)}</div>
                                </div>
                            </li>
                            { (user.role === 'Administrator' || user.role === 'Senior Developer') && (
                            <li>
                                <div className="divgroup">
                                    <strong>Admin Actions</strong>
                                    <div>
                                        <button onClick={() => handleAssign(task)}>Assign</button>
                                        <button onClick={() => handleModify(task)}>Modify</button>
                                        <button onClick={() => handleDelete(task._id)}>Delete</button>
                                    </div>
                                </div>
                            </li> )}
                        </ul>
                    </div>
                )
            })}
        </>
    )
}

export default Task
