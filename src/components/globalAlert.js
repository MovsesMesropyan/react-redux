import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

import * as  actions from '../store/actions/index';

class GlobalAlert extends Component {

    componentWillReceiveProps(nextProps) {
        if(nextProps.alert.showAlert) {
            setTimeout(this.handleAlertDismiss, 2000);
        }
    }

    handleAlertDismiss = () => {
        this.props.onCloseAlert();
    };

    render() {
        const { alert } = this.props;

        return (
            <div>
                {alert.showAlert ?
                <div className="alertWrapper">
                    <Alert bsStyle={alert.type} onDismiss={this.handleAlertDismiss}>
                        <h4>{alert.title}</h4>
                        <p>{alert.body}</p>
                    </Alert>
                </div> : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        alert: state.main.alert
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCloseAlert: () => dispatch(actions.closeAlert())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalAlert)
