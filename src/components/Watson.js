import React, {Component} from 'react';
import styles from '../style/App.css';

export default class Watson extends React.Component {
    render(){
        return(
            <div className={styles.container}>
                <img src="/images/idea.png" style={{width:"40px",height:"45px",position:"absolute",left:"20px", top:"-5px"}}/>
                <span style={{marginLeft:"30px"}}>{this.props.content}</span>
            </div>
        );
    }
}
