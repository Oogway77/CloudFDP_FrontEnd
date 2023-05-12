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

function* login(action) {

    try {
        const jsondata = yield fetch(types.LOGIN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: action.payload
        })
        .then( response => response.json())

        if (jsondata !== undefined && jsondata.code === 1) {                        
            cookie.setCookie(types.TOKEN, jsondata.data.token, 1);
            yield put({ type: types.LOGIN_SUCCESS, payload: jsondata.data.user });
        } else {
            swal(jsondata.msg);
            yield put({ type: types.LOGIN_FAILED});
        }
    } catch (error) {
        yield put({ type: types.LOGIN_FAILED});
        errorMessage(error);
    }
       
}

function* logout(action) {

    let token = cookie.getCookie('betball_casino_kosuid3');
    
    if (token === null || token === '' || token === undefined) {
        yield put({ type: types.LOGOUT_SUCCESS});
        return ;
    }

    try {
        const jsondata = yield fetch(types.LOGOUT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'access-token': token},
            body: action.payload
        })
        .then( response => response.json())
        
        if (jsondata !== undefined && jsondata.code === 1) {
            yield put({ type: types.LOGOUT_SUCCESS, payload: jsondata.data });
        } else {
            swal(jsondata.msg);
            yield put({ type: types.LOGOUT_FAILED});
        }
    } catch (error) {
        yield put({ type: types.LOGOUT_FAILED});
        errorMessage(error);
    }
       
}

function* noTokenPostCall(action) { 

    let actionType = action.type.split('_START')[0];

    try {
        const jsondata = yield fetch(types[actionType+'_URL'], {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: action.payload
        })
        .then( response => response.json())

        if (jsondata !== undefined && jsondata.code === 1) {
            yield put({ type: types[actionType + '_SUCCESS'], payload: jsondata.data});
            action.callback();
        } else {
            if (jsondata.code === 0) {
                swal(jsondata.msg)
            }
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

function* actionWatcherAuth() {
    yield takeEvery(types.REGISTER_START, noTokenPostCall);
    yield takeEvery(types.INVITE_REPLY_START, noTokenPostCall);
    yield takeEvery(types.GET_INVITE_INFO_START, noTokenPostCall);
    yield takeEvery(types.LOGIN_START, login);
    yield takeEvery(types.LOGOUT_START, logout);

    yield takeEvery(types.UPDATE_USERPASSWORD_START, noTokenPostCall);
    yield takeEvery(types.GET_USER_PROFILE_START, tokenGetCall);
}


export default function* Auth() {
    yield all([
        actionWatcherAuth(),
    ]);
}