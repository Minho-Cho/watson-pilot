'use strict'

import React from 'react';
import Watson from './Watson';
import Client from './Client';
import ConferenceRoom from './ConferenceRoom';
import ConferenceRoomRsvr from './ConferenceRoomRsvr';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reply : '...',
            message : '',
            context : {}
        }

        this.sendMessage = this.sendMessage.bind(this);
        this.updateReply = this.updateReply.bind(this);
        this.sendMessageCli = this.sendMessageCli.bind(this);

        this.sendMessage();
    }

    updateReply(result){
        console.log('updateReply called');
        var json = JSON.parse(result);
        this.setState({
            reply : json.output.text,
            message : '',
            entities : json.entities,
            context : json.context,
            roomInfo : '',
            rsvrInfo : ''
        })

        if(json.output.nodes_visited == 'node_1_1500624737419'){
            this.getConferenceRoomInfo();
        }else if(json.output.nodes_visited == 'node_1_1501114989965'){
            this.getConferenceRoomRsvrInfo();
        }
    }

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

    getConferenceRoomInfo(){
        console.log('getConferenceRoomInfo called');
        return fetch('/api/webservice/getConferenceRoomInfo').then((response) => {
            return response.text();
        }).then((res)=>{
            this.setState({
                roomInfo : res
            });
        })
    }

    getConferenceRoomRsvrInfo(){
        console.log('getConferenceRoomRsvrInfo called');
        return fetch('/api/webservice/getConferenceRoomRsvrInfo', {
            headers: new Headers({'Content-Type': 'application/json'}),
            method : 'POST',
            body : JSON.stringify({message:this.state.message, context:this.state.context, entities:this.state.entities})
        }).then((response) => {
            return response.text();
        }).then((res)=>{
            this.setState({
                rsvrInfo : res
            });
        })
    }

    render(){
        return (
            <div>
                <Watson content = {this.state.reply}/>
                <ConferenceRoom content = {this.state.roomInfo}/>
                <ConferenceRoomRsvr content = {this.state.rsvrInfo}/>
                <Client onInsert={this.sendMessageCli} />
            </div>
        );
    }
}
