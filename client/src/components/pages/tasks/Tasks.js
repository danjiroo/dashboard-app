import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import TasksLeft from './TasksLeft';
import TasksRight from './TasksRight';
import ModalCreateTask from './sub/ModalCreateTask';

const Tasks = ({hidden, setHidden}) => {
    const [modalCreate, setModalCreate] = useState(false);
    const auth = useSelector(state => state.auth);
    const { user } = auth;

    const adminCreateBtn = () => <button className="styledbtn" onClick={() => setModalCreate(true)} > Create Task </button>

    return (
        <>
            <div className="main_head">
                <h2>Tasks</h2>
                {
                    (user.role === 'Administrator' || user.role === 'Senior Developer')
                    && <Route path="/tasks/pending" component={adminCreateBtn} />
                }
            </div>
            <div className="main_con tasks">
                <div className={ hidden ? 'hidden main_left' : 'main_left' }>
                    <TasksLeft hidden={hidden} setHidden={setHidden} user={user} />
                </div>
                <div className={ hidden ? 'hidden main_right' : 'main_right' }>
                    <TasksRight user={user} />
                </div>
            </div>
            { modalCreate && <ModalCreateTask setModalCreate={setModalCreate} /> }
        </>
    )
}

export default Tasks