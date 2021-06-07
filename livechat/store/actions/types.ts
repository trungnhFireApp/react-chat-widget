import { Conversation, Message } from '../../types';

export const SET_CONVERSATION_INFO = 'CONVERSATION/SET_CONVERSATION_INFO';
export const SET_LOAD_CONVERSATION = 'BEHAVIOR/SET_LOAD_CONVERSATION';
export const SET_LOAD_MESSAGE = 'BEHAVIOR/SET_LOAD_MESSAGE';
export const SET_UNREAD_COUNT = 'MESSAGES/SET_UNREAD_COUNT';
export const SET_UNREAD_MESSAGES = 'MESSAGES/SET_UNREAD_MESSAGES';
export const SET_MESSAGES = 'MESSAGES/SET_MESSAGES';

/* Conversation actions */
export interface SetConversationInfo {
    type: typeof SET_CONVERSATION_INFO;
    conversation?: Conversation;
}

/* Behavior actions */
export interface SetLoadConversation {
    type: typeof SET_LOAD_CONVERSATION;
    loadConversation: boolean;
}

export interface SetLoadMessage {
    type: typeof SET_LOAD_MESSAGE;
    loadMessage: boolean;
}

/* Message actions */
export interface SetUnreadCount {
    type: typeof SET_UNREAD_COUNT;
    unreadCount: number;
}

export interface SetUnreadMessages {
    type: typeof SET_UNREAD_MESSAGES;
    unreadMessages: Message[];
}

export interface SetMessages {
    type: typeof SET_MESSAGES;
    messages: Message[];
}

export type ConversationActions = SetConversationInfo;
export type BehaviorActions = SetLoadConversation | SetLoadMessage;
export type MessageActions = SetUnreadCount | SetUnreadMessages | SetMessages;
