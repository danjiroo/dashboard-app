import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ModalRegister from './ModalRegister';

import { getAllUsers } from '../../../../store/actions/allUsersActions';

const Register = ({setHidden, users}) => {
    const [modalRegister, setModalRegister] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: 'code',
        role: '',
        birth: '',
        gender: 'Male'
    });
    const [regError, setRegError] = useState(null);
    const dispatch = useDispatch();

    const handleFocus = () => {
        if(window.innerWidth < 1200 && window.innerWidth > 600 ) {
            setHidden(false)
        }
    }
    // const handleBlur = () => window.innerWidth > 1200 ? setHidden(false) : setHidden(true) // buggy ang quick links

    const handleChange = e => {
        setRegError(null)
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }

    const getAge = birth => {
        var today = new Date();
        var birthDate = new Date(birth);
        var age = today.getFullYear() - birthDate.getFullYear();
        var month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(!newUser.name || !newUser.email || !newUser.role || !newUser.birth || !newUser.gender) {
            setRegError('Please fill out all fields!')
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
        if(getAge(newUser.birth) < 18) {
            setRegError(`${getAge(newUser.birth)}? Must be 18 years old and above!`)
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
                <div className="styledform register">
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
                            <select onChange={handleChange} value={newUser.role} name="role">
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
                                value={newUser.birth} 
                                onChange={handleChange} 
                            />
                        </label>
                        <label htmlFor="gender">
                            <q>Gender: *</q>
                            <div className="divgender">
                                <div 
                                    className={ newUser.gender === 'Male' ? 'checked divradio' : 'divradio' } 
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
                                    className={ newUser.gender === 'Female' ? 'checked divradio' : 'divradio' } 
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
                        <button type="submit">Register</button>
                    </form>
                    { regError ? <span className="spanerror">{ regError }</span> : null }
                </div>
            </div>
        </>
    )
}

export default Register