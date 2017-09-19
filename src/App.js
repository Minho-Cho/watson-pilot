import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as configActions from './modules/config';

import WatsonContainer from './containers/WatsonContainer';
import ClientContainer from './containers/ClientContainer';
import WSContainer from './containers/WSContainer';
import ConversationContainer from './containers/ConversationContainer';
import ConferenceRoomContainer from './containers/ConferenceRoomContainer';
import ConferenceRoomRsvrInfoContainer from './containers/ConferenceRoomRsvrInfoContainer';
import ConferenceRoomMyRsvrInfoContainer from './containers/ConferenceRoomMyRsvrInfoContainer';
import ConferenceRoomRsvrContainer from './containers/ConferenceRoomRsvrContainer';
import ConfigInfoContainer from './containers/ConfigInfoContainer';

import styles from './style/App.css';

const dotenv = require('dotenv');

class App extends Component {

    componentWillMount(){
        fetch('/api/common/initCron').then((response) => {
            return response.text();
        }).then((res)=>{

        });
    }

    render(){

        return (
            <div>
                <div className={styles.header}>
                    <div className={styles.wrap}>
                        <div className={styles.logo}>
                            <img src="/images/logo.png" style={{width:"22px",height:"30px", top:"5px",position:"relative",left:"-5px"}}/>
                            <a href="index.html"><span>AIBRIL X Hi-Tech</span></a>
                        </div>
                        <div className={styles.navIcon}>
                            <a href="#" id="activator"><span> </span> </a>
                        </div>
                        <div className={styles.box} id="box">
                            <div>
                                <div className={styles.box_content_center}>
                                    <div>
                                        <div className={styles.menu_box_list}>
                                            <ul>
                                                <li><a href="#"><span>home</span></a></li>
                                                <li><a href="#"><span>About</span></a></li>
                                                <div className={styles.clear}> </div>
                                            </ul>
                                        </div>
                                        <a className={styles.boxclose} id="boxclose"> <span> </span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.top_searchbar}>
                            <ClientContainer/>
                        </div>
                        <div className={styles.clear}></div>
                    </div>
                </div>
                <div className={styles.userinfo}>
                    <div className={styles.user}>
                        <ul>
                            <li><a href="#"><img src="images/user-pic.png" title="user-name"/><span>{this.props.userName} 님</span></a></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.wrap}>
                        <div id="main" role="main" >
                            <ul id="tiles">
                                <li style={{position:'absolute',top:'450px',left:'400px'}}>
                                    <WatsonContainer/>
                                    <ConferenceRoomContainer/>
                                    <ConferenceRoomRsvrInfoContainer/>
                                    <ConferenceRoomMyRsvrInfoContainer/>
                                    <ConferenceRoomRsvrContainer/>
                                    <ConfigInfoContainer/>
                                    <WSContainer/>
                                    <ConversationContainer/>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        userName:state.config.get('userName')
    }),
    (dispatch) => ({
        ConfigActions : bindActionCreators(configActions, dispatch)
    })
)(App)
