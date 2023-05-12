import * as types from '../constants';
import * as cookie from '../../common/cookie';

const INIT_STATE = {
    isAuthenticated: true,
    ld_auth: false,
    clientInfo : {},
    inviteInfo: {},
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case types.ISAUTH_FLAG: {
            return {        
                ...state,
                isAuthenticated: action.payload,
            }
        }

        case types.REGISTER_START: 
        case types.INVITE_REPLY_START: 
        case types.GET_INVITE_INFO_START: 
        case types.LOGIN_START: 
        case types.UPDATE_USERPASSWORD_START: 
        case types.GET_USER_PROFILE_START: {
            return { ...state, ld_auth: true, }
        }

        case types.REGISTER_SUCCESS: 
        case types.REGISTER_FAILED: 
        case types.INVITE_REPLY_SUCCESS: 
        case types.INVITE_REPLY_FAILED: 
        case types.GET_INVITE_INFO_FAILED: 
        case types.LOGIN_FAILED:
        case types.UPDATE_USERPASSWORD_SUCCESS: 
        case types.UPDATE_USERPASSWORD_FAILED: 
        case types.GET_USER_PROFILE_FAILED: {
            return { ...state, ld_auth: false, isAuthenticated: false, clientInfo : {}, }
        }

        case types.GET_INVITE_INFO_SUCCESS: {
            return { ...state, ld_auth: false, isAuthenticated: false, inviteInfo: action.payload }
        } 

        case types.LOGIN_SUCCESS: {
            return { ...state, ld_auth: false, isAuthenticated: true, clientInfo: action.payload }
        } 

        case types.GET_USER_PROFILE_SUCCESS: {
            return { ...state, ld_auth: false, isAuthenticated: true, clientInfo: action.payload.user }
        } 

        case types.LOGOUT_START: {    
            cookie.eraseCookie(types.TOKEN);
            return {        
                ...state,
                isAuthenticated: false,
            }
        }
        case types.LOGOUT_SUCCESS:
        {
            cookie.eraseCookie(types.TOKEN);      
            return {        
                ...state,
                isAuthenticated: false,                
            }
        }
        
        default:
            return state;
    }
}
