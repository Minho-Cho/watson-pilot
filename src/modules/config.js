import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const SET_SETTINGS = 'config/SET_SETTINGS';
const SET_SHOWFLAG = 'config/SET_SHOWFLAG';
const SET_USERNAME = 'config/SET_USERNAME';
const SET_MYRSVR_USER = 'config/SET_MYRSVR_USER';

export const setSettings = createAction(SET_SETTINGS);
export const setShowflag = createAction(SET_SHOWFLAG);
export const setUserName = createAction(SET_USERNAME);
export const setMyRsvrUser = createAction(SET_MYRSVR_USER);

const initialState = Map({
    settings : {},
    showFlag : false,
    userName : '',
    myRsvrUserId : '',
    myRsvrUserName : ''
});

export default handleActions({
    [SET_SETTINGS]:(state, action) => {
        const settings = action.payload;
        let showFlag = settings.showFlag==undefined?true:settings.showFlag
        return state.set('settings', settings)
                    .set('showFlag', showFlag)
    },
    [SET_SHOWFLAG]:(state, action) => state.set('showFlag', action.payload),
    [SET_USERNAME]:(state, action) => state.set('userName', action.payload),

    [SET_MYRSVR_USER]:(state, action) => {
        const {myRsvrUserId, myRsvrUserName} = action.payload;

        return state.set('myRsvrUserId', myRsvrUserId)
                    .set('myRsvrUserName', myRsvrUserName)

    }


}, initialState);
