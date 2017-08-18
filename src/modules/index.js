import {combineReducers} from 'redux';

import dialog from './dialog';
import mrInfo from './mrInfo';
import config from './config';

export default combineReducers({
    dialog,
    mrInfo,
    config
})
