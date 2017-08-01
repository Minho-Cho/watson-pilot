'use strict'

import React from 'react';
import Watson from './Watson';
import Client from './Client';
import ConferenceRoom from './ConferenceRoom';
import ConferenceRoomRsvrInfo from './ConferenceRoomRsvrInfo';
import ConferenceRoomRsvr from './ConferenceRoomRsvr';

const dotenv = require('dotenv');

export default class App extends React.Component {
    constructor(props) {
        dotenv.load({silent: true});
        super(props);

        this.state = {
            reply : '...',
            message : '',
            context : {}
        }

        this.sendMessage = this.sendMessage.bind(this);
        this.updateReply = this.updateReply.bind(this);
        this.sendMessageCli = this.sendMessageCli.bind(this);
        this.updateRsvrTimeInfo = this.updateRsvrTimeInfo.bind(this);

        this.sendMessage();
    }

    //Watson으로부터 받은 정보 업데이트
    updateReply(result){
        console.log('updateReply called');
        var json = JSON.parse(result);
        var entities = json.entities;
        //var temp = json.input.text;
        // entities.map((v,i)=>{
        //     console.log(v.entity, ' : ',v.value, '(',temp.substr(0,v.location[0]),'[',temp.substr(v.location[0],Number(v.location[1])-Number(v.location[0])),']',temp.substr(v.location[1],temp.length),')' )
        // })
        this.setState({
            reply : json.output.text,
            message : '',
            entities : json.entities,
            context : json.context,
            input : json.input,
            output : json.output,
            roomInfo : '',
            roomInfoShowFlag : false,
            rsvrInfoShowFlag : false,
            rsvrInfo : ''
        })

        if(json.output.nodes_visited == '회의실 목록 확인'){
            this.setState({rsvrCnfmShowFlag : false});
            this.getConferenceRoomInfo(true);
        }else if(json.output.nodes_visited == '회의실 예약정보 확인'){
            this.setState({rsvrCnfmShowFlag : false});
            this.getConferenceRoomRsvrInfo(true);
        }else if(json.output.nodes_visited == '회의실 예약'){
            this.confirmConferenceRoomRsvr();
        }else if(json.output.nodes_visited == '회의실 예약 가능시'){
            this.setState({rsvrCnfmShowFlag : true});
        }else if(json.output.nodes_visited == '회의실 예약진행'){
            this.setState({rsvrCnfmShowFlag : true});
            this.addConferenceRoomRsvr();
        }else{
            this.setState({rsvrCnfmShowFlag : false});
        }
    }

    //Watson에 Message전송
    sendMessage(){
        console.log('sendMessage called<',this.state.message,' , ',this.state.context,'>');
        return fetch('/api/conversation',{
            headers: new Headers({'Content-Type': 'application/json'}),
            method : 'POST',
            body : JSON.stringify({message:this.state.message, context:this.state.context})
        }).then((response) => {
            return response.text();
        }).then((response) => {this.updateReply(response)})
    }

    sendMessageCli(msg){
        console.log('sendMessageCli called<',msg,'>');

        this.setState({
            message : msg
        }, this.sendMessage);
    }

    updateRsvrTimeInfo(data){
        //this.setState({
//            rsvrTimeInfo : data
        //})
    }

    //회의실 목록 조회
    getConferenceRoomInfo(showFlag){
        console.log('getConferenceRoomInfo called : ',showFlag);
        return fetch('/api/webservice/getConferenceRoomInfo').then((response) => {
            return response.text();
        }).then((res)=>{
            // Common.sortJsonArrayByProperty(res, 'MR_NM');
            this.setState({
                roomInfo : res,
                roomInfoShowFlag : showFlag
            });
        })
    }

    //회의실 예약정보 조회
    getConferenceRoomRsvrInfo(showFlag){
        console.log('getConferenceRoomRsvrInfo called');
        this.getConferenceRoomInfo(false);
        return fetch('/api/webservice/getConferenceRoomRsvrInfo', {
            headers: new Headers({'Content-Type': 'application/json'}),
            method : 'POST',
            body : JSON.stringify({context:this.state.context, entities:this.state.entities})
        }).then((response) => {
            return response.text();
        }).then((res)=>{
            this.setState({
                rsvrInfo : res,
                rsvrInfoShowFlag : showFlag
            });
        })
    }

