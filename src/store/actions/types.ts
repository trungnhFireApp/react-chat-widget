import { ElementType } from 'react';

import { LinkParams, FullscreenPreviewState, MessageLink } from '../types';
import { CustomWidget } from '../customTypes';

export const TOGGLE_CHAT = 'BEHAVIOR/TOGGLE_CHAT';
export const TOGGLE_INPUT_DISABLED = 'BEHAVIOR/TOGGLE_INPUT_DISABLED';
export const TOGGLE_MESSAGE_LOADER = 'BEHAVIOR/TOGGLE_MSG_LOADER';
export const SET_BADGE_COUNT = 'BEHAVIOR/SET_BADGE_COUNT';
export const TOGGLE_WIDGET_LOADER = 'BEHAVIOR/TOGGLE_WIDGET_LOADER';
export const SET_CUSTOM_WIDGET = 'BEHAVIOR/SET_CUSTOM_WIDGET';
export const TRIGGER_SCROLL_TO_BOTTOM = 'BEHAVIOR/TRIGGER_SCROLL_TO_BOTTOM';
export const ADD_NEW_USER_MESSAGE = 'MESSAGES/ADD_NEW_USER_MESSAGE';
export const ADD_NEW_RESPONSE_MESSAGE = 'MESSAGES/ADD_NEW_RESPONSE_MESSAGE';
export const UNSHIFT_NEW_USER_MESSAGE = 'MESSAGES/UNSHIFT_NEW_USER_MESSAGE';
export const UNSHIFT_NEW_RESPONSE_MESSAGE =
    'MESSAGES/UNSHIFT_NEW_RESPONSE_MESSAGE';
export const ADD_NEW_LINK_SNIPPET = 'MESSAGES/ADD_NEW_LINK_SNIPPET';
export const ADD_COMPONENT_MESSAGE = 'MESSAGES/ADD_COMPONENT_MESSAGE';
export const DROP_MESSAGES = 'MESSAGES/DROP_MESSAGES';
export const HIDE_AVATAR = 'MESSAGES/HIDE_AVATAR';
export const DELETE_MESSAGES = 'MESSAGES/DELETE_MESSAGES';
export const MARK_ALL_READ = 'MESSAGES/MARK_ALL_READ';
export const MARK_MESSAGE_AS_READ = 'MESSAGES/MARK_MESSAGE_AS_READ';
export const SET_QUICK_BUTTONS = 'SET_QUICK_BUTTONS';
export const OPEN_FULLSCREEN_PREVIEW = 'FULLSCREEN/OPEN_PREVIEW';
export const CLOSE_FULLSCREEN_PREVIEW = 'FULLSCREEN/CLOSE_PREVIEW';
export const SET_ERRORS = 'ERROR/SET_ERRORS';

export interface ToggleChat {
    type: typeof TOGGLE_CHAT;
}

export interface ToggleInputDisabled {
    type: typeof TOGGLE_INPUT_DISABLED;
}

export interface ToggleWidgetLoader {
    type: typeof TOGGLE_WIDGET_LOADER;
}

export interface AddUserMessage {
    type: typeof ADD_NEW_USER_MESSAGE;
    text: string;
    id?: string;
    timestamp?: Date;
    message_links?: MessageLink[];
}

export interface AddResponseMessage {
    type: typeof ADD_NEW_RESPONSE_MESSAGE;
    text: string;
    id?: string;
    unread?: boolean;
    timestamp?: Date;
    message_links?: MessageLink[];
}

export interface UnshiftUserMessage {
    type: typeof UNSHIFT_NEW_USER_MESSAGE;
    text: string;
    id?: string;
    timestamp?: Date;
    message_links?: MessageLink[];
}

export interface UnshiftResponseMessage {
    type: typeof UNSHIFT_NEW_RESPONSE_MESSAGE;
    text: string;
    id?: string;
    unread?: boolean;
    timestamp?: Date;
    message_links?: MessageLink[];
}

export interface ToggleMsgLoader {
    type: typeof TOGGLE_MESSAGE_LOADER;
}

export interface AddLinkSnippet {
    type: typeof ADD_NEW_LINK_SNIPPET;
    link: LinkParams;
    id?: string;
}

export interface RenderCustomComponent {
    type: typeof ADD_COMPONENT_MESSAGE;
    component: ElementType;
    props: any;
    showAvatar: boolean;
    id?: string;
}

export interface DropMessages {
    type: typeof DROP_MESSAGES;
}

export interface HideAvatar {
    type: typeof HIDE_AVATAR;
    index: number;
}

export interface DeleteMessages {
    type: typeof DELETE_MESSAGES;
    count: number;
    id?: string;
}

export interface SetQuickButtons {
    type: typeof SET_QUICK_BUTTONS;
    buttons: Array<{ label: string; value: string | number }>;
}

export interface SetBadgeCount {
    type: typeof SET_BADGE_COUNT;
    count: number;
}

export interface MarkAllMessagesRead {
    type: typeof MARK_ALL_READ;
}

export interface MarkMessageAsRead {
    type: typeof MARK_MESSAGE_AS_READ;
    id?: string;
}

export interface SetCustomWidget {
    type: typeof SET_CUSTOM_WIDGET;
    customWidget: CustomWidget;
}

export interface TriggerScrollToBottom {
    type: typeof TRIGGER_SCROLL_TO_BOTTOM;
}

export interface SetErrors {
    type: typeof SET_ERRORS;
    errors: string[];
}

export type BehaviorActions =
    | ToggleChat
    | ToggleInputDisabled
    | ToggleMsgLoader
    | ToggleWidgetLoader
    | SetCustomWidget
    | TriggerScrollToBottom;

export type MessagesActions =
    | AddUserMessage
    | AddResponseMessage
    | UnshiftUserMessage
    | UnshiftResponseMessage
    | AddLinkSnippet
    | RenderCustomComponent
    | DropMessages
    | HideAvatar
    | DeleteMessages
    | MarkAllMessagesRead
    | MarkMessageAsRead
    | SetBadgeCount;

export type QuickButtonsActions = SetQuickButtons;

export type ErrorActions = SetErrors;

export interface openFullscreenPreview {
    type: typeof OPEN_FULLSCREEN_PREVIEW;
    payload: FullscreenPreviewState;
}

export interface closeFullscreenPreview {
    type: typeof CLOSE_FULLSCREEN_PREVIEW;
}

export type FullscreenPreviewActions =
    | openFullscreenPreview
    | closeFullscreenPreview;
