import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';

import * as  actions from '../store/actions/index';
import Spinner from './../components/spinner';

class Customers extends Component {

    componentDidMount() {
        document.title = 'Customer List';
        this.props.onGetCustomerList();
    }

    openModal(customer, action) {
        let clonedCustomer = {
            ...customer
        };
        this.props.onOpenCustomerModal(clonedCustomer, action);
    }

    render(){
        const { customersList } = this.props.customers;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="marginRight10 floatLeft">Customer List</h1>
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
                                <th>Address</th>
                                <th>Phone</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {(customersList.length > 0) ? customersList.map((customer, i) =>
                            <tr key={customer.id}>
                                <td>{i+1}</td>
                                <td>{customer.name}</td>
                                <td>{customer.address}</td>
                                <td>{customer.phone}</td>
                                <td width="150px">
                                    <Button className="marginRight10" bsStyle="warning" onClick={() => this.openModal(customer, 'edit')}>Edit</Button>
                                    <Button bsStyle="danger" onClick={() => this.openModal(customer, 'delete')}>Delete</Button>
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
        customers: state.customers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetCustomerList: () => dispatch(actions.getCustomerList()),
        onOpenCustomerModal: (customer, action) => dispatch(actions.openCustomerModal(customer, action))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customers)
