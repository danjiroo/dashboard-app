import axios from 'axios';
import { returnError } from './errorActions';

// check token first then load user
export const loadUser = () => (dispatch, getState) => {

    // user loads
    dispatch({ type: 'USER_LOADING' });

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: 'USER_LOADED',
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnError(err.response.data, err.response.status));
            dispatch({ type: 'AUTH_ERROR' })
        })
}

export const login = (email, password) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    const body = JSON.stringify({email, password});

    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data
        }))
        .then(res => dispatch({
            type: 'CLEAR_ERROR'
        }))
        .catch(err => {
            dispatch(returnError(err.response.data, err.response.status, 'LOGIN_FAILED'));
            dispatch({ type: 'LOGIN_FAILED' });
        })
}

export const logout = () => {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

// config headers and token
export const tokenConfig = getState => {
    // get token gikan sa localstorage
    const token = getState().auth.token;

    // cors headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // if token is valid, add to headers
    if(token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}

//  export const register = ({name, email, password, role}) => dispatch => {
//     const config = {
//         headers: {
//             "Content-type": "application/json"
//         }
//     }

//     const body = JSON.stringify({name, email, password, role});

//     axios.post('/api/users', body, config)
//         .then(res => dispatch({
//             type: 'REGISTER_SUCCESS',
//             payload: res.data
//         }))
//         .then(res => dispatch({
//             type: 'CLEAR_ERROR'
//         }))
//         .catch(err => {
//             dispatch(returnError(err.response.data, err.response.status, 'REGISTER_FAILED'));
//             // dispatch({ type: 'REGISTER_FAILED' });
//         })
// }