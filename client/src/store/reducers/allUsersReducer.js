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
        case 'CREATE_USER': {
            return {
                ...state,
                users: [ action.payload, ...state.users ]
            }
        }
        case 'MODIFY_USER': {
            return {
                ...state,
                users: state.users.filter(user => {
                    if (user._id === action.payload.id) {
                        user.name = action.payload.name
                        user.role = action.payload.role
                        user.email = action.payload.email
                    }
                    return { ...state.users, user }
                })
            }
        }
        case 'DELETE_USER': {
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
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