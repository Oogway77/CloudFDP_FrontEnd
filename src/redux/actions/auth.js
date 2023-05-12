import * as types from '../constants';

export function isAuth(flag) {return {type: types.ISAUTH_FLAG, payload: flag}};
export function register(data, callback) {return {type: types.REGISTER_START, payload: data, callback: callback}};
export function inviteReply(data, callback) {return {type: types.INVITE_REPLY_START, payload: data, callback: callback}};
export function getInviteInfo(data, callback) {return {type: types.GET_INVITE_INFO_START, payload: data, callback: callback}};
export function login(data, callback) {return {type: types.LOGIN_START, payload: data, callback: callback}};
export function logout() {return {type: types.LOGOUT_START}};
export function resetPassword(data, callback) {return {type: types.UPDATE_USERPASSWORD_START, payload: data, callback: callback}};
export function getUserProfile(data, callback) {return {type: types.GET_USER_PROFILE_START, payload: data, callback: callback}};
