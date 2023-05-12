import * as types from '../constants';

const INIT_STATE = {
    ld_user1: false,
    ld_user2: false,

    orgUserList: [],
    userDashInfo: {},

    userRecentList: [],
    userData: {},
    userOrgData: {},
};


export default (state = INIT_STATE, action) => {

  switch (action.type) {
    
        case types.GET_ORGANIZATION_USER_LIST_START: 
        case types.GET_USER_DASHBOARD_INFO_START: 
        case types.GET_USER_RECENT_LIST_START: 
        case types.GET_USER_ORG_DATA_START:
        case types.DELETE_USER_START:
        case types.INVITE_USER_START: 
        case types.UPDATE_USER_STATUS_START:
        case types.UPDATE_USER_ROLE_START:
        case types.UPDATE_USER_PROFILE_START:
        case types.UPDATE_USER_ORG_INFO_START:
            { return { ...state, ld_user1: true, } }

        case types.GET_USER_DATA_START:
            { return { ...state, ld_user2: true, } }
        
        case types.GET_ORGANIZATION_USER_LIST_FAILED:
        case types.GET_USER_DASHBOARD_INFO_FAILED:
        case types.GET_USER_RECENT_LIST_FAILED:
        case types.GET_USER_ORG_DATA_FAILED:
        case types.DELETE_USER_SUCCESS:
        case types.DELETE_USER_FAILED:
        case types.INVITE_USER_SUCCESS:
        case types.INVITE_USER_FAILED:
        case types.UPDATE_USER_STATUS_SUCCESS:
        case types.UPDATE_USER_STATUS_FAILED:
        case types.UPDATE_USER_ROLE_SUCCESS:
        case types.UPDATE_USER_ROLE_FAILED:
        case types.UPDATE_USER_PROFILE_SUCCESS:
        case types.UPDATE_USER_PROFILE_FAILED:
        case types.UPDATE_USER_ORG_INFO_SUCCESS:
        case types.UPDATE_USER_ORG_INFO_FAILED:
            { return { ...state, ld_user1: false, } }

        case types.GET_USER_DATA_FAILED:
            { return { ...state, ld_user2: false, } }
        
        case types.GET_ORGANIZATION_USER_LIST_SUCCESS: {
            return { ...state, ld_user1: false, orgUserList: action.payload }
        }
        
        case types.GET_USER_DASHBOARD_INFO_SUCCESS: {
            return { ...state, ld_user1: false, userDashInfo: action.payload }
        }
        
        case types.GET_USER_RECENT_LIST_SUCCESS: {
            return { ...state, ld_user1: false, userRecentList: action.payload }
        }

        case types.GET_USER_ORG_DATA_SUCCESS: {
            return { ...state, ld_user1: false, userOrgData: action.payload }
        }

        case types.GET_USER_DATA_SUCCESS: {
            return { ...state, ld_user2: false, userData: action.payload }
        }
        
        default:
            return state;
    }

}
