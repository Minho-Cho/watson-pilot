import React,{Component} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dialogActions from '../modules/dialog';
import * as mrInfoActions from '../modules/mrInfo';

class ConversationContainer extends Component{

    componentWillMount(){
        this.sendMessage();
    }

    shouldComponentUpdate(nextProps, nextState){
        // console.log("shouldComponentUpdate:next: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
        // console.log("shouldComponentUpdate:this: " + JSON.stringify(this.props) + " " + JSON.stringify(this.state));
        if (nextProps.sendMessageTrigger===true){
            this.props = nextProps;
            this.sendMessage();
        }
        return false;
    }

    updateReply = (result) => {
        console.log('updateReply called');
        var json = JSON.parse(result);

        var entities = json.entities;
        var temp = json.input.text;
        entities.map((v,i)=>{
            console.log(v.entity, ' : ',v.value, '(',temp.substr(0,v.location[0]),'[',temp.substr(v.location[0],Number(v.location[1])-Number(v.location[0])),']',temp.substr(v.location[1],temp.length),')' )
        })

        const { DialogActions, MrInfoActions } = this.props;

        DialogActions.setDialog({
            reply : json.output.text,
            entities : json.entities,
            context : json.context,
            input : json.input,
            output : json.output,
            node : json.output.nodes_visited
        });
        //MrInfoActions.initRsvrRoom();
        // MrInfoActions.setNode(json.output.nodes_visited);
    }

    //Watson에 Message전송
    sendMessage = () => {
        const {message} = this.props;
        const newContext = this.props.newContext == undefined?{}:this.props.newContext;
        console.log('sendMessage called<',message,' , ',newContext,'>');
        return fetch('/api/conversation',{
            headers: new Headers({'Content-Type': 'application/json'}),
            method : 'POST',
            body : JSON.stringify({message:message, context:newContext})
        }).then((response) => {
            return response.text();
        }).then((response) => {this.updateReply(response)})
    }

    render(){
        return (<div/>);
    };
}

export default connect(
    (state) => ({
        message : state.dialog.get('message'),
        newContext : state.dialog.get('newContext'),
        sendMessageTrigger : state.dialog.get('sendMessageTrigger')
    }),
    (dispatch) => ({
        DialogActions : bindActionCreators(dialogActions, dispatch),
        MrInfoActions : bindActionCreators(mrInfoActions, dispatch)
    })
)(ConversationContainer);
