import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const SET_ROOMINFO = 'mrInfo/SET_ROOMINFO';
const SET_RSVRINFO = 'mrInfo/SET_RSVRINFO';
const SET_MYRSVRINFO = 'mrInfo/SET_MYRSVRINFO';
const CONTROL_SHOW_FLAG = 'mrInfo/CONTROL_SHOW_FLAG';
const INIT_RSVR_ROOM = 'mrInfo/INIT_RSVR_ROOM';
const SET_RSVRTIMEINFO = 'mrInfo/SET_RSVRTIMEINFO';
const SET_RSVRCANCELINFO = 'mrInfo/SET_RSVRCANCELINFO';
const GRID_SHOW_FLAG = 'mrInfo/GRID_SHOW_FLAG';

export const setRoomInfo = createAction(SET_ROOMINFO);
export const setRsvrInfo = createAction(SET_RSVRINFO);
export const setMyRsvrInfo = createAction(SET_MYRSVRINFO);
export const controlShowFlag = createAction(CONTROL_SHOW_FLAG);
export const initRsvrRoom = createAction(INIT_RSVR_ROOM);
export const setRsvrTimeInfo = createAction(SET_RSVRTIMEINFO);
export const setRsvrCancelInfo = createAction(SET_RSVRCANCELINFO);
export const setGridFlag = createAction(GRID_SHOW_FLAG);

const initialState = Map({
    roomInfo : '',
    rsvrInfo : '',
    myrsvrInfo : '',
    rsvrTimeInfo : '',
	  rsvrCancelInfo : '',
    roomInfoShowFlag : false,
    rsvrInfoShowFlag : false,
    myrsvrInfoShowFlag : false,
    rsvrCnfmShowFlag : false,
    gridFlag : false
});

export default handleActions({
    [SET_ROOMINFO]:(state, action) => {
        const { roomInfo, roomInfoShowFlag} = action.payload;

        let rsvrInfoShowFlag = roomInfoShowFlag?false:state.get('rsvrInfoShowFlag');
        let myrsvrInfoShowFlag = roomInfoShowFlag?false:state.get('myrsvrInfoShowFlag');
        let rsvrCnfmShowFlag = roomInfoShowFlag?false:state.get('rsvrCnfmShowFlag');

        return state.set('roomInfo', roomInfo)
                    .set('roomInfoShowFlag', roomInfoShowFlag)
                    .set('rsvrInfoShowFlag', rsvrInfoShowFlag)
                    .set('myrsvrInfoShowFlag', myrsvrInfoShowFlag)
                    .set('rsvrCnfmShowFlag', rsvrCnfmShowFlag)
                    .set('gridFlag', true)
    },
    [SET_RSVRINFO]:(state, action) => {
        const { rsvrInfo, rsvrInfoShowFlag} = action.payload;

        let rsvrCnfmShowFlag = rsvrInfoShowFlag?false:state.get('rsvrCnfmShowFlag');
        let myrsvrInfoShowFlag = rsvrInfoShowFlag?false:state.get('myrsvrInfoShowFlag');

        return state.set('rsvrInfo', rsvrInfo)
                    .set('rsvrInfoShowFlag', rsvrInfoShowFlag)
                    .set('myrsvrInfoShowFlag', myrsvrInfoShowFlag)
                    .set('rsvrCnfmShowFlag', rsvrCnfmShowFlag)

    },
    [SET_MYRSVRINFO]:(state, action) => {
        const { myrsvrInfo, myrsvrInfoShowFlag} = action.payload;

        let rsvrInfoShowFlag = myrsvrInfoShowFlag?false:state.get('rsvrInfoShowFlag');
        let rsvrCnfmShowFlag = myrsvrInfoShowFlag?false:state.get('rsvrCnfmShowFlag');

        return state.set('myrsvrInfo', myrsvrInfo)
                    .set('myrsvrInfoShowFlag', myrsvrInfoShowFlag)
                    .set('rsvrInfoShowFlag', rsvrInfoShowFlag)
                    .set('rsvrCnfmShowFlag', rsvrCnfmShowFlag)
                    .set('gridFlag', true)

    },
    [CONTROL_SHOW_FLAG]:(state, action) => {
        const { roomInfoShowFlag, rsvrInfoShowFlag, myrsvrInfoShowFlag, rsvrCnfmShowFlag} = action.payload;

        return state.set('roomInfoShowFlag', roomInfoShowFlag)
                    .set('rsvrInfoShowFlag', rsvrInfoShowFlag)
                    .set('myrsvrInfoShowFlag', myrsvrInfoShowFlag)
                    .set('rsvrCnfmShowFlag', rsvrCnfmShowFlag)
                    .set('gridFlag', true)
    },
    [GRID_SHOW_FLAG]:(state, action) => {
        return state.set('gridFlag', false)
    },
    [INIT_RSVR_ROOM]:(state, action) => {
        return state.set('roomInfo', '')
                    .set('rsvrInfo', '')
                    .set('roomInfoShowFlag', false)
                    .set('rsvrInfoShowFlag', false)
                    .set('myrsvrInfoShowFlag', false)
                    .set('rsvrCnfmShowFlag', false)
                    .set('gridFlag', true)
    },
    [SET_RSVRTIMEINFO]:(state, action) => state.set('rsvrTimeInfo', action.payload),
	[SET_RSVRCANCELINFO]:(state, action) => state.set('rsvrCancelInfo', action.payload)
}, initialState);
