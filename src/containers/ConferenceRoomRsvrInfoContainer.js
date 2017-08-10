import React,{Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mrInfoActions from '../modules/mrInfo';
import ConferenceRoomRsvrInfo from '../components/ConferenceRoomRsvrInfo';

class ConferenceRoomRsvrInfoContainer extends Component{

    render(){
        const {rsvrInfo, roomInfo, rsvrInfoShowFlag} = this.props;
        return(
            <ConferenceRoomRsvrInfo content = {rsvrInfo} roomInfo = {roomInfo} showflag = {rsvrInfoShowFlag}/>
        );
    }
}

export default connect(
    (state) => ({
        rsvrInfo : state.mrInfo.get('rsvrInfo'),
        roomInfo : state.mrInfo.get('roomInfo'),
        rsvrInfoShowFlag : state.mrInfo.get('rsvrInfoShowFlag')
    })
)(ConferenceRoomRsvrInfoContainer);
