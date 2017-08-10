import React,{Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dialogActions from '../modules/dialog';
import * as mrInfoActions from '../modules/mrInfo';

class WSContainer extends Component{

    shouldComponentUpdate(nextProps, nextState){
        const { MrInfoActions, DialogActions, context } = nextProps;
        DialogActions.sendMessage(false);
        // console.log("WS shouldComponentUpdate:next: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
        // console.log("WS shouldComponentUpdate:this: " + JSON.stringify(this.props) + " " + JSON.stringify(this.state));
        //
        // // console.log('WSContainer : ',this)
        var newContext = context;
        //DialogActions.setNewContext(newContext);

        if (JSON.stringify(nextProps.node)!=JSON.stringify(this.props.node)){
            this.props = nextProps;
            if(this.props.node == '회의실 목록 확인'){
                this.getConferenceRoomInfo(true);
            }else if(this.props.node == '회의실 예약정보 확인'){
                this.getConferenceRoomRsvrInfo(true);
            }else if(this.props.node == '회의실 예약'){
                this.confirmConferenceRoomRsvr();
            }else if(this.props.node == '회의실 예약 가능시'){
                MrInfoActions.controlShowFlag({
                    roomInfoShowFlag : false,
                    rsvrInfoShowFlag : false,
                    rsvrCnfmShowFlag : true
                });
            }else if(this.props.node == '회의실 예약진행'){
                this.addConferenceRoomRsvr();
            }else if(this.props.node != ''){
                MrInfoActions.controlShowFlag({
                    roomInfoShowFlag : false,
                    rsvrInfoShowFlag : false,
                    rsvrCnfmShowFlag : false
                });
            }
        }
        return false;
    }

    //회의실 목록 조회
    getConferenceRoomInfo = (showflag) =>{
        console.log('getConferenceRoomInfo called : ',showflag);
        return fetch('/api/webservice/getConferenceRoomInfo').then((response) => {
            return response.text();
        }).then((res)=>{
            // Common.sortJsonArrayByProperty(res, 'MR_NM');
            const { MrInfoActions } = this.props;
            MrInfoActions.setRoomInfo({
                roomInfo : res,
                roomInfoShowFlag : showflag
            });
        })
    }

    //회의실 예약정보 조회
    getConferenceRoomRsvrInfo = (showflag) =>{
        console.log('getConferenceRoomRsvrInfo called : ',showflag);
        this.getConferenceRoomInfo(false);
        const {context, entities} = this.props;
        return fetch('/api/webservice/getConferenceRoomRsvrInfo', {
            headers: new Headers({'Content-Type': 'application/json'}),
            method : 'POST',
            body : JSON.stringify({context:context, entities:entities})
        }).then((response) => {
            return response.text();
        }).then((res)=>{
            const { MrInfoActions } = this.props;
            MrInfoActions.setRsvrInfo({
                rsvrInfo : res,
                rsvrInfoShowFlag : showflag
            });
        })
    }

    //회의실 예약가능 판단
    confirmConferenceRoomRsvr = () =>{
        console.log('confirmConferenceRoomRsvr called');
        this.getConferenceRoomInfo(false);
        const {context, entities} = this.props;
        return fetch('/api/webservice/getConferenceRoomRsvrInfo', {
            headers: new Headers({'Content-Type': 'application/json'}),
            method : 'POST',
            body : JSON.stringify({context:context, entities:entities})
        }).then((response) => {
            return response.text();
        }).then((res)=>{
            const { DialogActions, MrInfoActions, roomInfo, entities, input, context} = this.props;
            //예약시간을 자동으로 판단
            var rsvrTimeInfo = Common.getTimeInfoAuto(roomInfo, res, entities, input);
            var newContext = context;

            //예약가능여부에 따른 분기
            if (Object.keys(rsvrTimeInfo).length === 0) {
                console.log('confirmConferenceRoomRsvr called : 예약불가');
                newContext.ableRsvr = 'N';
                DialogActions.setNewContext(newContext);
                // DialogActions.sendMessage(true);
            }else{
                console.log('confirmConferenceRoomRsvr called : 예약가능');
                newContext.ableRsvr = 'Y';
                MrInfoActions.setRsvrTimeInfo(rsvrTimeInfo)
                DialogActions.setNewContext(newContext);
            }
        })
    }

    //회의실 예약
    addConferenceRoomRsvr = () =>{
        console.log('addConferenceRoomRsvr called');
        this.getConferenceRoomRsvrInfo(false);
        const {rsvrTimeInfo, entities} = this.props;
        return fetch('/api/webservice/addConferenceRoomRsvr', {
            headers: new Headers({'Content-Type': 'application/json'}),
            method : 'POST',
            body : JSON.stringify({rsvrData:rsvrTimeInfo, entities:entities})
        }).then((response) => {
            return response.text();
        }).then((res)=>{
            const { DialogActions, MrInfoAction, context } = this.props;
            var newContext = context;
            newContext.successRsvr = 'Y';
            DialogActions.setNewContext(newContext);
        })
    }

    render(){
        return (<div/>);
    }
}

export default connect(
    (state) => ({
        node : state.mrInfo.get('node'),
        roomInfo : state.mrInfo.get('roomInfo'),
        rsvrTimeInfo : state.mrInfo.get('rsvrTimeInfo'),
        input : state.dialog.get('input'),
        context : state.dialog.get('context'),
        entities : state.dialog.get('entities')
    }),
    (dispatch) => ({
        DialogActions : bindActionCreators(dialogActions, dispatch),
        MrInfoActions : bindActionCreators(mrInfoActions, dispatch)
    })
)(WSContainer);
