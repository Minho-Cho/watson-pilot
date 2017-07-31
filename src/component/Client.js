import React from 'react';

export default class Client extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question : ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handlePress = this.handlePress.bind(this);
    }

    handleChange(e){
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClick(){
        document.getElementsByName('question')[0].value = '';
        this.props.onInsert(this.state.question);
    }

    handlePress(e){
        if (e.keyCode == '13'){
            this.handleClick();
        }
    }

    render(){
        return(
            <div>
                <input className='text' type='text' width='500' name='question' placeholder='요청사항을 입력하세요' onChange={this.handleChange} onKeyDown={this.handlePress}></input>
                <a href='#' className='myButton' onClick={this.handleClick}>전송</a>
            </div>
        );
    }
}
