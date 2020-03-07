import { connect } from 'react-redux';
import { show } from 'redux-modal';
import { actions } from '../../../../redux/modules/fincas';
import Modal from './Modal';


const mstp = (state) => {
  return {
    ...state.fincas,
  };
};

const mdtp = { ...actions, show };

export default connect(mstp, mdtp)(Modal);