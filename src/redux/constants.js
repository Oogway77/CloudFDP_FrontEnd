// server
// export const SERVER_IP = 'http://fairsolutiondemo00.azurewebsites.net/api'; // SEVER API
export const SERVER_IP = 'http://192.168.1.28:8080/api';

// register, login, logout
export const TOKEN = 'fair_solutions_access_token';
export const ISAUTH_FLAG = 'ISAUTH_FLAG';

export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_URL = SERVER_IP + '/auth/create-admin';

export const INVITE_REPLY_START = 'INVITE_REPLY_START';
export const INVITE_REPLY_SUCCESS = 'INVITE_REPLY_SUCCESS';
export const INVITE_REPLY_FAILED = 'INVITE_REPLY_FAILED';
export const INVITE_REPLY_URL = SERVER_IP + '/auth/signup';

export const GET_INVITE_INFO_START = 'GET_INVITE_INFO_START';
export const GET_INVITE_INFO_SUCCESS = 'GET_INVITE_INFO_SUCCESS';
export const GET_INVITE_INFO_FAILED = 'GET_INVITE_INFO_FAILED';
export const GET_INVITE_INFO_URL = SERVER_IP + '/auth/signup-token';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_URL = SERVER_IP + '/auth/signin';

export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const LOGOUT_URL = SERVER_IP + '/auth/logout';

export const UPDATE_USERPASSWORD_START = 'UPDATE_USERPASSWORD_START';
export const UPDATE_USERPASSWORD_SUCCESS = 'UPDATE_USERPASSWORD_SUCCESS';
export const UPDATE_USERPASSWORD_FAILED = 'UPDATE_USERPASSWORD_FAILED';
export const UPDATE_USERPASSWORD_URL = SERVER_IP + '/auth/reset-pswd-mail';

export const GET_USER_PROFILE_START = 'GET_USER_PROFILE_START';
export const GET_USER_PROFILE_SUCCESS = 'GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_FAILED = 'GET_USER_PROFILE_FAILED';
export const GET_USER_PROFILE_URL = SERVER_IP + '/auth/profile';

// dashboard
export const GET_ORGANIZATION_INFO_LIST_START = 'GET_ORGANIZATION_INFO_LIST_START';
export const GET_ORGANIZATION_INFO_LIST_SUCCESS = 'GET_ORGANIZATION_INFO_LIST_SUCCESS';
export const GET_ORGANIZATION_INFO_LIST_FAILED = 'GET_ORGANIZATION_INFO_LIST_FAILED';
export const GET_ORGANIZATION_INFO_LIST_URL = SERVER_IP + '/auth/superadmin/dashboard';


// Organizations
export const GET_ALL_ORGANIZATION_LIST_START = 'GET_ALL_ORGANIZATION_LIST_START';
export const GET_ALL_ORGANIZATION_LIST_SUCCESS = 'GET_ALL_ORGANIZATION_LIST_SUCCESS';
export const GET_ALL_ORGANIZATION_LIST_FAILED = 'GET_ALL_ORGANIZATION_LIST_FAILED';
export const GET_ALL_ORGANIZATION_LIST_URL = SERVER_IP + '/organization/all';

export const UPDATE_ORGANIZATION_STATUS_START = 'UPDATE_ORGANIZATION_STATUS_START';
export const UPDATE_ORGANIZATION_STATUS_SUCCESS = 'UPDATE_ORGANIZATION_STATUS_SUCCESS';
export const UPDATE_ORGANIZATION_STATUS_FAILED = 'UPDATE_ORGANIZATION_STATUS_FAILED';
export const UPDATE_ORGANIZATION_STATUS_URL = SERVER_IP + '/organization/update-status';

export const GET_ORGANIZATION_USER_LIST_START = 'GET_ORGANIZATION_USER_LIST_START';
export const GET_ORGANIZATION_USER_LIST_SUCCESS = 'GET_ORGANIZATION_USER_LIST_SUCCESS';
export const GET_ORGANIZATION_USER_LIST_FAILED = 'GET_ORGANIZATION_USER_LIST_FAILED';
export const GET_ORGANIZATION_USER_LIST_URL = SERVER_IP + '/auth/org-users';

export const GET_ORGANIZATION_FDP_LIST_START = 'GET_ORGANIZATION_FDP_LIST_START';
export const GET_ORGANIZATION_FDP_LIST_SUCCESS = 'GET_ORGANIZATION_FDP_LIST_SUCCESS';
export const GET_ORGANIZATION_FDP_LIST_FAILED = 'GET_ORGANIZATION_FDP_LIST_FAILED';
export const GET_ORGANIZATION_FDP_LIST_URL = SERVER_IP + '/datapoint/org-datapoint';

