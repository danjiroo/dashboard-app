/* eslint-disable no-unused-vars */
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnError } from './errorActions';

const apiBaseUrl = import.meta.env.MODE === 'development' ? '' : import.meta.env.VITE_API_BASE_URL

export const getAllUsers = () => dispatch => {
    dispatch(setLoadingUsers())
    axios.get(`${apiBaseUrl}/api/users`)
        .then(res => 
            dispatch({
                type: 'GET_ALL_USERS',
                payload: res.data
            })
        )
        .catch(err => console.error(err))
}

export const registerUser = newUser => (dispatch, getState) => {
    axios.post(`${apiBaseUrl}/api/users`, newUser, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: 'CREATE_USER',
                payload: res.data
            })
        })
        .then(res => dispatch({
            type: 'CLEAR_ERROR'
        }))
        .catch(err => dispatch(returnError(err.response.data, err.response.status, 'REGISTER_FAILED')))
}

export const modifyUser = selectedUserToModify => (dispatch, getState) => {
    axios.put(`${apiBaseUrl}/api/users/${selectedUserToModify._id}`, selectedUserToModify, tokenConfig(getState)).then(res => {
            dispatch({
                type: 'MODIFY_USER',
                payload: res.data
            })
        }
    );
    dispatch(getAllUsers())
}

export const deleteUser = id => (dispatch, getState) => {
    axios.delete(`${apiBaseUrl}/api/users/${id}`, tokenConfig(getState)).then(res => {
            dispatch({
                type: 'DELETE_USER',
                payload: id
            })
        }
    );
}

export const setLoadingUsers = () => {
    return {
        type: 'LOADING_USERS'
    }
}