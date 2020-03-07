import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { show } from "redux-modal";
import Modal from "../../components/Modal";
import { actions } from '../../redux/modules/fincas';

class ModalContainer extends Component {
  componentWillMount() {
      const { listar, page } = this.props;
      listar(page);
  }

  handleOpen(modal) {
    this.props.show(modal, { message: `This is a ${modal} modal` });
  }

  render() {
    const { data, loader, page } = this.props;
    console.log('DATA-FINCAS:', data);
    return (
      <Modal {...this.props}
        handleOpen={(modal) => this.handleOpen(modal)}
        navigation={this.props.navigation}/>
    );
  }
}

const ms2p = (state) => {
  return {
    ...state.fincas,
  };
};

const md2p = { ...actions, show };

export default connect(ms2p, md2p)(ModalContainer);
