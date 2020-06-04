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
        case 'MODIFY_TASK': {
            return {
                ...state,
                tasks: state.tasks.filter(task => {
                    if (task._id === action.payload._id) {
                        task.title = action.payload.title
                        task.instruction = action.payload.instruction
                    }
                    return { ...state.tasks, task }
                })
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
        case 'MODIFY_ASSIGNED_TASK': {
            return {
                ...state,
                assignedTasks: state.assignedTasks.filter(task => {
                    if (task._id === action.payload._id) {
                        task.title = action.payload.title
                        task.instruction = action.payload.instruction
                    }
                    return { ...state.assignedTasks, task }
                })
            }
        }
        case 'RE_ASSIGN_TASK': {
            return {
                ...state,
                assignedTasks: state.assignedTasks.filter(task => {
                    if (task._id === action.payload._id) {
                        console.log(task._id, action.payload._id)
                        console.log(task.assignedTo, action.payload.assignedTo)
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