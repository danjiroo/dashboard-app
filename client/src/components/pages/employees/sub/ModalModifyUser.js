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
                                <label htmlFor="password">
                                    <q>Default Password:</q>
                                    <input 
                                        type="text" //text kay para visible pero disabled ang default password
                                        name="password" 
                                        placeholder="1234"
                                        disabled 
                                        onChange={handleChange} 
                                    />
                                </label>
                                <label htmlFor="role">
                                    <q>Position: *</q>
                                    <select onChange={handleChange} value={selectedUser.role} name="role">
                                        <option>Select Position</option>
                                        <option value="Administrator">Administrator</option>
                                        <option value="Senior Developer">Senior Developer</option>
                                        <option value="Web Developer">Web Developer</option>
                                        <option value="Trainee">Trainee</option>
                                    </select>
                                </label>
                                <label htmlFor="birth">
                                    <q>Date of Birth: *</q>
                                    <input 
                                        type="date" 
                                        name="birth" 
                                        value={selectedUser.birth} 
                                        onChange={handleChange} 
                                    />
                                </label>
                                <label htmlFor="gender">
                                    <q>Gender: *</q>
                                    <div className="divgender">
                                        <div 
                                            className={ selectedUser.gender === 'Male' ? 'checked divradio' : 'divradio' } 
                                        >Male
                                            <input 
                                                type="radio" 
                                                name="gender" 
                                                value="Male"
                                                onChange={handleChange} 
                                            />
                                            <span className="radiocheckmark"></span>
                                        </div>
                                        <div 
                                            className={ selectedUser.gender === 'Female' ? 'checked divradio' : 'divradio' } 
                                        >Female
                                        <input 
                                                type="radio" 
                                                name="gender" 
                                                value="Female"
                                                onChange={handleChange} 
                                            />
                                            <span className="radiocheckmark"></span>
                                        </div>
                                    </div>
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
