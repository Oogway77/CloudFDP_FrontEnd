import * as types from '../constants';

export function getQuestionList(data, callback) {return {type: types.GET_QUESTION_LIST_START, payload: data, callback: callback}}; 
export function getQuestionData(data, callback) {return {type: types.GET_QUESTION_DATA_START, payload: data, callback: callback}}; 
export function insertQuestion(data, callback) {return {type: types.INSERT_QUESTION_START, payload: data, callback: callback}}; 
export function deleteQuestion(data, callback) {return {type: types.DELETE_QUESTION_START, payload: data, callback: callback}}; 
