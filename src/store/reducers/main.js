import * as types from '../actions/actionTypes'

const INITIAL_STATE = {
    isLoading: false,
    alert: {
        showAlert: false,
        type: 'success',
        title: '',
        body: ''
    }
};

const MainReducer = (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case types.DATA_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case types.ALERT:
            return {
                ...state,
                alert: action.payload
            };
        default:
            return state;
    }
};

export default MainReducer;
