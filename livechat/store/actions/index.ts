import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import * as actionTypes from '../actions/types';
import { Conversation, GlobalState, WidgetMessage } from '../../types';

/* Conversation actions */
export const setConversationInfo = (
    payload: Conversation
): ThunkAction<void, GlobalState, null, Action<string>> => (
    dispatch: Dispatch<actionTypes.ConversationActions>
) => {
    dispatch({
        type: actionTypes.SET_CONVERSATION_INFO,
        conversation: payload
    });
};

/* Behavior actions */
export const setLoadConversation = (
    payload: boolean
): ThunkAction<void, GlobalState, null, Action<string>> => (
    dispatch: Dispatch<actionTypes.BehaviorActions>
) => {
    dispatch({
        type: actionTypes.SET_LOAD_CONVERSATION,
        loadConversation: payload
    });
};

export const setLoadMessage = (
    payload: boolean
): ThunkAction<void, GlobalState, null, Action<string>> => (
    dispatch: Dispatch<actionTypes.BehaviorActions>
) => {
    dispatch({
        type: actionTypes.SET_LOAD_MESSAGE,
        loadMessage: payload
    });
};

/* Message actions */
export const setUnreadCount = (
    payload: number
): ThunkAction<void, GlobalState, null, Action<string>> => (
    dispatch: Dispatch<actionTypes.MessageActions>
) => {
    dispatch({
        type: actionTypes.SET_UNREAD_COUNT,
        unreadCount: payload
    });
};

export const setUnreadMessages = (
    payload: WidgetMessage[]
): ThunkAction<void, GlobalState, null, Action<string>> => (
    dispatch: Dispatch<actionTypes.MessageActions>
) => {
    dispatch({
        type: actionTypes.SET_UNREAD_MESSAGES,
        unreadMessages: payload
    });
};
