import { connect } from 'react-redux';
import { userRequestLogout as actions } from '../../../../actions';
import Sidebar from './Sidebar';


const mstp = (state) => {
  return {
    ...state.fincas,
  };
};

const mdtp = { actions };

export default connect(null, mdtp)(Sidebar);