import * as types from '../constants';

export function getOrgFDPList(data, callback) {return {type: types.GET_ORGANIZATION_FDP_LIST_START, payload: data, callback: callback}};

export function insertFDP(data, callback) {return {type: types.INSERT_FDP_START, payload: data, callback: callback}};
export function getFDPRecentList(data, callback) {return {type: types.GET_FDP_RECENT_LIST_START, payload: data, callback: callback}};
export function getFDPData(data, callback) {return {type: types.GET_FDP_DATA_START, payload: data, callback: callback}};
export function getFDPDtStatus(data, callback) {return {type: types.GET_FDP_DETAIL_STATUS_START, payload: data, callback: callback}};
export function eraserFDPDtStatus(data, callback) {return {type: types.ERASER_FDP_DT_STATUS, payload: data, callback: callback}};
export function updateFDP(data, callback) {return {type: types.UPDATE_FDP_START, payload: data, callback: callback}};
export function updateFDPStatus(data, callback) {return {type: types.UPDATE_FDP_STATUS_START, payload: data, callback: callback}};
export function deleteFDP(data, callback) {return {type: types.DELETE_FDP_START, payload: data, callback: callback}};
