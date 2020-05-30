import React from 'react';

import TasksLeft from './TasksLeft';
import TasksRight from './TasksRight';

const Tasks = ({hidden, setHidden}) => {
    return (
        <>
            <h2>Tasks</h2>
            <div className="main_con tasks">
                <div className={ hidden ? 'hidden main_left' : 'main_left' }>
                    <TasksLeft hidden={hidden} setHidden={setHidden} />
                </div>
                <div className={ hidden ? 'hidden main_right' : 'main_right' }>
                    <TasksRight/>
                </div>
            </div>
        </>
    )
}

export default Tasks