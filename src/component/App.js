'use strict'

import React from 'react';
import Watson from './Watson';
import Client from './Client';
import ConferenceRoom from './ConferenceRoom';

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
        this.updateRoominfo = this.updateRoominfo.bind(this);

        this.sendMessage();
    }

    updateReply(result){
        console.log('updateReply called');
        var json = JSON.parse(result);
        this.setState({
            reply : json.output.text,
            message : '',
            context : json.context
        })

        if(json.output.nodes_visited == 'node_1_1500624737419'){
            this.getConferenceRoomInfo();
        }else{
            this.setState({
                roomInfo : ''
            })
        }
    }

    updateRoominfo(roomInfo){
        console.log('updateRoominfo called');
        var ri = JSON.parse(roomInfo);
        var room = '';
        ri.forEach((v, i)=>{room = room + ',' + v.MR_NM;});
        this.setState({
            roomInfo : room
        })
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
        }).then(this.updateRoominfo)
    }

    render(){
        return (
            <div>
                <Watson content = {this.state.reply}/>
                <ConferenceRoom content = {this.state.roomInfo}/>
                <Client onInsert={this.sendMessageCli} />
            </div>
        );
    }
}
