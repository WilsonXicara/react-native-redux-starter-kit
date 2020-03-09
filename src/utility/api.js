import { URL_BASE } from './constants';
/**
 * En las peticiones HTTP de Axios, el body del Response está en Response.data
 */
import * as request  from 'axios/index';
import { AsyncStorage } from 'react-native';

export const KEY_USER_TOKEN = 'ENTRE_RIOS_USER_TOKEN';
export const KEY_USER_INFO = 'ENTRE_RIOS_USER_INFO';
const BASE_HEADER = {
	'Accept': 'application/json',
	'Content-Type': 'application/json',
}

/**
 * Función que devuelve el Token de autenticación (almacenado en AsyncStorage).
 * @return: string: `Token ${token}`, o `false` si  el token no existe.
 */
const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem(KEY_USER_TOKEN);
        console.log('OBTENER-TOKEN:', token);
        if (token) {
            return `Token ${token}`;
        }
    } catch (error) {
        console.error('ERROR-OBTENER-TOKEN:', error);
    }
    return false;
}

/**
 * Funcion para construir la URL absoluta de la petición, agregando los `params` proporcionados.
 * Toma como base `${URL_BASE}api`.
 * @param path: string: ruta relativa.
 * @param params: dict: parametros para poner como query string.
 * @return: string: string con la url absoluta para la peticion.
 * */
const makeUrl = (path, params = {}) => {
    let url = `${URL_BASE}api`;
    url+= `${path[0] === '/' ? '' : '/'}${path}${path[path.length-1] === '/' ? '' : '/'}`;
    let hasQueue = false; // se coloca que no hay aun query string
    // por cada atributo en los params se inserta en el query string
    const dicKeys = Object.keys(params);
    dicKeys.forEach((row) => {
        if (hasQueue) {
            url += `&${row}=${params[row]}`;
        } else {
            url += `?${row}=${params[row]}`;
            hasQueue = true;
        }
    });
    return url;
}

/**
 * Función que construye el HEADER para las peticiones HTTP, y le agrega la cabecera de Token (si este último está guardado).
 */
const makeHeaders = async () => {
    const headers = { ...BASE_HEADER };
    try {
        const token = await getToken();
        token && (headers['Authorization'] = token);
    } catch (error) {
        console.log('API-MAKE-HEADERS-ERROR:', error);
    }
    return headers;
}

/**
 * Funcion para manejar los errores de cualquier petición
 * @param response: response: response de la peticion
 * */
const errorHandler = async (response) => {
    // Estado 401 o 403 redirigen al login
    if (response.status === 401 || response.status === 403) {
        try {
            await AsyncStorage.removeItem(KEY_USER_TOKEN);
        } catch (error) {
            console.error('API-ELIMINAR-TOKEN-ERROR:', error);
        }
        // TODO: Redirigir a la ventana de Login
        // window.location.assign('/#/login');
    } else {
        // console.log(response.body);
    }
}

/**
 * Función que devuelve un Promise con la petición POST.
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el POST
 * @param params: dict: parametros para query string, opcionales
 * @return: Promise: promise del POST
 * */
const post = async (path, body, params = {}) => {
    const baseURL = makeUrl(path, params);
    const data = {...body};
    try {
        const headers = await makeHeaders();
        const response = await request.post(`${baseURL}`, data, {headers});
        return new Promise((resolve, reject) => {
            resolve(response.data ? response.data : response);
        });
	} catch(error) {
        console.log('API-POST-ERROR:', error.response);
        return new Promise((resolve, reject) => {
            errorHandler(error.response);
            reject(error.response && error.response.data ? error.response.data : error);
        });
	}
}

/**
 * TODO: No revisado
 * Funcion para hacer una peticion post
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el post
 * @param attachments: array: diccionario con estructura name, file, con el nombre y archivo que se desea enviar sdf sdf
 * @param params: dict: parametros para query string, opcionales
 * @return: instancia de superagent lista para ser recibida como promise
 * */
function _postMultiPart(path, body, attachments, params = {}) {
    const url = makeUrl(path, params);
    const token = getToken();
    let result;
    if (getToken()) {
        result = request.post(url).set('Authorization', token);
    } else {
        result = request.post(url);
    }
    attachments.forEach((attachment) => {
        result.attach(attachment.name, attachment.file);
    });
    const data = JSON.stringify(body);
    result.field('data', data);
    return result;
}

/**
 * TODO: No revisado
 * Funcion para hacer una peticion post
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el post
 * @param attachments: array: diccionario con estructura name, file, con el nombre y archivo que se desea enviar
 * @param params: dict: parametros para query string, opcionales
 * @return: Promise: promise del post
 * */
