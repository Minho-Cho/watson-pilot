import React,{Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dialogActions from '../modules/dialog';
import Watson from '../components/Watson';

import styles from '../style/App.css';

class WatsonContainer extends Component{

    render(){
        //console.log('watsonContainer : ',this)
        const {reply} = this.props;

        return(
            <Watson content = {reply}/>
        );
    }
}

export default connect(
    (state) => ({
        reply : state.dialog.get('reply')
    })
)(WatsonContainer);
