import * as types from '../actions/actionTypes'

const INITIAL_STATE = {
    invoicesList: [],
    invoice: [],
    invoiceItems: [],
    invoiceProductMeta: [],
    invoiceCustomerMeta: [],
    invoiceModal: {}
};


const InvoicesReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case types.GET_INVOICE_LIST:
        case types.UPDATE_INVOICE_LIST:
            return {
                ...state,
                invoicesList: action.payload
            };
        case types.GET_INVOICE_PRODUCT_META:
            return {
                ...state,
                invoiceProductMeta: action.payload
            };
        case types.GET_INVOICE_CUSTOMER_META:
            return {
                ...state,
                invoiceCustomerMeta: action.payload
            };
        case types.GET_INVOICE:
        case types.UPDATE_INVOICE:
            return {
                ...state,
                invoice: action.payload
            };
        case types.GET_INVOICE_ITEMS:
            return {
                ...state,
                invoiceItems: action.payload
            };
        case types.OPEN_INVOICE_MODAL:
            return {
                ...state,
                invoiceModal: action.payload
            };
        case types.CLOSE_INVOICE_MODAL:
            return {
                ...state,
                invoiceModal: action.payload
            };
        default:
            return state;
    }
};

export default InvoicesReducer;
