import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';

import * as  actions from '../store/actions/index';
import Spinner from './../components/spinner';

class Invoices extends Component {

    componentDidMount () {
        document.title = 'Invoice List';
        this.props.onGetInvoiceCustomerMeta();
        this.props.onGetInvoiceList();
    }

    openModal(invoice) {
        this.props.onOpenInvoiceModal(invoice, null);
    }

    redirectTo(invoiceId) {
        this.props.history.push(`/invoices/${invoiceId}/edit`);
    }

    render(){
        const { isLoading } = this.props;
        const { invoicesList, invoiceCustomerMeta } = this.props.invoices;
        let customerList = {};

        if(invoiceCustomerMeta.length) {
            invoiceCustomerMeta.map((customer) => {
                customerList[customer.id] = customer.name;
            });
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="marginRight10 floatLeft">Invoice List</h1>
                        <LinkContainer to="/invoices/create" activeClassName="active">
                            <Button className="marginTop20 floatLeft" bsStyle="primary">Create</Button>
                        </LinkContainer>
                        <div className="clearfix"></div>
                    </div>
                    <div className="col-lg-12">
                        { isLoading ?
                        <Spinner />:
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>customer</th>
                                    <th>discount</th>
                                    <th>total</th>
                                    <th width="150px"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {(invoicesList.length > 0) ? invoicesList.map((invoice, i) =>
                                <tr key={invoice.id}>
                                    <td>{i+1}</td>
                                    <td>{customerList[invoice.customer_id]}</td>
                                    <td>{invoice.discount}</td>
                                    <td>{invoice.total}</td>
                                    <td>
                                        <Button className="marginRight10" bsStyle="warning" onClick={() => this.redirectTo(invoice.id)}>Edit</Button>
                                        <Button bsStyle="danger" onClick={() => this.openModal(invoice, 'delete')}>Delete</Button>
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
        invoices: state.invoices
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetInvoiceCustomerMeta: () => dispatch(actions.getInvoiceCustomerMeta()),
        onGetInvoiceList: () => dispatch(actions.getInvoiceList()),
        onOpenInvoiceModal: (invoice, itemId) => dispatch(actions.openInvoiceModal(invoice, itemId))
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(Invoices);
