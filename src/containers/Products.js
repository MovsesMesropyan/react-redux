import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';

import * as  actions from '../store/actions/index';
import Spinner from './../components/spinner';

class Products extends Component {

    componentDidMount() {
        document.title = 'Product List';
        this.props.onGetProductList();
    }

    openModal = (product, action) => {
        let clonedProduct = {
            ...product
        };
        this.props.onOpenProductModal(clonedProduct, action);
    };

    render(){
        const { productsList } = this.props.products;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="marginRight10 floatLeft">Product List</h1>
                        <Button className="marginTop20 floatLeft" bsStyle="primary" onClick={() => this.openModal(null, 'create')}>Create</Button>
                        <div className="clearfix"></div>
                    </div>
                    <div className="col-lg-12">
                        { this.props.isLoading ?
                        <Spinner />:
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {(productsList.length > 0) ? productsList.map((product, i) =>
                            <tr key={product.id}>
                                <td>{i+1}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td width="150px">
                                    <Button className="marginRight10" bsStyle="warning" onClick={() => this.openModal(product, 'edit')}>Edit</Button>
                                    <Button bsStyle="danger" onClick={() => this.openModal(product, 'delete')}>Delete</Button>
                                </td>
                            </tr>
                            ) :
                            <tr>
                                <td colSpan="5"><p className="center">List is empty</p></td>
                            </tr>}
                            </tbody>
                        </Table>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.main.isLoading,
        products: state.products
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetProductList: () => dispatch(actions.getProductList()),
        onOpenProductModal: (product, action) => dispatch(actions.openProductModal(product, action))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products)
