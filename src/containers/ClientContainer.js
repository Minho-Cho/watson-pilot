import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dialogActions from '../modules/dialog';
import * as mrInfoActions from '../modules/mrInfo';
import Client from '../components/Client';

import styles from '../style/App.css';

class ClientContainer extends Component{
    constructor(props) {
        super(props);
        const { DialogActions } = this.props;
    }

    handleInsert = (msg) => {
        console.log('handleInsert called<',msg,'>');

        const { DialogActions } = this.props;
        DialogActions.setMessage(msg);
    }

    render(){
        //console.log(this)
        const { handleInsert } = this;

        return(
            <Client onInsert = {handleInsert} />
        );
    }
}

export default connect(
    (state) => ({
        message : state.dialog.get('message')
    }),
    (dispatch) => ({
        DialogActions : bindActionCreators(dialogActions, dispatch),
        MrInfoActions : bindActionCreators(mrInfoActions, dispatch)
    })
)(ClientContainer);
