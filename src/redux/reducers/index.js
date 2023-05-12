import { combineReducers } from 'redux';

import auth from './auth';
import normal from './normal';
import user from './user';
import fdp from './fdp';
import organization from './organization';

export default combineReducers({
	auth,
	normal,
	user,
	fdp,
	organization,
});
