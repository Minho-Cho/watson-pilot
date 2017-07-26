'use strict'
// notes:
//
// * This file is bundled by webpack-dev-middleware into bundle.js
//
// * The require('watson-developer-cloud/language_translator/v2') could also be written as require('watson-developer-cloud').LanguageTranslatorV2,
//   but that version results in a much larger bundle size.
//
// * Tokens expire after 1 hour. This demo simply fetches a new one for each translation rather than keeping a fresh one.
//
// * fetch() is a modern version of XMLHttpRequest. A pollyfill is available for older browsers: https://github.com/github/fetch

import React from 'react';
import Watson from './Watson';
import Client from './Client';
import ConferenceRoom from './ConferenceRoom';

import ConversationV1 from 'watson-developer-cloud/conversation/v1';

const message = function(text, context, token) {
    const conversation = new ConversationV1({token: token,
                                             username: process.env.CONVERSATION_USERNAME,
                                             password: process.env.CONVERSATION_PASSWORD,
                                             version_date: '2017-04-21'});

    const payload = {
        workspace_id: process.env.WORKSPACE_ID,
        input: {
            text: text
        },
        context: context
    };

    return new Promise((resolve, reject) => conversation.message(payload, function(err, data) {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    }));
}

function getToken() {
    return fetch('/api/token/conversation').then(function(response) {
        return response.text();
    });
}

/*
function msg(token) {
    message('first message', undefined, token).then(response1 => {
        // APPLICATION-SPECIFIC CODE TO PROCESS THE DATA
        // FROM CONVERSATION SERVICE
        console.log(JSON.stringify(response1, null, 2), '\n--------');

        // invoke a second call to conversation
        return message('second message', response1.context, token);
    }).then(response2 => {
        console.log(JSON.stringify(response2, null, 2), '\n--------');
        console.log('Note that the two reponses should have the same context.conversation_id');
    }).catch(err => {
        // APPLICATION-SPECIFIC CODE TO PROCESS THE ERROR
        // FROM CONVERSATION SERVICE
        console.error(JSON.stringify(err, null, 2));
    });
}
*/

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

        //getToken().then(this.sendMessage);
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

    /*
    sendMessage(token){
        console.log('sendMessage called');
        message(this.state.message, this.state.context, token).then((response)=>{
            // APPLICATION-SPECIFIC CODE TO PROCESS THE DATA
            // FROM CONVERSATION SERVICE
            console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n', JSON.stringify(response, null, 2), '\n----------------------------------------------------------');

            // invoke a second call to conversation
            this.updateReply(response.output, response.context);
        });
    }
    */

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
        // getToken().then(this.sendMessage);
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
