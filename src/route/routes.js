// signin and signup
import Auth from '../pages/authPages';
import SignIn from '../pages/authPages/signin';
import SignUp from '../pages/authPages/signup';
import SignUpInvite from '../pages/authPages/signup_invite';
import ForgotPW from '../pages/authPages/forgot';

// super admin pages
import Dashboard_s from '../pages/superAdmin/dashboard';
import Organization_s from '../pages/superAdmin/organization';

// normal client pages
import Dashboard_n from '../pages/normalClient/dashboard';
import Datapoint_n from '../pages/normalClient/datapoint';
import User_n from '../pages/normalClient/user';
import NewDataPoint_n from '../pages/normalClient/newDataPoint';
import AddBillingInfo_n from '../pages/normalClient/addBillingInfo';
import InviteNewUser_n from '../pages/normalClient/inviteNewUser';
import EditOrganization_n from '../pages/normalClient/editOrganization';
import EditProfile_n from '../pages/normalClient/editProfile';


export const auth = [    
    { path: '/auth', exact: false, name: 'Auth', component: Auth },
]

export const authpageroutes = [
    { path: '/auth/sign_in', exact: true, name: 'SignIn', component: SignIn },
    { path: '/auth/sign_up', exact: true, name: 'SignUp', component: SignUp },
    { path: '/auth/sign_up_invite', exact: true, name: 'SignUpInvite', component: SignUpInvite },
    { path: '/auth/forgot_pw', exact: true, name: 'SignUp', component: ForgotPW },
]

export const superadminpageroutes = [    
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard_s },
    { path: '/organization', exact: true, name: 'Organization', component: Organization_s },
];

export const normalclientpageroutes = [    
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard_n },
    { path: '/datapoint', exact: false, name: 'Datapoint', component: Datapoint_n },
    { path: '/user', exact: false, name: 'User', component: User_n },
    { path: '/newdatapoint', exact: true, name: 'NewDataPoint', component: NewDataPoint_n },
    { path: '/addbillinginfo', exact: true, name: 'AddBillingInfo', component: AddBillingInfo_n },
    { path: '/invitenewuser', exact: true, name: 'InviteNewUser', component: InviteNewUser_n },
    { path: '/editorganization', exact: true, name: 'EditOrganization', component: EditOrganization_n },
    { path: '/editprofile', exact: true, name: 'EditProfile', component: EditProfile_n },
];
