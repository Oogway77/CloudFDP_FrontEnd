import * as types from '../constants';

const INIT_STATE = {
    ld_normal: false,

    questionList: [],
    questionData: {},
};


export default (state = INIT_STATE, action) => {

    switch (action.type) {
        
        // normal type
        case types.GET_QUESTION_LIST_START: 
        case types.GET_QUESTION_DATA_START:
        case types.INSERT_QUESTION_START:
        case types.UPDATE_QUESTION_START:
        case types.DELETE_QUESTION_START:
            { return { ...state, ld_normal: true, } }
        
        case types.GET_QUESTION_LIST_FAILED:
        case types.GET_QUESTION_DATA_FAILED:
        case types.INSERT_QUESTION_SUCCESS:
        case types.INSERT_QUESTION_FAILED:
        case types.UPDATE_QUESTION_SUCCESS:
        case types.UPDATE_QUESTION_FAILED:
        case types.DELETE_QUESTION_SUCCESS:
        case types.DELETE_QUESTION_FAILED:
            { return { ...state, ld_normal: false, } }
        
        case types.GET_QUESTION_LIST_SUCCESS: {
            return {        
                ...state,
                ld_normal: false,

                questionList: action.payload,
            }
        }

        case types.GET_QUESTION_DATA_SUCCESS: {
            return {        
                ...state,
                ld_normal: false,

                questionData: action.payload,
            }
        }
        
        default:
            return state;
    }

}
