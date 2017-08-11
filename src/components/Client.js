import React, {Component} from 'react';

export default class Client extends React.Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.mpAnalysisClick = this.mpAnalysisClick.bind(this);
    }

    handleClick(){
        const node = this.refs.question;
        const text = node.value.trim();
        this.props.onInsert(text);
        node.value = '';
    }

    mpAnalysisClick(){
        const node = this.refs.question;
        const text = node.value.trim();
        this.props.onAnalysis(text);
        node.value = '';
    }

    handlePress(e){
        if (e.keyCode == '13'){
            this.handleClick();
        }
    }

    render(){
        return(
            <div>
                <input type='text' ref='question' placeholder='요청사항을 입력하세요' onKeyDown={this.handlePress}></input>
                <a href='#' onClick={this.handleClick}/>
                {/*<a href='#' onClick={this.mpAnalysisClick}/>*/}
            </div>
        );
    }
}
