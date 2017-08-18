import React,{Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as configActions from '../modules/config';
import ConfigInfo from '../components/ConfigInfo';

class ConfigInfoContainer extends Component{

    render(){
        const {settings, showFlag} = this.props;
        return(
            <ConfigInfo content={settings} showflag={showFlag}/>
        );
    }
}

export default connect(
    (state) => ({
        settings : state.config.get('settings'),
        showFlag : state.config.get('showFlag')
    })
)(ConfigInfoContainer);
