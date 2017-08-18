import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const SET_SETTINGS = 'config/SET_SETTINGS';
const SET_SHOWFLAG = 'config/SET_SHOWFLAG';
const SET_USERNAME = 'config/SET_USERNAME';

export const setSettings = createAction(SET_SETTINGS);
export const setShowflag = createAction(SET_SHOWFLAG);
export const setUserName = createAction(SET_USERNAME);

const initialState = Map({
    settings : {},
    showFlag : false,
    userName : ''
});

export default handleActions({
    [SET_SETTINGS]:(state, action) => {
        const settings = action.payload;
        return state.set('settings', settings)
                    .set('showFlag', true)
    },
    [SET_SHOWFLAG]:(state, action) => state.set('showFlag', action.payload),
    [SET_USERNAME]:(state, action) => state.set('userName', action.payload)
}, initialState);
