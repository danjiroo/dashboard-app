import { combineReducers } from 'redux';
import taskReducer from './reducers/taskReducer';
import errorReducer from './reducers/errorReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
    task: taskReducer,
    error: errorReducer,
    auth: authReducer
})

export default rootReducer;