export const GET_ORGANIZATION_DATA_START = 'GET_ORGANIZATION_DATA_START';
export const GET_ORGANIZATION_DATA_SUCCESS = 'GET_ORGANIZATION_DATA_SUCCESS';
export const GET_ORGANIZATION_DATA_FAILED = 'GET_ORGANIZATION_DATA_FAILED';
export const GET_ORGANIZATION_DATA_URL = SERVER_IP + '/organization/select';

export const DELETE_ORGANIZATION_START = 'DELETE_ORGANIZATION_START';
export const DELETE_ORGANIZATION_SUCCESS = 'DELETE_ORGANIZATION_SUCCESS';
export const DELETE_ORGANIZATION_FAILED = 'DELETE_ORGANIZATION_FAILED';
export const DELETE_ORGANIZATION_URL = SERVER_IP + '/organization/delete';



// User Dashboard
export const GET_USER_DASHBOARD_INFO_START = 'GET_USER_DASHBOARD_INFO_START';
export const GET_USER_DASHBOARD_INFO_SUCCESS = 'GET_USER_DASHBOARD_INFO_SUCCESS';
export const GET_USER_DASHBOARD_INFO_FAILED = 'GET_USER_DASHBOARD_INFO_FAILED';
export const GET_USER_DASHBOARD_INFO_URL = SERVER_IP + '/auth/userdashboard';


// Users
export const GET_USER_RECENT_LIST_START = 'GET_USER_RECENT_LIST_START';
export const GET_USER_RECENT_LIST_SUCCESS = 'GET_USER_RECENT_LIST_SUCCESS';
export const GET_USER_RECENT_LIST_FAILED = 'GET_USER_RECENT_LIST_FAILED';
export const GET_USER_RECENT_LIST_URL = SERVER_IP + '/auth/recent-activities';

export const GET_USER_DATA_START = 'GET_USER_DATA_START';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';
export const GET_USER_DATA_URL = SERVER_IP + '/auth/getuser';

export const DELETE_USER_START = 'DELETE_USER_START';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILED = 'DELETE_USER_FAILED';
export const DELETE_USER_URL = SERVER_IP + '/auth/delete';

export const INVITE_USER_START = 'INVITE_USER_START';
export const INVITE_USER_SUCCESS = 'INVITE_USER_SUCCESS';
export const INVITE_USER_FAILED = 'INVITE_USER_FAILED';
export const INVITE_USER_URL = SERVER_IP + '/auth/invite-user';

export const UPDATE_USER_STATUS_START = 'UPDATE_USER_STATUS_START';
export const UPDATE_USER_STATUS_SUCCESS = 'UPDATE_USER_STATUS_SUCCESS';
export const UPDATE_USER_STATUS_FAILED = 'UPDATE_USER_STATUS_FAILED';
export const UPDATE_USER_STATUS_URL = SERVER_IP + '/auth/update-status';

export const UPDATE_USER_ROLE_START = 'UPDATE_USER_ROLE_START';
export const UPDATE_USER_ROLE_SUCCESS = 'UPDATE_USER_ROLE_SUCCESS';
export const UPDATE_USER_ROLE_FAILED = 'UPDATE_USER_ROLE_FAILED';
export const UPDATE_USER_ROLE_URL = SERVER_IP + '/auth/update-role';

export const UPDATE_USER_PROFILE_START = 'UPDATE_USER_PROFILE_START';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE_FAILED = 'UPDATE_USER_PROFILE_FAILED';
export const UPDATE_USER_PROFILE_URL = SERVER_IP + '/auth/update-profile';

export const GET_USER_ORG_DATA_START = 'GET_USER_ORG_DATA_START';
export const GET_USER_ORG_DATA_SUCCESS = 'GET_USER_ORG_DATA_SUCCESS';
export const GET_USER_ORG_DATA_FAILED = 'GET_USER_ORG_DATA_FAILED';
export const GET_USER_ORG_DATA_URL = SERVER_IP + '/organization/get';

export const UPDATE_USER_ORG_INFO_START = 'UPDATE_USER_ORG_INFO_START';
export const UPDATE_USER_ORG_INFO_SUCCESS = 'UPDATE_USER_ORG_INFO_SUCCESS';
export const UPDATE_USER_ORG_INFO_FAILED = 'UPDATE_USER_ORG_INFO_FAILED';
export const UPDATE_USER_ORG_INFO_URL = SERVER_IP + '/organization/update';





