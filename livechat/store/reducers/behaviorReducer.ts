import { BehaviorState } from '../../types';
import {
    SET_LOAD_CONVERSATION,
    SET_LOAD_MESSAGE,
    BehaviorActions
} from '../actions/types';
import { createReducer } from '../../utils/createReducer';

const initialState = {
    loadConversation: false,
    loadMessage: false
};

const behaviorReducer = {
    [SET_LOAD_CONVERSATION]: (state: BehaviorState, { loadConversation }) => ({
        ...state,
        loadConversation: loadConversation
    }),
    [SET_LOAD_MESSAGE]: (state: BehaviorState, { loadMessage }) => ({
        ...state,
        loadMessage: loadMessage
    })
};

export default (state: BehaviorState = initialState, action: BehaviorActions) =>
    createReducer(behaviorReducer, state, action);
