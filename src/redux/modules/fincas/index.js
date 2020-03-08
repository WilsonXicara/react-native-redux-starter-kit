import { handleActions } from 'redux-actions';
import _ from 'lodash';
import { api } from '../../../utility/api';

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
    dispatch(setLoader(true));
    api.get('finca/', params)
        .then(response => {
            console.log('FINCAS-LISTAR:', response);
            dispatch(setData(response));
        })
        .catch(error => {
            console.log('FINCAS-LISTAR-ERROR:', error);
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