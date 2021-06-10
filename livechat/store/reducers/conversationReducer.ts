import { ConversationState, Conversation } from '../../types';
import { SET_CONVERSATION_INFO, ConversationActions } from '../actions/types';
import { createReducer } from '../../utils/createReducer';
import { Nullable } from './../../utils/types';

const initialState: ConversationState = {
    conversation: undefined
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
