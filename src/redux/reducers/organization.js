import * as types from '../constants';

const INIT_STATE = {
    ld_org1: false,
    ld_org2: false,

    
    orgInfoList: {},
    allOrgList: {},
    orgList: [],
    orgData: {},
};


export default (state = INIT_STATE, action) => {

  switch (action.type) {

        case types.GET_ORGANIZATION_INFO_LIST_START:
            { return { ...state, ld_org2: true, } }
    
        // case types.INSERT_ORGANIZATION_START: 
        // case types.GET_ORGANIZATION_LIST_START: 
        case types.GET_ALL_ORGANIZATION_LIST_START:
        case types.UPDATE_ORGANIZATION_STATUS_START:
        case types.GET_ORGANIZATION_DATA_START:
        case types.DELETE_ORGANIZATION_START:
        // case types.UPDATE_ORGANIZATION_START:
            { return { ...state, ld_org1: true, } }
        
        case types.GET_ORGANIZATION_INFO_LIST_FAILED:
        { return { ...state, ld_org2: false, } }

        // case types.INSERT_ORGANIZATION_SUCCESS:
        // case types.INSERT_ORGANIZATION_FAILED:
        // case types.GET_ORGANIZATION_LIST_FAILED:
        case types.GET_ALL_ORGANIZATION_LIST_FAILED:
        case types.UPDATE_ORGANIZATION_STATUS_SUCCESS:
        case types.UPDATE_ORGANIZATION_STATUS_FAILED:
        case types.GET_ORGANIZATION_DATA_FAILED:
        case types.DELETE_ORGANIZATION_SUCCESS:
        case types.DELETE_ORGANIZATION_FAILED:
        // case types.UPDATE_ORGANIZATION_SUCCESS:
        // case types.UPDATE_ORGANIZATION_FAILED:
            { return { ...state, ld_org1: false, } }
        
        // case types.GET_ORGANIZATION_LIST_SUCCESS: {
        //     return { ...state, ld_org1: false, orgList: action.payload }
        // }
        
        case types.GET_ORGANIZATION_INFO_LIST_SUCCESS: {
            return { ...state, ld_org2: false, orgInfoList: action.payload }
        }
        
        case types.GET_ALL_ORGANIZATION_LIST_SUCCESS: {
            return { ...state, ld_org1: false, allOrgList: action.payload }
        }

        case types.GET_ORGANIZATION_DATA_SUCCESS: {
            return { ...state, ld_org1: false, orgData: action.payload }
        }
        
        default:
            return state;
    }

}
