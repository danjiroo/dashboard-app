import { combineReducers } from 'redux';
import taskReducer from './reducers/taskReducer';
import errorReducer from './reducers/errorReducer';
import authReducer from './reducers/authReducer';
import allUsersReducer from './reducers/allUsersReducer';

const rootReducer = combineReducers({
    task: taskReducer,
    error: errorReducer,
    auth: authReducer,
    user: allUsersReducer,
})

export default rootReducer;