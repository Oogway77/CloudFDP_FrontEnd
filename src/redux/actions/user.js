import * as types from '../constants';

export function getOrgUserList(data, callback) {return {type: types.GET_ORGANIZATION_USER_LIST_START, payload: data, callback: callback}}; 

export function getUserDashInfo(data, callback) {return {type: types.GET_USER_DASHBOARD_INFO_START, payload: data, callback: callback}}; 

export function getUserRecentList(data, callback) {return {type: types.GET_USER_RECENT_LIST_START, payload: data, callback: callback}}; 
export function getUserOrgData(data, callback) {return {type: types.GET_USER_ORG_DATA_START, payload: data, callback: callback}}; 
export function getUserData(data, callback) {return {type: types.GET_USER_DATA_START, payload: data, callback: callback}}; 
export function deleteUser(data, callback) {return {type: types.DELETE_USER_START, payload: data, callback: callback}}; 

export function inviteUser(data, callback) {return {type: types.INVITE_USER_START, payload: data, callback: callback}}; 
export function updateUserStatus(data, callback) {return {type: types.UPDATE_USER_STATUS_START, payload: data, callback: callback}}; 
export function updateUserRole(data, callback) {return {type: types.UPDATE_USER_ROLE_START, payload: data, callback: callback}}; 
export function updateUserProfile(data, callback) {return {type: types.UPDATE_USER_PROFILE_START, payload: data, callback: callback}}; 
export function updateUserOrgInfo(data, callback) {return {type: types.UPDATE_USER_ORG_INFO_START, payload: data, callback: callback}}; 