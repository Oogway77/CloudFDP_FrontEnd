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

function* tokenPostCall(action) {    
    
    let actionType = action.type.split('_START')[0];

    let token = cookie.getCookie(types.TOKEN);

    if (token === null || token === '' || token === undefined) {
        yield put({ type: types.LOGOUT_SUCCESS});
        yield put({ type: types[actionType + '_FAILED']});
        return ;
    } 

    try {
        const jsondata = yield fetch(types[actionType+'_URL'], {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'access-token': token},
            body: action.payload
        })
        .then( response => response.json())
        
        if (jsondata !== undefined && jsondata.code === 1) {
            yield put({ type: types[actionType + '_SUCCESS'], payload: jsondata.data});
            action.callback();
        } else {
            if (jsondata.code === -1) 
                yield put({ type: types.LOGOUT_SUCCESS});
            
            if (jsondata.code === 0)
                swal(jsondata.msg);

            yield put({ type: types[actionType + '_FAILED']});
        }
    }catch (error) {
        yield put({ type: types[actionType + '_FAILED'] });
        errorMessage(error);
    }
}

function* tokenGetCall(action) {    
    
    let actionType = action.type.split('_START')[0];

    let token = cookie.getCookie(types.TOKEN);

    if (token === null || token === '' || token === undefined) {
        yield put({ type: types.LOGOUT_SUCCESS});
        yield put({ type: types[actionType + '_FAILED']});
        return ;
    } 

    try {
        const jsondata = yield fetch(types[actionType+'_URL'], {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'access-token': token},
        })
        .then( response => response.json())
        
        if (jsondata !== undefined && jsondata.code === 1) {
            yield put({ type: types[actionType + '_SUCCESS'], payload: jsondata.data});
            action.callback();
        } else {
            if (jsondata.code === -1) 
                yield put({ type: types.LOGOUT_SUCCESS});
            
            if (jsondata.code === 0)
                swal(jsondata.msg);

            yield put({ type: types[actionType + '_FAILED']});
        }
    }catch (error) {
        yield put({ type: types[actionType + '_FAILED'] });
        errorMessage(error);
    }
}

function* tokenDelCall(action) {    
    
    let actionType = action.type.split('_START')[0];

    let token = cookie.getCookie(types.TOKEN);

    if (token === null || token === '' || token === undefined) {
        yield put({ type: types.LOGOUT_SUCCESS});
        yield put({ type: types[actionType + '_FAILED']});
        return ;
    } 

    try {
        const jsondata = yield fetch(types[actionType+'_URL'], {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'access-token': token},
            body: action.payload
        })
        .then( response => response.json())
        
        if (jsondata !== undefined && jsondata.code === 1) {
            yield put({ type: types[actionType + '_SUCCESS'], payload: jsondata.data});
            action.callback();
        } else {
            if (jsondata.code === -1) 
                yield put({ type: types.LOGOUT_SUCCESS});
            
            if (jsondata.code === 0)
                swal(jsondata.msg);

            yield put({ type: types[actionType + '_FAILED']});
        }
    }catch (error) {
        yield put({ type: types[actionType + '_FAILED'] });
        errorMessage(error);
    }
}

function* actionWatcherNormal() {
    yield takeEvery(types.GET_ORGANIZATION_INFO_LIST_START, tokenGetCall);
    // yield takeEvery(types.INSERT_ORGANIZATION_START, tokenPostCall);
    // yield takeEvery(types.GET_ORGANIZATION_LIST_START, tokenPostCall);
    yield takeEvery(types.GET_ALL_ORGANIZATION_LIST_START, tokenGetCall);
    yield takeEvery(types.GET_ORGANIZATION_DATA_START, tokenPostCall);
    // yield takeEvery(types.UPDATE_ORGANIZATION_START, tokenPostCall);
    yield takeEvery(types.UPDATE_ORGANIZATION_STATUS_START, tokenPostCall);
    yield takeEvery(types.DELETE_ORGANIZATION_START, tokenDelCall);

}


export default function* Normal() {
    yield all([
        actionWatcherNormal(),
    ]);
}
