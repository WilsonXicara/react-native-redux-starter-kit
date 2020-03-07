import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// Reducers
import { reducer as modal } from 'redux-modal';
import fincas from './modules/fincas';
import usuarios from './modules/usuarios';

export default combineReducers({
  form: formReducer,
  modal,
  fincas,
  usuarios,
});