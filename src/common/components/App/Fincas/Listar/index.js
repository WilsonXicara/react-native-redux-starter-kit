import { connect } from 'react-redux';
import { actions } from '../../../../../redux/modules/fincas';
import FincasList from './Fincas';


const ms2p = (state) => {
  return {
    ...state.fincas,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(FincasList);