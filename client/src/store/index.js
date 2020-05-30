import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './rootReducer';

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(Thunk)
    )
)

export default store;