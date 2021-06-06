import { MessagesState } from '../../types';
import {
    SET_UNREAD_COUNT,
    SET_UNREAD_MESSAGES,
    MessageActions
} from '../actions/types';
import { createReducer } from '../../utils/createReducer';

const initialState = {
    messages: [],
    unreadMessages: [],
    unreadCount: 0
};

const messagesReducer = {
    [SET_UNREAD_COUNT]: (state: MessagesState, { unreadCount }) => ({
        ...state,
        unreadCount: unreadCount
    }),
    [SET_UNREAD_MESSAGES]: (state: MessagesState, { unreadMessages }) => ({
        ...state,
        unreadMessages: unreadMessages
    })
};

export default (state = initialState, action: MessageActions) =>
    createReducer(messagesReducer, state, action);
