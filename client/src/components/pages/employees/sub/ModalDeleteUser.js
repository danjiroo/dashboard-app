import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { deleteUser } from '../../../../store/actions/allUsersActions';

const ModalDeleteUser = ({setModalDeleteUser, selectedUser, user}) => {
    const [deleteError, setDeleteError] = useState(false)
    const modalRef = useRef();
    const dispatch = useDispatch();

    const handleDelete = e => {
        e.preventDefault();
        if(selectedUser.id === user._id) {
            setDeleteError(true);
            return;
        }
        dispatch(deleteUser(selectedUser.id));
        setModalDeleteUser(false)
    }

    useEffect(() => {
        const handleClickOutside = e => {
          if (modalRef.current && !modalRef.current.contains(e.target)) {
            setModalDeleteUser(false)
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef]);

    return (
        <div className="modal deletetask deleteuser">
            <div className="modal_con" ref={modalRef}>
                <div className="modal_div">
                    <div className="modal_close" onClick={() => setModalDeleteUser(false)}>
                        <span>x</span>
                    </div>
                    <div className="modal_body">
                        <h3>Delete User</h3>
                        { deleteError && <p className="spanerror">You can't delete yourself, duh...</p> }
                        <p>Remove <strong>{selectedUser.name}</strong> from our database?</p>
                        <div className="modal_confirm">
                            <button onClick={handleDelete}>Yes</button>
                            <button onClick={() => setModalDeleteUser(false)}>No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalDeleteUser
