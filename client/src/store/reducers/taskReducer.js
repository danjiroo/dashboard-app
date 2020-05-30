const initState = {
    tasks: [],
    loading: false
}

const taskReducer = (state = initState, action) => {
    switch(action.type) {
        case 'GET_TASK': {
            return {
                ...state,
                tasks: action.payload,
                loading: false
            }
        }
        case 'CREATE_TASK': {
            return {
                ...state,
                tasks: [ action.payload, ...state.tasks ]
            }
        }
        case 'DELETE_TASK': {
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload)
            }
        }
        case 'LOADING_TASK': {
            return {
                ...state,
                loading: true
            }
        }
        default:
            return state
    }
}

export default taskReducer;