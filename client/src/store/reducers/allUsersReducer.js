const initState = {
    users: [],
    loading: false
}

const allUsersReducer = (state = initState, action) => {
    switch(action.type) {
        case 'GET_ALL_USERS': {
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        }
        case 'LOADING_USERS': {
            return {
                ...state,
                loading: true
            }
        }
        default:
            return state
    }
}

export default allUsersReducer;