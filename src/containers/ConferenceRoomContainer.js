import React,{Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mrInfoActions from '../modules/mrInfo';
import ConferenceRoom from '../components/ConferenceRoom';

class ConferenceRoomContainer extends Component{

    render(){
        const {roomInfo, roomInfoShowFlag} = this.props;
        return(
            <ConferenceRoom content={roomInfo} showflag={roomInfoShowFlag}/>
        );
    }
}

export default connect(
    (state) => ({
        roomInfo : state.mrInfo.get('roomInfo'),
        roomInfoShowFlag : state.mrInfo.get('roomInfoShowFlag')
    })
)(ConferenceRoomContainer);
