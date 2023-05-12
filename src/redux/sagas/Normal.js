import { put, takeEvery, all } from 'redux-saga/effects';

import * as types from '../constants';
import * as cookie from '../../common/cookie';

// component
import swal from 'sweetalert';

function errorMessage(error) {
    let errorMessage;
    switch (error.status) {
        case 500: errorMessage = 'Internal Server Error'; swal("Sever connect error. Please try again."); break;
        case 422: errorMessage = 'Invalid credentials'; swal("Sever connect error. Please try again."); break;
        default: errorMessage = 'Something went wrong'; break;
    }

    return errorMessage;
}

function* postCall(action) {    

    let token = cookie.getCookie('fair_data_kosu');

    let actionType = action.type.split('_START')[0];

    if (token === null || token === '' || token === undefined) {
        yield put({ type: types.LOGOUT_SUCCESS});
        yield put({ type: types[actionType + '_FAILED']});
        return ;
    }

    try {
        const jsondata = yield fetch(types[actionType+'_URL'], {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-access-token': token},
            body: action.payload
        })
        .then( response => response.json())
        
        if (jsondata !== undefined && jsondata.code === 1) {
            yield put({ type: types[actionType + '_SUCCESS'], payload: jsondata.data});
            action.callback();
        } else {
            swal(jsondata.msg);
            yield put({ type: types[actionType + '_FAILED']});
        }
    }catch (error) {
        yield put({ type: types[actionType + '_FAILED'] });
        errorMessage(error);
    }       
}

function* actionWatcherNormal() {
    yield takeEvery(types.GET_QUESTION_LIST_START, postCall);
    yield takeEvery(types.GET_QUESTION_DATA_START, postCall);
    yield takeEvery(types.INSERT_QUESTION_START, postCall);
    yield takeEvery(types.UPDATE_QUESTION_START, postCall);
    yield takeEvery(types.DELETE_QUESTION_START, postCall);

}


export default function* Normal() {
    yield all([
        actionWatcherNormal(),
    ]);
}
