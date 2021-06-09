import { ConversationState, Conversation } from '../../types';
import { SET_CONVERSATION_INFO, ConversationActions } from '../actions/types';
import { createReducer } from '../../utils/createReducer';

const initialState = {
    conversation: {} as Conversation
};

const conversationReducer = {
    [SET_CONVERSATION_INFO]: (state: ConversationState, { conversation }) => ({
        ...state,
        conversation: conversation
    })
};

export default (
    state: ConversationState = initialState,
    action: ConversationActions
) => createReducer(conversationReducer, state, action);
