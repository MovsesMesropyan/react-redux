import * as types from '../actions/actionTypes'

const INITIAL_STATE = {
    customersList: [],
    customerModal: {}
};


const CustomersReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case types.GET_CUSTOMER_LIST:
        case types.UPDATE_CUSTOMER_LIST:
            return {
                ...state,
                customersList: action.payload
            };
        case types.OPEN_CUSTOMER_MODAL:
            return {
                ...state,
                customerModal: action.payload
            };
        case types.CLOSE_CUSTOMER_MODAL:
            return {
                ...state,
                customerModal: action.payload
            };
        default:
            return state;
    }
};

export default CustomersReducer;
