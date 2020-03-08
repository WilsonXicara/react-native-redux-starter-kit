import { handleActions } from 'redux-actions';
import { AsyncStorage } from 'react-native';
import axios from 'axios/index';
import { URL_BASE } from '../../../utility/constants';

const LOADER = "USER_LOGIN_LOADER";
const ME = "USER_LOGIN_ME";
const TOKEN = "USER_LOGIN_TOKEN";
const ERROR = "USER_LOGIN_ERROR";
const IS_AUTHENTICATING = "USER_LOGIN_IS_AUTHENTICATING";
const IS_FAILED = "USER_LOGIN_IS_FAILED";
// 
const header = {
	'Accept': 'application/json',
	'Content-Type': 'application/json',
}

// -----------------------------------
// Pure Actions
// -----------------------------------
const setLoader = loader => ({
	type: LOADER,
	loader,
});
const setMe = me => ({
	type: ME,
	me,
});
const setToken = token => ({
	type: TOKEN,
	token,
});
const setError = error => ({
	type: ERROR,
	error,
});
const setIsAuthenticating = isAuthenticating => ({
	type: IS_AUTHENTICATING,
	isAuthenticating,
});
const setIsFailed = isFailed => ({
	type: IS_FAILED,
	isFailed,
});

// ------------------------------------
// Actions
// ------------------------------------
const loginSubmit = (data) => async (dispatch) => {
	dispatch(setLoader(true));
	dispatch(setIsAuthenticating(true));
	dispatch(setIsFailed(false));
	try {
		const response = await axios.post(`${URL_BASE}user/token/`, data, {headers: header});
		await AsyncStorage.setItem('ENTRE_RIOS_USER_TOKEN', response.data.token);
		dispatch(setToken(response.data.token));
		dispatch(setMe(response.data.user));
	} catch(error) {
		dispatch(setError(error));
		dispatch(setIsFailed(true));
	} finally {
		dispatch(setIsAuthenticating(false));
		dispatch(setLoader(false));
	}
};
const logoutSubmit = () => async (dispatch) => {
	dispatch(setLoader(true));
	dispatch(setToken(null));
	dispatch(setLoader(false));
	const token = await AsyncStorage.getItem('ENTRE_RIOS_USER_TOKEN');
	console.log('TOKEN-GUARDADO:', token)
};

export const actions = {
	loginSubmit,
	logoutSubmit,
};

export const reducers = {
	[LOADER]: (state, { loader }) => {
		return {
			...state,
			loader,
		};
	},
	[ME]: (state, { me }) => {
		return {
			...state,
			me,
		};
	},
	[TOKEN]: (state, { token }) => {
		return {
			...state,
			token,
		};
	},
	[ERROR]: (state, { error }) => {
		return {
			...state,
			error,
		};
	},
	[IS_AUTHENTICATING]: (state, { isAuthenticating }) => {
		return {
			...state,
			isAuthenticating,
		};
	},
	[IS_FAILED]: (state, { isFailed }) => {
		return {
			...state,
			isFailed,
		};
	},
};

export const initialState = {
	loader: false,
    me: {},
	token: null,
	isAuthenticating: false,
	error: undefined,
	isFailed: false,
};

export default handleActions(reducers, initialState);