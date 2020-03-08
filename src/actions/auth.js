import { handleActions } from 'redux-actions';

const LOADER = "USER_LOGIN_LOADER";
const TOKEN = "USER_LOGIN_TOKEN";
const ERROR = "USER_LOGIN_ERROR";
const IS_AUTHENTICATING = "USER_LOGIN_IS_AUTHENTICATING";
const IS_FAILED = "USER_LOGIN_IS_FAILED";

// -----------------------------------
// Pure Actions
// -----------------------------------
const setLoader = loader => ({
	type: LOADER,
	loader,
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
const loginSubmit = (data) => (dispatch) => {
	dispatch(setLoader(true));
	dispatch(setIsAuthenticating(true));
	dispatch(setIsFailed(false));
	if (data.email === 'demo@gmail.com') {
		dispatch(setToken('TOKEN-AUTOMÁTICO'));
	} else {
		dispatch(setError('Credenciales incorrectas'));
		dispatch(setIsFailed(true));
	}
	dispatch(setIsAuthenticating(false));
	dispatch(setLoader(false));
};
const logoutSubmit = () => (dispatch) => {
	dispatch(setLoader(true));
	dispatch(setToken(null));
	dispatch(setLoader(false));
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
	token: null,
	isAuthenticating: false,
	error: undefined,
	isFailed: false,
};

export default handleActions(reducers, initialState);