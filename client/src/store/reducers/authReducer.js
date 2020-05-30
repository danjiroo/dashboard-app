const initState = {
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('isAuthenticated'),
    user: localStorage.getItem('user'),
    isLoading: false
}

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case 'USER_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('isAuthenticated', true);
            localStorage.setItem('user', action.payload);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            }
        case 'AUTH_ERROR':
        case 'LOGIN_FAILED':
        case 'LOGOUT_SUCCESS':
        case 'REGISTER_FAILED':
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        default: return state
    }
}

export default authReducer;