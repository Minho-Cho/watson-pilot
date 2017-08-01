import React from 'react';

export default class Watson extends React.Component {
    render(){
        return(
            <div className="container"><img src="/images/logo.png" style={{width:"15px",height:"20px",position:"absolute",left:"20px"}}/><span style={{marginLeft:"30px"}}>{this.props.content}</span></div>
        );
    }
}3
