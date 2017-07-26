import React from 'react';

export default class ConferenceRoom extends React.Component {
    render(){
        return(
            <p>conference room information : {this.props.content}</p>
        );
    }
}
