import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const SET_MESSAGE = 'dialog/SET_MESSAGE';
const SET_REPLY = 'dialog/SET_REPLY';
const SET_CONTEXT = 'dialog/SET_CONTEXT';
const SET_NEWCONTEXT = 'dialog/SET_NEWCONTEXT';
const SET_CONTEXTAUTO = 'dialog/SET_CONTEXTAUTO';
const SET_ENTITIES = 'dialog/SET_ENTITIES';
const SET_DIALOG = 'dialog/SET_DIALOG';
const SEND_MESSAGE_TRIGGER = 'dialog/SEND_MESSAGE_TRIGGER';

export const setMessage = createAction(SET_MESSAGE);
export const setReply = createAction(SET_REPLY);
export const setContext = createAction(SET_CONTEXT);
export const setNewContext = createAction(SET_NEWCONTEXT);
export const setNewContextAuto = createAction(SET_CONTEXTAUTO);
export const setEntities = createAction(SET_ENTITIES);
export const setDialog = createAction(SET_DIALOG);
export const sendMessage = createAction(SEND_MESSAGE_TRIGGER);

const initialState = Map({
    reply : '...',
    message : '',
    context : {},
    newContext : {},
    entities : {},
    input : '',
    output : '',
    sendMessageTrigger : false
});

export default handleActions({
    [SET_MESSAGE]:(state, action) => {
        const message = action.payload;
        const ctx = state.get('context');

        return state.set('message', message)
                    .set('sendMessageTrigger', true)
                    .set('newContext', ctx)
    },
    [SET_REPLY]:(state, action) => state.set('reply', action.payload),
    [SET_CONTEXT]:(state, action) => state.set('context', action.payload),
    [SET_NEWCONTEXT]:(state, action) => {
        const newContext = action.payload;

        return state.set('newContext', newContext)
                    .set('sendMessageTrigger', true)
    },
    [SET_CONTEXTAUTO]:(state, action) => {
        const ctx = state.get('newContext');
        return state.set('context', ctx)
    },
    [SET_ENTITIES]:(state, action) => state.set('entities', action.payload),
    [SET_DIALOG]:(state, action) => {
        const { reply, context, entities, input, output} = action.payload;

        return state.set('reply', reply)
                    .set('context', context)
                    .set('entities', entities)
                    .set('input', input)
                    .set('output', output)
    },
    [SEND_MESSAGE_TRIGGER]:(state, action) => state.set('sendMessageTrigger', action.payload),
}, initialState);
