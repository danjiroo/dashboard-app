/* eslint-disable no-unused-vars */
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnError } from './errorActions';

const apiBaseUrl = import.meta.env.MODE === 'development' ? '' : import.meta.env.VITE_API_BASE_URL

export const getTask = () => dispatch => {
    dispatch(setLoadingTask())
    axios.get(`${apiBaseUrl}/api/tasks`)
        .then(res => 
            dispatch({
                type: 'GET_TASK',
                payload: res.data
            })
        )
        .catch(err => dispatch(returnError(err.response.data, err.response.status)))
}

export const createTask = newtask => (dispatch, getState) => {
    axios.post(`${apiBaseUrl}/api/tasks`, newtask, tokenConfig(getState)).then(res => {
            dispatch({
                type: 'CREATE_TASK',
                payload: res.data
            })
        }
    );
}

export const editTask = modifyTask => (dispatch, getState) => {
    axios.put(`${apiBaseUrl}/api/tasks/${modifyTask._id}`, modifyTask, tokenConfig(getState)).then(res => {
            dispatch({
                type: 'MODIFY_TASK',
                payload: res.data
            })
        }
    );
    dispatch(getTask())
}

export const deleteTask = id => (dispatch, getState) => {
    axios.delete(`${apiBaseUrl}/api/tasks/${id}`, tokenConfig(getState)).then(res => {
            dispatch({
                type: 'DELETE_TASK',
                payload: id
            })
        }
    );
}

export const getAssignedTask = () => dispatch => {
    dispatch(setLoadingTask())
    axios.get(`${apiBaseUrl}/api/assignedTasks`)
        .then(res => 
            dispatch({
                type: 'GET_ASSIGNED_TASK',
                payload: res.data
            })
        )
        .catch(err => dispatch(returnError(err.response.data, err.response.status)))
}

export const assignTask = newAssignedtask => (dispatch, getState) => {
    axios.post(`${apiBaseUrl}/api/assignedTasks`, newAssignedtask, tokenConfig(getState)).then(res => {
            dispatch({
                type: 'ASSIGN_TASK',
                payload: res.data
            })
        }
    );
    dispatch(deleteTask(newAssignedtask._id))
}

export const editAssignedTask = modifyAssignedTask => (dispatch, getState) => {
    axios.put(`${apiBaseUrl}/api/assignedTasks/${modifyAssignedTask._id}`, modifyAssignedTask, tokenConfig(getState)).then(res => {
            dispatch({
                type: 'MODIFY_ASSIGNED_TASK',
                payload: res.data
            })
        }
    );
    setTimeout(() => {
        dispatch(getAssignedTask())
    }, 200)
}

export const reAssignTask = newAssignedTask => (dispatch, getState) => {
    axios.put(`${apiBaseUrl}/api/assignedTasks/dev/${newAssignedTask._id}`, newAssignedTask, tokenConfig(getState)).then(res => {
            dispatch({
                type: 'RE_ASSIGN_TASK',
                payload: res.data
            })
        }
    );
    setTimeout(() => {
        dispatch(getAssignedTask())
    }, 200)
}

export const deleteAssignedTask = id => (dispatch, getState) => {
    axios.delete(`${apiBaseUrl}/api/assignedTasks/${id}`, tokenConfig(getState)).then(res => {
            dispatch({
                type: 'DELETE_ASSIGNED_TASK',
                payload: id
            })
        }
    );
}

export const setLoadingTask = () => {
    return {
        type: 'LOADING_TASK'
    }
}