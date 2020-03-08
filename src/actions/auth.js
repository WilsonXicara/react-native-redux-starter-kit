import { handleActions } from 'redux-actions';

const LOADER = "USER_LOGIN_LOADER";
const TOKEN = "USER_LOGIN_TOKEN";
const ERROR = "USER_LOGIN_ERROR";
const IS_AUTHENTICATING = "USER_LOGIN_IS_AUTHENTICATING";
const IS_FAILED = "USER_LOGIN_IS_FAILED";
// 
const USER_LOGIN_REQUESTED = "USER_LOGIN_REQUESTED";
const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
const USER_LOGIN_FAILED = "USER_LOGIN_FAILED";
const USER_LOGOUT_REQUESTED = "USER_LOGOUT_REQUESTED";

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
	console.log('ACTION-LOGIN-SUBMIT:', data)
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

// export const userLoginSuccess = ({ email, password }) => ({
// 	types: [
// 		USER_LOGIN_REQUESTED,
// 		USER_LOGIN_SUCCESS,
// 		USER_LOGIN_FAILED
// 	],
// 	payload: {
// 		client: "default",
// 		request: {
// 			method: "POST",
// 			url: "/login-success",
// 			data: {
// 				email,
// 				password
// 			}
// 		}
// 	}
// });

// export const userLoginFail = ({ email, password }) => ({
// 	types: [
// 		USER_LOGIN_REQUESTED,
// 		USER_LOGIN_SUCCESS,
// 		USER_LOGIN_FAILED
// 	],
// 	payload: {
// 		client: "default",
// 		request: {
// 			method: "POST",
// 			url: "/login-fail",
// 			data: {
// 				email,
// 				password
// 			}
// 		}
// 	}
// });

// export function userRequestLogout() {
// 	return {
// 		type: USER_LOGOUT_REQUESTED,
// 		payload: {},
// 	};
// }

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
	// 
	[USER_LOGIN_REQUESTED]: (state, { loader }) => {
		return {
			...state,
			loader,
			isAuthenticating: true,
			isFailed: false,
		};
	},
	[USER_LOGIN_SUCCESS]: (state, { loader }) => {
		return {
			...state,
			loader,
			token: payload.data.token,
			isAuthenticating: false,
			isFailed: false,
		};
	},
	[USER_LOGIN_FAILED]: (state, { error }) => {
		return {
			...state,
			error: error.response.data.message,
			isAuthenticating: false,
			isFailed: true,
		};
	},
	[USER_LOGOUT_REQUESTED]: (state, { loader }) => {
		return {
			...state,
			token: null,
			isAuthenticating: false,
			error: undefined,
			isFailed: false,
		};
	},
};

export const initialState = {
	loader: false,
	// 
	token: null,
	isAuthenticating: false,
	error: undefined,
	isFailed: false,
};

export default handleActions(reducers, initialState);