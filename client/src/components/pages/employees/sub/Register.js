import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ModalRegister from './ModalRegister';

import { getAllUsers } from '../../../../store/actions/allUsersActions';

const Register = ({setHidden, users}) => {
    const [modalRegister, setModalRegister] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        password: '123',
        role: '',
        email: ''
    });
    const [regError, setRegError] = useState(null);
    const dispatch = useDispatch();

    const handleFocus = () => {
        if(window.innerWidth > 1200) {
            setHidden(true)
        } else if (window.innerWidth > 600 ) {
            setHidden(false)
        } else {
            setHidden(true)
        }
    }
    // const handleBlur = () => window.innerWidth > 1200 ? setHidden(false) : setHidden(true) // buggy ang quick links

    const handleChange = e => {
        setRegError(null)
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(!newUser.name || !newUser.email || !newUser.role) {
            setRegError('Please fill out required fields!')
            return;
        }
        if(users.filter(user => user.name === newUser.name).length > 0) {
            setRegError('Name already taken!')
            return;
        }
        if(users.filter(user => user.email === newUser.email).length > 0) {
            setRegError('Email already used!')
            return;
        }
        setModalRegister(true)
    }

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    return (
        <>
            { modalRegister && <ModalRegister 
                setModalRegister={setModalRegister} 
                setNewUser={setNewUser} 
                newUser={newUser} 
            /> }
            <div className="main_right_con col-4">
                <div className="styledtitle">
                    <h3>Register</h3>
                </div>
                <div className="styledform">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">
                            <q>Name: *</q> 
                            <input 
                                type="text" 
                                name="name" 
                                value={newUser.name} 
                                placeholder="Name..." 
                                onFocus={handleFocus} 
                                onChange={handleChange} 
                            />
                        </label>
                        <label htmlFor="password">
                            <q>Default Password:</q>
                            <input 
                                type="text" 
                                name="password" 
                                placeholder="123"
                                disabled 
                                onFocus={handleFocus} 
                                onChange={handleChange} 
                            />
                        </label>
                        <label htmlFor="role">
                            <q>Position: *</q>
                            <input 
                                type="text" 
                                name="role" 
                                value={newUser.role} 
                                placeholder="Position..." 
                                onFocus={handleFocus} 
                                onChange={handleChange} 
                            />
                        </label>
                        <label htmlFor="email">
                            <q>Email Address: *</q>
                            <input 
                                type="email" 
                                name="email" 
                                value={newUser.email} 
                                placeholder="Email Address..." 
                                onFocus={handleFocus} 
                                onChange={handleChange} 
                            />
                        </label>
                        <button type="submit">Register</button>
                    </form>
                    { regError ? <span className="spanerror">{ regError }</span> : null }
                </div>
            </div>
        </>
    )
}

export default Register