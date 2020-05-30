import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { login } from '../../store/actions/authActions';

const Login = () => {
    const [ msg, setMsg ] = useState(null);
    const [ user, setUser ] = useState({
        email: '',
        password: ''
    });

    const error = useSelector(state => state.error);
    const dispatch = useDispatch();

    // show or hide password
    const passRef = useRef(null);
    const [ active, setActive ] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        const { email, password } = user;
        dispatch(login(email, password));
    }

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if(error.id === 'LOGIN_FAILED') {
            setMsg(error.msg.msg)
        } else {
            setMsg(null)
        }
    })

    const handleViewPassword = () => {
        if ( passRef.current.type === 'password' ) {
            passRef.current.type = 'text';
            setActive(true)
        } else {
            passRef.current.type = 'password';
            setActive(false)
        }
    }

    return (
        <div className="login">
            <div className="login_con">
                <div className="login_body">
                    <h2>Codeyuri</h2>
                    <h5>Login { msg ? <span>{ msg }</span> : null }</h5>
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" onChange={e => handleChange(e)} placeholder="Email address..." />
                        <div className="password_div">
                            <input type="password" ref={passRef} name="password" onChange={e => handleChange(e)} placeholder="Password..." />
                            <span title="Toggle Hide/Show Password" className={ active ? 'active checkbox' : 'checkbox' } onClick={handleViewPassword}></span>
                        </div>
                        <div className="submit_div">
                            <button type="submit">Login</button>
                        </div>
                    </form>
                    <p>Dev: Dan Quesada III</p>
                </div>
            </div>
        </div>
    )
}

export default Login
