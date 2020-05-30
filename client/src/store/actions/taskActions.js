import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnError } from './errorActions';

export const getTask = () => dispatch => {
    dispatch(setLoadingTask())
    axios.get('/api/tasks')
        .then(res => 
            dispatch({
                type: 'GET_TASK',
                payload: res.data
            })
        )
        .catch(err => dispatch(returnError(err.response.data, err.response.status)))
}

export const createTask = newtask => (dispatch, getState) => {
    axios.post('/api/tasks', newtask, tokenConfig(getState)).then(res => {
            dispatch({
                type: 'CREATE_TASK',
                payload: res.data
            })
            console.log(newtask)
        }
    );
}

export const deleteTask = id => (dispatch, getState) => {
    axios.delete(`/api/tasks/${id}`, tokenConfig(getState)).then(res => {
            dispatch({
                type: 'DELETE_TASK',
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