function postAttachments(path, body, attachments, params = {}) {
    return new Promise((resolve, reject) => {
        _postMultiPart(path, body, attachments, params).then((response) => {
            if (response.body) {
                resolve(response.body);
            }
            resolve(response);
        }).catch((error) => {
            errorHandler(error.response);
            reject(error.response.body);
        });
    });
}

/**
 * TODO: No revisado
 * Funcion para hacer una peticion put
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el put
 * @param attachments: array: diccionario con estructura name, file, con el nombre y archivo que se desea enviar
 * @param params: dict: parametros para query string, opcionales
 * @return: instancia de superagent lista para ser recibida como promise
 * */
function _putMultiPart(path, body, attachments, params = {}) {
    const url = makeUrl(path, params);
    const token = getToken();
    let result;
    if (getToken()) {
        result = request.put(url).set('Authorization', token);
    } else {
        result = request.put(url);
    }
    attachments.forEach((attachment) => {
        result.attach(attachment.name, attachment.file);
    });
    const data = JSON.stringify(body);
    result.field('data', data);
    return result;
}

/**
 * TODO: No revisado
 * Funcion para hacer una peticion put
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el put
 * @param attachments: array: diccionario con estructura name, file, con el nombre y archivo que se desea enviar
 * @param params: dict: parametros para query string, opcionales
 * @return: Promise: promise del put
 * */
function putAttachments(path, body, attachments, params = {}) {
    return new Promise((resolve, reject) => {
        _putMultiPart(path, body, attachments, params).then((response) => {
            if (response.body) {
                resolve(response.body);
            }
            resolve(response);
        }).catch((error) => {
            errorHandler(error.response);
            reject(error.response.body);
        });
    });
}

/**
 * Función que devuelve un Promise con la petición PUT.
 * @param path: string: path relativo de la peticion
 * @param body: dict: el body para el put
 * @param params: dict: parametros para query string, opcionales
 * @return: Promise: promise del put
 * */
const put = async (path, body, params = {}) => {
    const baseURL = makeUrl(path, params);
    const data = {...body};
    try {
        const headers = await makeHeaders();
        const response = await request.put(`${baseURL}`, data, {headers});
        return new Promise((resolve, reject) => {
            resolve(response.data ? response.data : response)
        });
	} catch(error) {
        console.log('API-PUT-ERROR:', error);
        return new Promise((resolve, reject) => {
            errorHandler(error.response);
            reject(error.response && error.response.data ? error.response.data : error);
        });
	}
}
/**
 * TODO: No revisado
 * Funcion para hacer una peticion delete
 * @param path: string: path relativo de la peticion
 * @return: instancia de superagent lista para ser recibida como promise
 * */
function _delete(path) {
    const url = makeUrl(path);
    const token = getToken();
    if (getToken()) {
        return request.delete(url).set('Accept', 'application/json').set('Content-Type', 'application/json')
            .set('Authorization', token);
    }
    return request.delete(url).set('Accept', 'application/json').set('Content-Type', 'application/json');
}

/**
 * Función que devuelve un Promise con la petición DELETE.
 * @param path: string: path relativo de la peticion
 * @return: Promise: promise del delete
 * */
const eliminar = async (path) => {
    const baseURL = makeUrl(path, {});
    try {
        const headers = await makeHeaders();
        const response = await request.post(`${baseURL}`, {headers});
        return new Promise((resolve, reject) => {
            resolve(response.data ? response.data : response);
        });
	} catch(error) {
        console.log('API-DELETE-ERROR:', error);
        return new Promise((resolve, reject) => {
            errorHandler(error.response);
            reject(error.response && error.response.data ? error.response.data : error);
        });
	}
}

/**
 * Función que devuelve un Promise con la petición GET.
 * @param path: string: path relativo de la peticion
 * @param params: dict: parametros para query string, opcionales
 * @return: Promise: promise del get
 * */
const get = async (path, params = {}) => {
    const baseURL = makeUrl(path, params);
    try {
        const headers = await makeHeaders();
        const response = await request.get(`${baseURL}`, {headers});
        return new Promise((resolve, reject) => {
            resolve(response.data ? response.data : response)
        });
	} catch(error) {
        console.log('API-GET-ERROR:', error);
        return new Promise((resolve, reject) => {
            errorHandler(error.response);
            reject(error.response && error.response.data ? error.response.data : error);
        });
	}
}

export const api = {
    get, post, put, eliminar,
    // postAttachments, putAttachments,
};