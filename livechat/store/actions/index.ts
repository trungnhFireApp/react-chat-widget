import { Dispatch, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import * as actionTypes from '../actions/types';
import { Conversation, GlobalState, Message } from '../../types';

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
    unreadMessages: Message[],
    isConcat?: boolean
): ThunkAction<void, GlobalState, null, Action<string>> => (
    dispatch: Dispatch<actionTypes.MessageActions>,
    getState: () => GlobalState
) => {
    const { messages } = getState();
    let result = [...unreadMessages];
    if (isConcat) {
        result = [...messages.unreadMessages].concat(unreadMessages);
    }

    //unique message
    result = [...new Map(result.map(item => [item['_id'], item])).values()];

    dispatch({
        type: actionTypes.SET_UNREAD_MESSAGES,
        unreadMessages: result
    });
};

export const setMessages = (
    payload: Message[]
): ThunkAction<void, GlobalState, null, Action<string>> => (
    dispatch: Dispatch<actionTypes.MessageActions>
) => {
    dispatch({
        type: actionTypes.SET_MESSAGES,
        messages: payload
    });
};
