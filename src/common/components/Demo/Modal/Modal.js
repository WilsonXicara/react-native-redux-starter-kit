import React, { Component } from 'react';
import ModalBox from './ModalBox';

export default class Modal extends Component {
    componentWillMount() {
        const { listar, page } = this.props;
        listar(page);
    }

    handleOpen(modal) {
        this.props.show(modal, { message: `This is a ${modal} modal` });
    }

    render() {
        const { data, loader, page } = this.props;
        return (
            <ModalBox {...this.props}
                handleOpen={(modal) => this.handleOpen(modal)}
                navigation={this.props.navigation} />
        );
    }
}