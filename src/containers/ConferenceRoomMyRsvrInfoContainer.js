import React,{Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as mrInfoActions from '../modules/mrInfo';
import ConferenceRoomMyRsvrInfo from '../components/ConferenceRoomMyRsvrInfo';

class ConferenceRoomMyRsvrInfoContainer extends Component{

    render(){
        const {myrsvrInfo,  myrsvrInfoShowFlag} = this.props;
        return(
            <ConferenceRoomMyRsvrInfo content = {myrsvrInfo}  showflag = {myrsvrInfoShowFlag}/>
        );
    }
}

export default connect(
    (state) => ({
        myrsvrInfo : state.mrInfo.get('myrsvrInfo'),
        myrsvrInfoShowFlag : state.mrInfo.get('myrsvrInfoShowFlag')
    })
)(ConferenceRoomMyRsvrInfoContainer);
