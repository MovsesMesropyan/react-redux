import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel, HelpBlock, Col } from 'react-bootstrap';

import * as  actions from '../store/actions/index';

class InvoiceModal extends Component {
    state = {
        showModal: false,
        itemId: false,
        invoice: {}
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.invoiceModal.showModal !== this.props.invoiceModal.showModal) {
            const { showModal, itemId, invoice, invoiceItems } = nextProps.invoiceModal;
            let processedInvoice = (invoice && invoice.id) ? invoice : {};
            let processedInvoiceItems = (invoice && invoice.id) ? invoiceItems : [];
            this.setState({showModal, invoice: processedInvoice, invoiceItems: processedInvoiceItems, itemId});
        }
    }

    deleteInvoice = () => {
        this.props.onDeleteInvoice(this.state.invoice);
    };

    deleteInvoiceItem = () => {
        this.props.onDeleteInvoiceItem(this.state.invoice.id, this.state.itemId, this.state.invoiceItems);
    };

    closeModal = () => {
        this.props.onCloseInvoiceModal();
    };

    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="center">Are you sure, you want to delete invoice{this.state.itemId ? ' item' : null}?</p>
                </Modal.Body>
                <Modal.Footer>
                    {this.state.itemId ?
                        <Button bsStyle="danger" onClick={this.deleteInvoiceItem}>Confirm</Button>:
                        <Button bsStyle="danger" onClick={this.deleteInvoice}>Confirm</Button>}

                    <Button onClick={this.closeModal}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        invoiceModal: state.invoices.invoiceModal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDeleteInvoice: (invoice) => dispatch(actions.deleteInvoice(invoice)),
        onDeleteInvoiceItem: (invoiceId, itemId, invoiceItems) => dispatch(actions.deleteInvoiceItem(invoiceId, itemId, invoiceItems)),
        onCloseInvoiceModal: () => dispatch(actions.closeInvoiceModal())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceModal)