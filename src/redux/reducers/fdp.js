import * as types from '../constants';

const INIT_STATE = {
    ld_fdp: false,

    orgFdpList: {},

    fdpRecentList: [],
    fdpData: {},
    fdpDtStatus: {},
};


export default (state = INIT_STATE, action) => {

  switch (action.type) {
    
        case types.GET_ORGANIZATION_FDP_LIST_START: 
        case types.INSERT_FDP_START: 
        case types.GET_FDP_RECENT_LIST_START: 
        case types.UPDATE_FDP_START:
        case types.DELETE_FDP_START:
        case types.UPDATE_FDP_STATUS_START:
        // case types.GET_FDP_DATA_START:
            { return { ...state, ld_fdp: true, } }
        
        case types.GET_ORGANIZATION_FDP_LIST_FAILED:
        case types.INSERT_FDP_SUCCESS:
        case types.INSERT_FDP_FAILED:
        case types.GET_FDP_RECENT_LIST_FAILED:
        case types.GET_FDP_DATA_FAILED:
        case types.UPDATE_FDP_SUCCESS:
        case types.UPDATE_FDP_FAILED:
        case types.DELETE_FDP_SUCCESS:
        case types.DELETE_FDP_FAILED:
        case types.UPDATE_FDP_STATUS_SUCCESS:
        case types.UPDATE_FDP_STATUS_FAILED:
            { return { ...state, ld_fdp: false, } }
        
        case types.GET_ORGANIZATION_FDP_LIST_SUCCESS: {
            return { ...state, ld_fdp: false, orgFdpList: action.payload }
        }
        
        case types.GET_FDP_RECENT_LIST_SUCCESS: {
            return { ...state, ld_fdp: false, fdpRecentList: action.payload }
        }

        case types.GET_FDP_DATA_SUCCESS: {
            return { ...state, ld_fdp: false, fdpData: action.payload }
        }
        
        case types.GET_FDP_DETAIL_STATUS_SUCCESS: {
            return { ...state, fdpDtStatus: action.payload }
        }
        
        case types.ERASER_FDP_DT_STATUS: {
            return { ...state, fdpDtStatus: {} }
        }
        
        default:
            return state;
    }

}
