import {AUTH_ACTION_TYPES} from '../actionsType/AuthActionTypes'
import {AsyncStorage} from 'react-native'

const initialState = {
    loading: false,
    data: null,
    error: '',
};

const AuthReducer = (state = initialState, action) => {
    // console.log('action-', action)
    switch (action.type) {
        case AUTH_ACTION_TYPES.API_PENDING:
            return {
                ...state,
                loading: true,
            }
        case AUTH_ACTION_TYPES.API_SUCCESS:
            // console.log('action-', action)
            const Token = action.data.data[0].accessToken
            AsyncStorage.setItem('Token', Token)
            return {
                ...state,
                data: action.payload,
                loading: false,
            }
        case AUTH_ACTION_TYPES.API_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        default:
            return state
    }
};

export default AuthReducer
