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

    handleAnalysis = (msg) => {
        console.log('handleAnalysis called');

        return fetch('/api/mpAnalysis',{
            headers: new Headers({'Content-Type': 'application/json'}),
            method : 'POST',
            body : JSON.stringify({input:msg})
        }).then((response) => {
            return response.text();
        }).then((response) => {
            console.log('result : ',response);
        })
    }

    render(){
        //console.log(this)
        const { handleInsert, handleAnalysis } = this;

        return(
            <Client onInsert = {handleInsert} onAnalysis = {handleAnalysis}/>
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
