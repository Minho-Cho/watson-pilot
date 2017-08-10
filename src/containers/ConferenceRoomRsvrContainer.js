import React,{Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mrInfoActions from '../modules/mrInfo';
import ConferenceRoomRsvr from '../components/ConferenceRoomRsvr';

class ConferenceRoomRsvrContainer extends Component{

    render(){
        const {rsvrTimeInfo, rsvrCnfmShowFlag} = this.props;
        return(
            <ConferenceRoomRsvr content={rsvrTimeInfo} showflag={rsvrCnfmShowFlag}/>
        );
    }
}

export default connect(
    (state) => ({
        rsvrTimeInfo : state.mrInfo.get('rsvrTimeInfo'),
        rsvrCnfmShowFlag : state.mrInfo.get('rsvrCnfmShowFlag')
    })
)(ConferenceRoomRsvrContainer);
