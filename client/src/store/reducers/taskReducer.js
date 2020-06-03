const initState = {
    tasks: [],
    assignedTasks: [],
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
        case 'GET_ASSIGNED_TASK': {
            return {
                ...state,
                assignedTasks: action.payload.sort((a, b) => (a.assignedTo > b.assignedTo) ? 1 : -1),
                loading: false
            }
        }
        case 'ASSIGN_TASK': {
            return {
                ...state,
                assignedTasks: [ action.payload, ...state.assignedTasks ]
            }
        }
        case 'RE_ASSIGN_TASK': {
            return {
                ...state,
                assignedTasks: state.assignedTasks.filter(task => {
                    if (task._id === action.payload.id) {
                        task.assignedTo = action.payload.assignedTo
                    }
                    return { ...state.assignedTasks, task }
                })
            }
        }
        case 'DELETE_ASSIGNED_TASK': {
            return {
                ...state,
                assignedTasks: state.assignedTasks.filter(assignedTask => assignedTask._id !== action.payload)
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