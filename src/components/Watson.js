import React, {Component} from 'react';
import styles from '../style/App.css';

export default class Watson extends React.Component {
    render(){
        return(
            <div className={styles.container}>
                <img src="/images/logo.png" style={{width:"15px",height:"20px",position:"absolute",left:"20px"}}/>
                <span style={{marginLeft:"30px"}}>{this.props.content}</span>
            </div>
        );
    }
}
