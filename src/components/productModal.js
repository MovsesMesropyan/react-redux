import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel, HelpBlock, Col } from 'react-bootstrap';

import * as  actions from '../store/actions/index';

class ProductModal extends Component {
    state = {
        showModal: false,
        action: 'create',
        product: {
            id: null,
            name: '',
            price: 0.01
        },
        validation: {
            nameIsPristine: true,
            priceIsPristine: true
        }
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.productModal.showModal !== this.props.productModal.showModal) {
            let { showModal, action, product } = nextProps.productModal;
            this.setState({showModal, action});
            if(product && product.id) {
                this.setState({product});
            } else {
                this.setState({product: {id: null, name: '', price: 0.01}});
            }
        }
    }

    handleChange = event => {
        let { product, validation } = Object.assign({}, this.state);
        product[event.target.name] = event.target.value;
        validation[event.target.name + 'IsPristine'] = false;
        this.setState({product, validation});
    };

    saveChanges = () => {
        if(this.state.product && this.state.product.id) {
            this.props.onEditProduct(this.state.product);
        } else {
            this.props.onCreateProduct(this.state.product);
        }
        this.resetValidation();
    };

    deleteProduct = () => {
        this.props.onDeleteProduct(this.state.product);
    };

    closeModal = () => {
        this.props.onCloseProductModal();
        this.resetValidation();
    };

    resetValidation() {
        let validation = Object.assign({}, this.state.validation);
        validation.nameIsPristine = true;
        validation.priceIsPristine = true;
        this.setState({validation});
    }

    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.action == 'delete' ? 'Delete ' : this.state.product.id ? 'Edit ' : 'Create '}Product</Modal.Title>
                </Modal.Header>
                {this.state.action !== 'delete' ?
                    <Form horizontal>
                        <Modal.Body>
                            <FormGroup validationState={this.state.validation.nameIsPristine ? null : (this.state.product.name.length > 0 ? 'success' : 'error')}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Name*
                                </Col>
                                <Col sm={10}>
                                    <FormControl
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={this.state.product.name}
                                        onChange={this.handleChange}/>
                                    {(this.state.validation.nameIsPristine || this.state.product.name) ? null : <HelpBlock>This field is required</HelpBlock>}
                                </Col>
                            </FormGroup>

                            <FormGroup validationState={this.state.validation.priceIsPristine ? null : (this.state.product.price > 0 ? 'success' : 'error')}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Price*
                                </Col>
                                <Col sm={10}>
                                    <FormControl
                                        type="number"
                                        name="price"
                                        placeholder="Price"
                                        value={this.state.product.price}
                                        min="0.01"
                                        step="0.01"
                                        onChange={this.handleChange}/>
                                    {(this.state.validation.priceIsPristine || this.state.product.price) ? null : <HelpBlock>This field is required</HelpBlock>}
                                </Col>
                            </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="success"
                                    onClick={this.saveChanges}
                                    disabled={!(this.state.product.name && this.state.product.price && (this.state.product.price > 0))}>{this.state.product && this.state.product.id ? 'Save' : 'Create'}</Button>
                            <Button onClick={this.closeModal}>Cancel</Button>
                        </Modal.Footer>
                    </Form> :
                    <div>
                        <Modal.Body>
                            <p className="center">Are you sure, you want to delete product?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="danger" onClick={this.deleteProduct}>Confirm</Button>
                            <Button onClick={this.closeModal}>Cancel</Button>
                        </Modal.Footer>
                    </div>}
            </Modal>
        )
    }
}


const mapStateToProps = state => {
    return {
        productModal: state.products.productModal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCreateProduct: (product) => dispatch(actions.createProduct(product)),
        onEditProduct: (product) => dispatch(actions.editProduct(product)),
        onDeleteProduct: (product) => dispatch(actions.deleteProduct(product)),
        onCloseProductModal: () => dispatch(actions.closeProductModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal)
