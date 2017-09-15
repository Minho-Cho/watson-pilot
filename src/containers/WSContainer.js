import React,{Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dialogActions from '../modules/dialog';
import * as mrInfoActions from '../modules/mrInfo';
import * as configActions from '../modules/config';

class WSContainer extends Component{

    shouldComponentUpdate(nextProps, nextState){
        const { MrInfoActions, DialogActions, ConfigActions, context } = nextProps;
        DialogActions.sendMessage(false);
        // console.log("WS shouldComponentUpdate:this: " + JSON.stringify(this.props) + " " + JSON.stringify(this.state));
        // console.log("WS shouldComponentUpdate:next: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
        // console.log('WSContainer : ',this)
        var newContext = context;

        //conversation이 update되지 않거나 rsvrTimeInfo가 update되었을 경우에는 무시(무한루프 제거)
        if (JSON.stringify(nextProps.context.system.dialog_turn_counter)!=JSON.stringify(this.props.context.system==undefined?0:this.props.context.system.dialog_turn_counter)
            && JSON.stringify(nextProps.rsvrTimeInfo)==JSON.stringify(this.props.rsvrTimeInfo)){
            this.props = nextProps;
            ConfigActions.setShowflag(false);
            if(this.props.node == '회의실 목록 확인'){
                this.getConferenceRoomInfo(true);
            }else if(this.props.node == '회의실 예약정보 확인'){
                this.getConferenceRoomRsvrInfo(true);
            }else if(this.props.node == '내 회의실 예약정보 확인'){
                this.getConferenceRoomMyRsvrInfo(true);
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
            }else if(this.props.node == '회의 자동시작'){
                MrInfoActions.controlShowFlag({
                    roomInfoShowFlag : false,
                    rsvrInfoShowFlag : false,
                    rsvrCnfmShowFlag : false
                });
                this.checkAutoStart();
            }else if(this.props.node == '자동시작 가능시'){
                this.rsvrAutoStart();
            }else if(this.props.node == '설정정보 확인'){
                MrInfoActions.controlShowFlag({
                    roomInfoShowFlag : false,
                    rsvrInfoShowFlag : false,
                    rsvrCnfmShowFlag : false
                });
                this.getSettingInfo();
            }else if(this.props.node == '설정정보 생성'){
                this.makeSettingInfo();
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

    //자동시작 가능여부 확인
    checkAutoStart = () =>{
        console.log('checkAutoStart called');
        const {input, entities} = this.props;
        var data = {};
        Common.getTimeDate(entities, input).then((timeDateInfo)=>{
            console.log('timeDateInfo called : ',timeDateInfo);
            data = timeDateInfo;
            return fetch('/api/webservice/checkAutoStart',{
                headers: new Headers({'Content-Type': 'application/json'}),
                method : 'POST',
                body : JSON.stringify({timeDateInfo:data})
            }).then((response) => {
                return response.text();
            }).then((res)=>{
                if (res != ''){
                    const { context, DialogActions } = this.props;
                    var newContext = context;
                    newContext.ableAutoStart = 'Y';
                    var reqstInfo = {
                        reqstNo : res,
                        startDate : data.rsvrDay,
                        startTime : data.TFH + data.TFM,
                        startTimeDP : Number(data.TFH)+':'+data.TFM
                    };
                    newContext.reqstInfo = reqstInfo;
                    DialogActions.setNewContext(newContext);
                }else{
                    const { context, DialogActions } = this.props;
                    var newContext = context;
                    newContext.ableAutoStart = 'N';
                    DialogActions.setNewContext(newContext);
                }
            })
        })

    }

    //자동시작
    rsvrAutoStart = () =>{
        console.log('rsvrAutoStart called');
        const {context, entities} = this.props;
        return fetch('/api/webservice/autoStart',{
            headers: new Headers({'Content-Type': 'application/json'}),
            method : 'POST',
            body : JSON.stringify({context:context})
        }).then((response) => {
            return response.text();
        }).then((res)=>{
            console.log('Task : ',res);
        })
    }

    //환경설정정보 확인
    getSettingInfo = () =>{
        console.log('getSettingInfo called');
        return fetch('/api/common/getSettingInfo').then((response) => {
            return response.text();
        }).then((res)=>{
            if (res == ''){
                const { context, DialogActions } = this.props;
                var newContext = context;
                newContext.notExistSettings = 'Y';
                DialogActions.setNewContext(newContext);
            }else{
                const { ConfigActions } = this.props;
                ConfigActions.setSettings({
                    settings : JSON.parse(res)
                });
            }
        })
    }

    //환경설정정보 생성
    makeSettingInfo = () =>{
        console.log('makeSettingInfo called');
        return fetch('/api/common/makeSettingInfo',{
            headers: new Headers({'Content-Type': 'application/json'}),
            method : 'POST',
            body : JSON.stringify({})
        }).then((response) => {
            return response.text();
        }).then((res)=>{
            const { ConfigActions } = this.props;
            ConfigActions.setSettings({
                settings : JSON.parse(res)
            });
        })
    }

    //회의실 목록 조회
    getConferenceRoomInfo = (showflag) =>{
        console.log('getConferenceRoomInfo called : ',showflag);
        return new Promise((resolve, reject)=>{
            fetch('/api/webservice/getConferenceRoomInfo').then((response) => {
                return response.text();
            }).then((res)=>{
                // Common.sortJsonArrayByProperty(res, 'MR_NM');
                const { MrInfoActions } = this.props;
                MrInfoActions.setRoomInfo({
                    roomInfo : res,
                    roomInfoShowFlag : showflag
                });
                resolve();
            });
        });
    }

    //회의실 예약정보 조회
    getConferenceRoomRsvrInfo = (showflag) =>{
        console.log('getConferenceRoomRsvrInfo called : ',showflag);
        return new Promise((resolve, reject)=>{
            this.getConferenceRoomInfo(false).then(()=>{
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
                    resolve();
                });
            });
        });
    }

    //내 회의실 예약정보 조회
    getConferenceRoomMyRsvrInfo = (showflag) =>{
        console.log('getConferenceRoomMyRsvrInfo called : ',showflag);



//        return new Promise((resolve, reject)=>{
//            this.getConferenceRoomInfo(false).then(()=>{

                const {context, entities} = this.props;
                return fetch('/api/webservice/getConferenceRoomMyRsvrInfo', {
                    headers: new Headers({'Content-Type': 'application/json'}),
                    method : 'POST',
                    body : JSON.stringify({context:context, entities:entities})
                }).then((response) => {
                    return response.text();
                }).then((res)=>{
                    console.log("res ::" + res);
                    const { MrInfoActions } = this.props;
                        MrInfoActions.setMyRsvrInfo({
                        myrsvrInfo : res,
                        myrsvrInfoShowFlag : showflag
                    });
//                    resolve();
                });

//            });
//        });
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
            var newContext = context;
            //예약시간을 자동으로 판단/가능여부에 따른 분기
            Common.getTimeInfoAuto(roomInfo, res, entities, input).then((rsvrTimeInfo)=>{
                console.log('confirmConferenceRoomRsvr called : 예약가능');
                newContext.ableRsvr = 'Y';
                DialogActions.setNewContext(newContext);
                MrInfoActions.setRsvrTimeInfo(rsvrTimeInfo)
            },(err)=>{
                console.log('confirmConferenceRoomRsvr called : 예약불가(',err,')');
                newContext.ableRsvr = err;
                DialogActions.setNewContext(newContext);
                // DialogActions.sendMessage(true);
            })
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
        roomInfo : state.mrInfo.get('roomInfo'),
        rsvrTimeInfo : state.mrInfo.get('rsvrTimeInfo'),
        input : state.dialog.get('input'),
        context : state.dialog.get('context'),
        entities : state.dialog.get('entities'),
        node : state.dialog.get('node')
    }),
    (dispatch) => ({
        DialogActions : bindActionCreators(dialogActions, dispatch),
        MrInfoActions : bindActionCreators(mrInfoActions, dispatch),
        ConfigActions : bindActionCreators(configActions, dispatch)
    })
)(WSContainer);
