import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as modalReducer } from 'redux-modal';
// 
import authReducers from './modules/auth';
import fincas from './modules/fincas';

export default combineReducers({
	form: formReducer,
	modal: modalReducer,
	auth: authReducers,
	fincas,
});
