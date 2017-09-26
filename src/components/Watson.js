import React, {Component} from 'react';
import styles from '../style/App.css';

export default class Watson extends React.Component {
    render(){
        return(
            <div className={styles.containerAnswer}>
                <img src="/images/idea.png" style={{width:"40px",height:"40px"}}/>
                <span style={{width:"40px",height:"40px"}}>{this.props.content}</span>
            </div>
        );
    }
}
