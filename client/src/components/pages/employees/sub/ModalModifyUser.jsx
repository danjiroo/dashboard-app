/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { loadUser } from '../../../../store/actions/authActions';
import { modifyUser } from '../../../../store/actions/allUsersActions';

const ModalModifyUser = ({users, selectedUser, setSelectedUser, setModalModifyUser}) => {
    const [regError, setRegError] = useState(null);
    const dispatch = useDispatch();
    
    const handleChange = e => {
        e.preventDefault();
        setRegError(null);
        setSelectedUser({...selectedUser, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(!selectedUser.name || !selectedUser.email || !selectedUser.role || !selectedUser.birth || !selectedUser.gender) {
            setRegError('Please fill out all fields!')
            return;
        }
        dispatch(modifyUser(selectedUser));
        dispatch(loadUser())
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
                        <div className="styledform modalmodify">
                            <h3>Modify User</h3>
                            { regError ? <span className="spanerror">{ regError }</span> : null }
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
                                        placeholder="code"
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