// FDP
export const INSERT_FDP_START = 'INSERT_FDP_START';
export const INSERT_FDP_SUCCESS = 'INSERT_FDP_SUCCESS';
export const INSERT_FDP_FAILED = 'INSERT_FDP_FAILED';
export const INSERT_FDP_URL = SERVER_IP + '/datapoint/create';

export const  GET_FDP_RECENT_LIST_START = 'GET_FDP_RECENT_LIST_START';
export const  GET_FDP_RECENT_LIST_SUCCESS = 'GET_FDP_RECENT_LIST_SUCCESS';
export const  GET_FDP_RECENT_LIST_FAILED = 'GET_FDP_RECENT_LIST_FAILED';
export const  GET_FDP_RECENT_LIST_URL = SERVER_IP + '/datapoint/recent-activities';

export const GET_FDP_DATA_START = 'GET_FDP_DATA_START';
export const GET_FDP_DATA_SUCCESS = 'GET_FDP_DATA_SUCCESS';
export const GET_FDP_DATA_FAILED = 'GET_FDP_DATA_FAILED';
export const GET_FDP_DATA_URL = SERVER_IP + '/datapoint/select';

export const GET_FDP_DETAIL_STATUS_START = 'GET_FDP_DETAIL_STATUS_START';
export const GET_FDP_DETAIL_STATUS_SUCCESS = 'GET_FDP_DETAIL_STATUS_SUCCESS';
export const GET_FDP_DETAIL_STATUS_FAILED = 'GET_FDP_DETAIL_STATUS_FAILED';
export const GET_FDP_DETAIL_STATUS_URL = SERVER_IP + '/datapoint/status';

export const ERASER_FDP_DT_STATUS = 'ERASER_FDP_DT_STATUS';

export const UPDATE_FDP_START = 'UPDATE_FDP_START';
export const UPDATE_FDP_SUCCESS = 'UPDATE_FDP_SUCCESS';
export const UPDATE_FDP_FAILED = 'UPDATE_FDP_FAILED';
export const UPDATE_FDP_URL = SERVER_IP + '/datapoint/update';

export const UPDATE_FDP_STATUS_START = 'UPDATE_FDP_STATUS_START';
export const UPDATE_FDP_STATUS_SUCCESS = 'UPDATE_FDP_STATUS_SUCCESS';
export const UPDATE_FDP_STATUS_FAILED = 'UPDATE_FDP_STATUS_FAILED';
export const UPDATE_FDP_STATUS_URL = SERVER_IP + '/datapoint/update-status';

export const DELETE_FDP_START = 'DELETE_FDP_START';
export const DELETE_FDP_SUCCESS = 'DELETE_FDP_SUCCESS';
export const DELETE_FDP_FAILED = 'DELETE_FDP_FAILED';
export const DELETE_FDP_URL = SERVER_IP + '/datapoint/delete';




// question
export const GET_QUESTION_LIST_START = 'GET_QUESTION_LIST_START';
export const GET_QUESTION_LIST_SUCCESS = 'GET_QUESTION_LIST_SUCCESS';
export const GET_QUESTION_LIST_FAILED = 'GET_QUESTION_LIST_FAILED';
export const GET_QUESTION_LIST_URL = SERVER_IP + '/question/selectlist';

export const GET_QUESTION_DATA_START = 'GET_QUESTION_DATA_START';
export const GET_QUESTION_DATA_SUCCESS = 'GET_QUESTION_DATA_SUCCESS';
export const GET_QUESTION_DATA_FAILED = 'GET_QUESTION_DATA_FAILED';
export const GET_QUESTION_DATA_URL = SERVER_IP + '/question/select';

export const INSERT_QUESTION_START = 'INSERT_QUESTION_START';
export const INSERT_QUESTION_SUCCESS = 'INSERT_QUESTION_SUCCESS';
export const INSERT_QUESTION_FAILED = 'INSERT_QUESTION_FAILED';
export const INSERT_QUESTION_URL = SERVER_IP + '/question/insert';

export const UPDATE_QUESTION_START = 'UPDATE_QUESTION_START';
export const UPDATE_QUESTION_SUCCESS = 'UPDATE_QUESTION_SUCCESS';
export const UPDATE_QUESTION_FAILED = 'UPDATE_QUESTION_FAILED';
export const UPDATE_QUESTION_URL = SERVER_IP + '/update-info';

export const DELETE_QUESTION_START = 'DELETE_QUESTION_START';
export const DELETE_QUESTION_SUCCESS = 'DELETE_QUESTION_SUCCESS';
export const DELETE_QUESTION_FAILED = 'DELETE_QUESTION_FAILED';
export const DELETE_QUESTION_URL = SERVER_IP + '/question/delete';