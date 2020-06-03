import React from 'react';
import { useDispatch } from 'react-redux';

import { modifyUser } from '../../../../store/actions/allUsersActions';

const ModalModifyUser = ({selectedUser, setSelectedUser, setModalModifyUser}) => {
    const dispatch = useDispatch();
    
    const handleChange = e => {
        e.preventDefault()
        setSelectedUser({...selectedUser, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(modifyUser(selectedUser));
        setModalModifyUser(false)
    }

    return (
        <div className="modal">
            <div className="modal_con">
                <div className="modal_div">
                    <div className="modal_close" onClick={() => setModalModifyUser(false)}>
                        <span>x</span>
                    </div>
                    <div className="modal_body">
                        <div className="styledform">
                            <h3>Modify User</h3>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="name">
                                    <q>Name: *</q> 
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={selectedUser.name} 
                                        placeholder="Name..." 
                                        onChange={handleChange}
                                    />
                                </label>
                                <label htmlFor="password">
                                    <q>Default Password:</q>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        disabled
                                    />
                                </label>
                                <label htmlFor="role">
                                    <q>Position: *</q>
                                    <input 
                                        type="text" 
                                        name="role" 
                                        value={selectedUser.role} 
                                        placeholder="Position..." 
                                        onChange={handleChange}
                                    />
                                </label>
                                <label htmlFor="email">
                                    <q>Email Address: *</q>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={selectedUser.email} 
                                        placeholder="Email Address..." 
                                        onChange={handleChange}
                                    />
                                </label>
                                <button type="submit">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalModifyUser
