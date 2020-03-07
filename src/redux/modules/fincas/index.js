import { handleActions } from 'redux-actions';
import _ from 'lodash';
import { api } from '../../../utility/api';
// 
import axios from 'axios/index';
const URL_BASE = 'https://test101.ciancoders.com/api/';
const headers =  {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `${'422c21dd5968a0d90994b8cb3370c33e7ebb860a'}`,
    'otro': 'Hola Mundo',
};

// Constantes ACTION TYPES
const LOADER    = 'LOADER_FINCAS';
const DATA      = 'DATA_FINCAS';
const ITEM_DATA = 'ITEM_FINCAS';
const PAGE      = 'PAGE_FINCAS';
const ORDERING  = 'ORDERING_FINCAS';
const SEARCH    = 'SEARCH_FINCAS';

// -----------------------------------
// Pure Actions
// -----------------------------------
const setLoader = loader => ({
    type: LOADER,
    loader,
});
const setData = data => ({
    type: DATA,
    data,
});
const setItem = item => ({
    type: ITEM_DATA,
    item,
});
const setPage = page => ({
    type: PAGE,
    page,
});
const setOrdering = ordering => ({
    type: ORDERING,
    ordering,
});
const setSearch = search => ({
    type: SEARCH,
    search,
});

// ------------------------------------
// Actions
// ------------------------------------
const listar = (page = 1) => (dispatch, getStore) => {
    const resource = getStore().fincas;
    const params = { page };
    params.ordering = resource.ordering;
    params.search = resource.search;
    // dispatch(setLoader(true));
    // api.get('finca', params).then((response) => {
    //     dispatch(setData(response));
    //     dispatch(setPage(page));
    // }).catch(() => {
    // }).finally(() => {
    //     dispatch(setLoader(false));
    // });
    // 
    // axios.create({
    //     baseURL: baseUrl,
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //     },
    //     transformResponse: [
    //       data => humps.camelizeKeys(JSON.parse(data)),
    //     ],
    // })
    // 
    dispatch(setLoader(true));
    axios.get(`${URL_BASE}finca/`, {headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token ${'422c21dd5968a0d90994b8cb3370c33e7ebb860a'}`,
    },})
        .then(response => {
            console.log('RESPONSE:', response);
            dispatch(setData(response.data));
        })
        .catch(error => {
            console.log('ERROR:', error.response);
        })
        .finally(() => {
            dispatch(setLoader(false));
        });
};
const leer = id => (dispatch) => {
    dispatch(setLoader(true));
    // api.get(`${'finca'}/${id}`).then((response) => {
    //     dispatch(setItem(response));
    //     dispatch(initializeForm('fincaForm', response));
    // }).catch(() => {
    // }).finally(() => {
    //     dispatch(setLoader(false));
    // });
};
const searchChange = search => (dispatch) => {
    dispatch(setSearch(search));
    dispatch(listar());
};
const onSortChange = ordering => (dispatch, getStore) => {
    const sort = getStore().fincas.ordering;
    if (ordering === sort) {
        dispatch(setOrdering(`-${ordering}`));
    } else {
        dispatch(setOrdering(ordering));
    }
    dispatch(listar());
};

export const actions = {
    listar,
    leer,
    searchChange,
    onSortChange,
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [DATA]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
    [ITEM_DATA]: (state, { item }) => {
        return {
            ...state,
            item,
        };
    },
    [PAGE]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },
    [ORDERING]: (state, { ordering }) => {
        return {
            ...state,
            ordering,
        };
    },
    [SEARCH]: (state, { search }) => {
        return {
            ...state,
            search,
        };
    },
};

export const initialState = {
    loader: false,
    data: {
        results: [],
        count: 0,
    },
    item: {},
    page: 1,
    ordering: '',
    search: '',
};

export default handleActions(reducers, initialState);