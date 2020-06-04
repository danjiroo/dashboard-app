import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deleteTask } from '../../../../store/actions/taskActions';

const ModalDeleteTask = ({setModalDelete, deleteID}) => {
    const modalRef = useRef();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = e => {
        e.preventDefault();
        dispatch(deleteTask(deleteID));
        setModalDelete(false)
        setTimeout(() => {
            history.push('/tasks/pending')
        }, 500)
    }

    useEffect(() => {
        const handleClickOutside = e => {
          if (modalRef.current && !modalRef.current.contains(e.target)) {
            setModalDelete(false)
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef]);

    return (
        <div className="modal deletetask">
            <div className="modal_con" ref={modalRef}>
                <div className="modal_div">
                    <div className="modal_close" onClick={() => setModalDelete(false)}>
                        <span>x</span>
                    </div>
                    <div className="modal_body">
                        <h3>Delete Task</h3>
                        <p>Delete selected task?</p>
                        <div className="modal_confirm">
                            <button onClick={handleDelete}>Yes</button>
                            <button onClick={() => setModalDelete(false)}>No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDeleteTask
