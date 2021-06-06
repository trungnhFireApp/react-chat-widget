import { ConversationState, Conversation } from '../../types';
import { SET_CONVERSATION_INFO, ConversationActions } from '../actions/types';
import { createReducer } from '../../utils/createReducer';

const initialState = {
    conversation: null
};

const conversationReducer = {
    [SET_CONVERSATION_INFO]: (state: ConversationState, { conversation }) => ({
        ...state,
        conversation: conversation
    })
};

export default (state = initialState, action: ConversationActions) =>
    createReducer(conversationReducer, state, action);