    //회의실 예약가능 판단
    confirmConferenceRoomRsvr(){
        console.log('confirmConferenceRoomRsvr called');
        this.getConferenceRoomInfo(false);
        return fetch('/api/webservice/getConferenceRoomRsvrInfo', {
            headers: new Headers({'Content-Type': 'application/json'}),
            method : 'POST',
            body : JSON.stringify({context:this.state.context, entities:this.state.entities})
        }).then((response) => {
            return response.text();
        }).then((res)=>{
            //예약시간을 자동으로 판단
            var rsvrTimeInfo = Common.getTimeInfoAuto(this.state.roomInfo, res, this.state.entities, this.state.input);
            var newContext = this.state.context;

            //예약가능여부에 따른 분기
            if (Object.keys(rsvrTimeInfo).length === 0) {
                newContext.ableRsvr = 'N';
                this.setState({
                    context : newContext,
                    rsvrCnfmShowFlag : false
                },this.sendMessage);
            }else{
                newContext.ableRsvr = 'Y';
                this.setState({
                    context : newContext,
                    rsvrCnfmShowFlag : true,
                    rsvrTimeInfo : rsvrTimeInfo
                },this.sendMessage);
            }
        })
    }

    //회의실 예약
    addConferenceRoomRsvr(){
        console.log('addConferenceRoomRsvr called');
        this.getConferenceRoomRsvrInfo(false);
        return fetch('/api/webservice/addConferenceRoomRsvr', {
            headers: new Headers({'Content-Type': 'application/json'}),
            method : 'POST',
            body : JSON.stringify({rsvrData : this.state.rsvrTimeInfo, entities:this.state.entities})   //input:this.state.input, output:this.state.output, context:this.state.context,
        }).then((response) => {
            return response.text();
        }).then((res)=>{
            var newContext = this.state.context;
            newContext.successRsvr = 'Y';
            this.setState({
                context : newContext,
                rsvrCnfmShowFlag : false
            },this.sendMessage);
        })
    }

    render(){
        return (
            <div>
                <div className="header">
                    <div className="wrap">
                        <div className="logo">
                            <a href="index.html"><span>Watson</span><br/><span>Pilot</span></a>
                        </div>
                        <div className="nav-icon">
                            <a href="#" className="right_bt" id="activator"><span> </span> </a>
                        </div>
                        <div className="box" id="box">
                            <div className="box_content">
                                <div className="box_content_center">
                                    <div className="form_content">
                                        <div className="menu_box_list">
                                            <ul>
                                                <li><a href="#"><span>home</span></a></li>
                                                <li><a href="#"><span>About</span></a></li>
                                                <li><a href="#"><span>Works</span></a></li>
                                                <li><a href="#"><span>Clients</span></a></li>
                                                <li><a href="#"><span>Blog</span></a></li>
                                                <li><a href="contact.html"><span>Contact</span></a></li>
                                                <div className="clear"> </div>
                                            </ul>
                                        </div>
                                        <a className="boxclose" id="boxclose"> <span> </span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="top-searchbar">
                            <Client onInsert={this.sendMessageCli} />
                        </div>
                        <div className="userinfo">
                            <div className="user">
                                <ul>
                                    <li><a href="#"><img src="images/user-pic.png" title="user-name"/><span>X0006832</span></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>

                <div className="content">
            		<div className="wrap">
                        <div id="main" role="main" >
                            <ul id="tiles">
                                <li style={{position:'relative',top:'90px',left:'0px',width:'calc(100%-40px)'}}>
                                    <Watson content = {this.state.reply}/>
                                    <ConferenceRoom content = {this.state.roomInfo} showflag = {this.state.roomInfoShowFlag}/>
                                    <ConferenceRoomRsvrInfo content = {this.state.rsvrInfo} roomInfo = {this.state.roomInfo} showflag = {this.state.rsvrInfoShowFlag}/>
                                    <ConferenceRoomRsvr content = {this.state.rsvrTimeInfo} showflag = {this.state.rsvrCnfmShowFlag} onInsert={this.updateRsvrTimeInfo}/>
                                </li>
                            </ul>
            		    </div>
            		</div>
            	</div>
            </div>
        );
    }
}
