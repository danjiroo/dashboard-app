import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { registerUser } from '../../../../store/actions/allUsersActions';

const ModalRegister = ({newUser, setModalRegister, setNewUser}) => {
    const [success, setSuccess] = useState(false)
    const modalRef = useRef();
    const dispatch = useDispatch();

    const handleRegister = e => {
        e.preventDefault();
        dispatch(registerUser(newUser));
        setSuccess(true)
        setNewUser({
            name: '',
            password: '123',
            role: '',
            email: ''
        })
    }

    useEffect(() => {
        const handleClickOutside = e => {
          if (modalRef.current && !modalRef.current.contains(e.target)) {
            setModalRegister(false)
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
                    <div className="modal_close" onClick={() => setModalRegister(false)}>
                        <span>x</span>
                    </div>
                    <div className="modal_body">
                        { !success ? (
                            <>
                                <h3>Register</h3>
                                <p>Add <strong>{newUser.name}</strong> to our database?</p>
                                <div className="modal_confirm">
                                    <button onClick={handleRegister}>Yes</button>
                                    <button onClick={() => setModalRegister(false)}>No</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3>Success!</h3>
                                <p>Added user to our database!</p>
                                <div className="modal_confirm">
                                    <button onClick={() => setModalRegister(false)}>Close</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalRegister
