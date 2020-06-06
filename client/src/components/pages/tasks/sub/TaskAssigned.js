import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';

import ModalAssignTask from './ModalAssignTask';
import ModalModifyTask from './ModalModifyTask';
import ModalDeleteTask from './ModalDeleteTask';

import { getAssignedTask, createTask, deleteAssignedTask } from '../../../../store/actions/taskActions';

const TaskAssigned = () => {
    const [modalAssign, setModalAssign] = useState(false);
    const [modalModifyTask, setModalModifyTask] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [assignedTask, setAssignedTask] = useState({});
    const [modifyTask, setModifyTask] = useState({});
    const history = useHistory();

    const { id } = useParams();
    const { assignedTasks } = useSelector(state => state.task);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

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
        setTimeout(() => {
            history.push('/tasks/pending')
        }, 500)
    }

    // para ig refresh makuha gihapon
    useEffect(() => {
        dispatch(getAssignedTask())
    }, [])

    return (
        <>
            { modalAssign && <ModalAssignTask setModalAssign={setModalAssign} assignedTask={assignedTask} assign={'reassign'} /> }
            { modalModifyTask && <ModalModifyTask setModalModifyTask={setModalModifyTask} modifyTask={modifyTask} modify={'remodify'} /> }
            { modalDelete && <ModalDeleteTask setModalDelete={setModalDelete} deleteID={deleteID} /> }
            {assignedTasks.filter(taskkk => taskkk._id === id).map(task => {
                return (
                    <div key={task._id} className="main_right_con">
                        <div className="styledtitle">
                            <h3>Title: {task.title}</h3>
                        </div>
                        <ul className="viewtask">
                            <li>
                                <div className="divgroup">
                                    <strong>Assigned to:</strong>
                                    { task.assignedTo ? (
                                        <div><Link to={`/employees/user/${task.assignedTo}`}>{task.assignedTo}</Link></div>
                                    ) : <div style={{color: 'red'}}>Unassigned</div> }
                                </div>
                                <div className="divgroup">
                                    <strong>Created By:</strong>
                                    <div><Link to={`/employees/user/${task.createdBy}`}>{task.createdBy}</Link></div>
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
                                        <button onClick={() => handleReAssign(task)}>Re-assign</button>
                                        <button onClick={() => handleModify(task)}>Modify</button>
                                        <button onClick={() => handleUnAssign(task)}>Un-assign</button>
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

export default TaskAssigned
