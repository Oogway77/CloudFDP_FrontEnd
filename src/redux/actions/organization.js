import * as types from '../constants';

export function getOrgInfoList(data, callback) {return {type: types.GET_ORGANIZATION_INFO_LIST_START, payload: data, callback: callback}};
// export function insertOrg(data, callback) {return {type: types.INSERT_ORGANIZATION_START, payload: data, callback: callback}};
// export function getOrgList(data, callback) {return {type: types.GET_ORGANIZATION_LIST_START, payload: data, callback: callback}};
export function getAllOrgList(data, callback) {return {type: types.GET_ALL_ORGANIZATION_LIST_START, payload: data, callback: callback}};
export function getOrgData(data, callback) {return {type: types.GET_ORGANIZATION_DATA_START, payload: data, callback: callback}};
// export function updateOrg(data, callback) {return {type: types.UPDATE_ORGANIZATION_START, payload: data, callback: callback}};
export function updateOrgStatus(data, callback) {return {type: types.UPDATE_ORGANIZATION_STATUS_START, payload: data, callback: callback}};
export function deleteOrg(data, callback) {return {type: types.DELETE_ORGANIZATION_START, payload: data, callback: callback}};
