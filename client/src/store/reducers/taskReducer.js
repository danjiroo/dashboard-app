const initState = {
    tasks: []
}

const taskReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CREATE_TASK': 
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    {
                        id: action.id, 
                        title: action.title, 
                        instruction: action.instruction
                    }
                ]
            }
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.id)
            }
        default: return state
    }
}

export default taskReducer;