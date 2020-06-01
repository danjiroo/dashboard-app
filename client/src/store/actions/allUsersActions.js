import axios from 'axios';

export const getAllUsers = () => dispatch => {
    dispatch(setLoadingUsers())
    axios.get('/api/users')
        .then(res => 
            dispatch({
                type: 'GET_ALL_USERS',
                payload: res.data
            })
        )
        .catch(err => console.log(err))
}

export const setLoadingUsers = () => {
    return {
        type: 'LOADING_USERS'
    }
}