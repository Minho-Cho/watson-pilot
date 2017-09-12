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
            // console.log("==========",this.props.node,"============")
            if(this.props.node[0].split('_')[2] == '1505178093805'){
                this.getUserInfo();
            }if(this.props.node == '회의실 목록 확인' ){
                this.getConferenceRoomInfo(true);
            }else if(this.props.node == '회의실 예약정보 확인'){
                this.getConferenceRoomRsvrInfo(true);
            }else if(this.props.node == '내 회의실 예약정보 확인'){
                this.getConferenceRoomMyRsvrInfo(true);
            }else if(this.props.node[0].split('_')[2] == '1505181649926'){
                MrInfoActions.controlShowFlag({
                    myrsvrInfoShowFlag : true
                });
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
            }else if(this.props.node[0].split('_')[2] == '1504828745338'){
                MrInfoActions.controlShowFlag({
                    roomInfoShowFlag : false,
                    rsvrInfoShowFlag : false,
                    rsvrCnfmShowFlag : false
                });
                this.chgConferenceRoomRsvrTitle();  //제목변경요청
            }else if(this.props.node[0].split('_')[2] == '1504833419739'){
                this.cancelResearchResponse(); // 회의제목과 회의실번호 등 추출
            }else if(this.props.node[0].split('_')[2] == '1504833707683'){
              this.cancelConferenceRoomResponse(); // 회의실 취소할 목록 뿌려줌
            }else if(this.props.node[0].split('_')[2] == '1505195154227'){
                MrInfoActions.controlShowFlag({
                    myrsvrInfoShowFlag : true
                });
            }else if(this.props.node[0].split('_')[2] == '1504833734623'){
              MrInfoActions.controlShowFlag({
                myrsvrInfoShowFlag : false
              });
               this.cancelConferenceRoom(); // 회의실 취소
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
            }else if(this.props.node[0].split('_')[2] == '1505106111927'){
                MrInfoActions.controlShowFlag({
                    roomInfoShowFlag : false,
                    rsvrInfoShowFlag : false,
                    rsvrCnfmShowFlag : false
                });
                this.chgDefaultTitle(); //기본 제목변경 요청
            }else if(this.props.node[0].split('_')[2] == '1505106166872'){
                MrInfoActions.controlShowFlag({
                    roomInfoShowFlag : false,
                    rsvrInfoShowFlag : false,
                    rsvrCnfmShowFlag : false
                });
                this.chgDefaultTime(); //기본 시간변경 요청
            }else if(this.props.node == '설정정보 생성'){
                this.makeSettingInfo();
            }else if(this.props.node[0].split('_')[2] == '1505201717364'){
                this.logout();
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

    //로그인처리
    getUserInfo = () =>{
        console.log('getUserInfo called');
        const { entities, context, input} = this.props;
        let inputText = input.text.toUpperCase();
        return fetch('/api/common/getUserInfo',{
            headers: new Headers({'Content-Type': 'application/json'}),
            method : 'POST',
            body : JSON.stringify({inputText:inputText})
        }).then((response) => {
            return response.text();
        }).then((res)=>{
            if (res == ''){
                const { context, DialogActions } = this.props;
                let newContext = context;
                newContext.userId = 'X';
                DialogActions.setNewContext(newContext);
            }else{
                const { context, DialogActions, ConfigActions } = this.props;
                let user = JSON.parse(res);
                ConfigActions.setUserName(user.name);
                let newContext = context;
                newContext.userId = user.id;
                DialogActions.setNewContext(newContext);
            }
        })
    }

    //로그아웃처리
    logout = () =>{
        console.log('logout called');
        const { context, DialogActions, ConfigActions } = this.props;
        ConfigActions.setUserName('');
        let newContext = context;
        newContext.userId = '';
        DialogActions.setNewContext(newContext);
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

    //기본 회의제목 변경
    chgDefaultTitle = () =>{
        console.log('chgDefaultTitle called');
        const { entities, context, input} = this.props;
        var newContext = context;
        Common.getTitle(entities, input).then((rsvrTitleInfo)=>{
            console.log('chgDefaultTitle called : ',rsvrTitleInfo);

            return fetch('/api/common/updateSettingTitleInfo',{
                headers: new Headers({'Content-Type': 'application/json'}),
                method : 'POST',
                body : JSON.stringify({meetingTitle:rsvrTitleInfo.meetingTitle})
            }).then((response) => {
                return response.text();
            }).then((res)=>{
                const { ConfigActions } = this.props;
                ConfigActions.setSettings({
                    settings : JSON.parse(res)
                });
            })
        },(err)=>{
            console.log('chgDefaultTitle called : 제목없음(',err,')');
        })
    }

    //기본 회의시간 변경
    chgDefaultTime = () =>{
        console.log('chgDefaultTime called');
        const { entities, context, input} = this.props;
        var newContext = context;
        Common.getTime(entities, input).then((rsvrTimeInfo)=>{
            console.log('chgDefaultTime called : ',rsvrTimeInfo);

            return fetch('/api/common/updateSettingTimeInfo',{
                headers: new Headers({'Content-Type': 'application/json'}),
                method : 'POST',
                body : JSON.stringify({meetingTime:rsvrTimeInfo.meetingTime})
            }).then((response) => {
                return response.text();
            }).then((res)=>{
                const { ConfigActions } = this.props;
                ConfigActions.setSettings({
                    settings : JSON.parse(res)
                });
            })
        },(err)=>{
            console.log('chgDefaultTime called : 제목없음(',err,')');
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
        return new Promise((resolve, reject)=>{
            this.getConferenceRoomInfo(false).then(()=>{
                const {context, entities, DialogActions, MrInfoActions} = this.props;
                return fetch('/api/webservice/getConferenceRoomMyRsvrInfo', {
                    headers: new Headers({'Content-Type': 'application/json'}),
                    method : 'POST',
                    body : JSON.stringify({context:context, entities:entities})
                }).then((response) => {
                    return response.text();
                }).then((res)=>{
                    console.log("res ::" + res);
                    if(res == '[]'){
                        var newContext = context;
                        newContext.myRsvr  = 'N';
                        DialogActions.setNewContext(newContext);
                    }else{
                        var newContext = context;
                        newContext.myRsvr  = 'Y';
                        DialogActions.setNewContext(newContext);
                        MrInfoActions.setMyRsvrInfo({
                          myrsvrInfo : res
                          //, myrsvrInfoShowFlag : showflag
                        });
                    }
                    resolve();
                });
            });
        });
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
            const { DialogActions, context } = this.props;
            var newContext = context;
            newContext.successRsvr = 'Y';
            DialogActions.setNewContext(newContext);
        })
    }

    //회의실 제목변경
    chgConferenceRoomRsvrTitle = () =>{
        console.log('chgConferenceRoomRsvrTitle called');
        const { DialogActions, MrInfoActions, rsvrTimeInfo, entities, context, input} = this.props;
        var newContext = context;
        var newRsvrTimeInfo = rsvrTimeInfo;
        Common.getTitle(entities, input).then((rsvrTitleInfo)=>{
            console.log('chgConferenceRoomRsvrTitle called : ',rsvrTitleInfo);
            newContext.ableRsvr = 'Y';
            newRsvrTimeInfo.roomTitle = rsvrTitleInfo.meetingTitle;
            MrInfoActions.setRsvrTimeInfo(newRsvrTimeInfo)
            DialogActions.setNewContext(newContext);
        },(err)=>{
            console.log('chgConferenceRoomRsvrTitle called : 제목없음(',err,')');
            newContext.ableRsvr = err;
            DialogActions.setNewContext(newContext);
            // DialogActions.sendMessage(true);
        })
    }

    // 형태소 분석기로 회의제목과 회의실 시간 등 추출
    cancelResearchResponse = () =>{
          const {context, entities, input, DialogActions, MrInfoActions} = this.props;
          Common.getCancelData(entities, input).then((rsvrCancelInfo)=>{
          console.log("rsvrCancelInfo::");
          console.log(rsvrCancelInfo);
          console.log("::rsvrCancelInfo");
          var newContext = context;
          newContext.cancelRsvr = 'Y';
          DialogActions.setNewContext(newContext);
          MrInfoActions.setRsvrCancelInfo(rsvrCancelInfo);
          },(err)=>{
               newContext.cancelRsvr = err;
          })
    }


    // 회의실 취소할 목록 뿌려줌
    cancelConferenceRoomResponse = () =>{
          return new Promise((resolve, reject)=>{
          this.getConferenceRoomInfo(false).then(()=>{
              const {context, entities, MrInfoActions, rsvrCancelInfo, DialogActions } = this.props;
              return fetch('/api/webservice/cancelConferenceRoomShowRsvr', {
                  headers: new Headers({'Content-Type': 'application/json'}),
                  method : 'POST',
                  body : JSON.stringify({context:context, entities:entities, rsvrData:rsvrCancelInfo})
              }).then((response) => {
                  return response.text();
              }).then((res)=>{
                  console.log("res ::" + res);
                  if(res == '[]') {
                    var newContext = context;
                    newContext.cancelMyRsvr = 'N';
                    DialogActions.setNewContext(newContext);
                  }
                  else {
                    var newContext = context;
                    newContext.cancelMyRsvr = 'Y';
                    DialogActions.setNewContext(newContext);
                    MrInfoActions.setRsvrCancelInfo(res);
                    MrInfoActions.setMyRsvrInfo({
                      myrsvrInfo : res,
                      myrsvrInfoShowFlag : true
                    });
                  }
                  resolve();
              });
          });
      });

    }

    //회의실 취소
    cancelConferenceRoom = () =>{
      //this.getConferenceRoomRsvrInfo(false);
      const {context, entities, rsvrCancelInfo, MrInfoActions, DialogActions} = this.props;

      return fetch('/api/webservice/cancelConferenceRoomRsvr', {
          headers: new Headers({'Content-Type': 'application/json'}),
          method : 'POST',
          body : JSON.stringify({context:context, entities:entities, rsvrData:rsvrCancelInfo})
      }).then((response) => {
          //const { DialogActions, MrInfoAction, context } = this.props;
          var newContext = context;
          newContext.cancelRsvrSuccess  = 'Y';
          DialogActions.setNewContext(newContext);
          MrInfoActions.setRsvrCancelInfo();
      });
    }

    render(){
        return (<div/>);
    }
}


export default connect(
    (state) => ({
        roomInfo : state.mrInfo.get('roomInfo'),
        rsvrTimeInfo : state.mrInfo.get('rsvrTimeInfo'),
		rsvrCancelInfo : state.mrInfo.get('rsvrCancelInfo'),
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
