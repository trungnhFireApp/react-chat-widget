import { ElementType } from 'react';

import * as actionsTypes from './types';
import { LinkParams, ImageState, MessageLink } from '../types';
import { CustomWidget } from '../customTypes';

export function toggleChat(): actionsTypes.ToggleChat {
    return {
        type: actionsTypes.TOGGLE_CHAT
    };
}

export function toggleInputDisabled(): actionsTypes.ToggleInputDisabled {
    return {
        type: actionsTypes.TOGGLE_INPUT_DISABLED
    };
}

export function toggleWidgetLoader(): actionsTypes.ToggleWidgetLoader {
    return {
        type: actionsTypes.TOGGLE_WIDGET_LOADER
    };
}

export function addUserMessage(
    text: string,
    id?: string,
    timestamp?: Date,
    message_links?: MessageLink[]
): actionsTypes.AddUserMessage {
    return {
        type: actionsTypes.ADD_NEW_USER_MESSAGE,
        text,
        id,
        timestamp,
        message_links
    };
}

export function addResponseMessage(
    text: string,
    id?: string,
    unread?: boolean,
    timestamp?: Date,
    message_links?: MessageLink[]
): actionsTypes.AddResponseMessage {
    return {
        type: actionsTypes.ADD_NEW_RESPONSE_MESSAGE,
        text,
        id,
        unread,
        timestamp,
        message_links
    };
}

export function unshiftUserMessage(
    text: string,
    id?: string,
    timestamp?: Date,
    message_links?: MessageLink[]
): actionsTypes.UnshiftUserMessage {
    return {
        type: actionsTypes.UNSHIFT_NEW_USER_MESSAGE,
        text,
        id,
        timestamp,
        message_links
    };
}

export function unshiftResponseMessage(
    text: string,
    id?: string,
    unread?: boolean,
    timestamp?: Date,
    message_links?: MessageLink[]
): actionsTypes.UnshiftResponseMessage {
    return {
        type: actionsTypes.UNSHIFT_NEW_RESPONSE_MESSAGE,
        text,
        id,
        unread,
        timestamp,
        message_links
    };
}

export function toggleMsgLoader(): actionsTypes.ToggleMsgLoader {
    return {
        type: actionsTypes.TOGGLE_MESSAGE_LOADER
    };
}

export function addLinkSnippet(
    link: LinkParams,
    id?: string
): actionsTypes.AddLinkSnippet {
    return {
        type: actionsTypes.ADD_NEW_LINK_SNIPPET,
        link,
        id
    };
}

export function renderCustomComponent(
    component: ElementType,
    props: any,
    showAvatar: boolean,
    id?: string
): actionsTypes.RenderCustomComponent {
    return {
        type: actionsTypes.ADD_COMPONENT_MESSAGE,
        component,
        props,
        showAvatar,
        id
    };
}

export function dropMessages(): actionsTypes.DropMessages {
    return {
        type: actionsTypes.DROP_MESSAGES
    };
}

export function hideAvatar(index: number): actionsTypes.HideAvatar {
    return {
        type: actionsTypes.HIDE_AVATAR,
        index
    };
}

export function setQuickButtons(
    buttons: Array<{ label: string; value: string | number }>
): actionsTypes.SetQuickButtons {
    return {
        type: actionsTypes.SET_QUICK_BUTTONS,
        buttons
    };
}

export function deleteMessages(
    count: number,
    id?: string
): actionsTypes.DeleteMessages {
    return {
        type: actionsTypes.DELETE_MESSAGES,
        count,
        id
    };
}

export function setBadgeCount(count: number): actionsTypes.SetBadgeCount {
    return {
        type: actionsTypes.SET_BADGE_COUNT,
        count
    };
}

export function markAllMessagesRead(): actionsTypes.MarkAllMessagesRead {
    return {
        type: actionsTypes.MARK_ALL_READ
    };
}

export function markMessageRead(id?: string): actionsTypes.MarkMessageAsRead {
    return {
        type: actionsTypes.MARK_MESSAGE_AS_READ,
        id
    };
}

export function openFullscreenPreview(
    payload: ImageState
): actionsTypes.FullscreenPreviewActions {
    return {
        type: actionsTypes.OPEN_FULLSCREEN_PREVIEW,
        payload
    };
}

export function closeFullscreenPreview(): actionsTypes.FullscreenPreviewActions {
    return {
        type: actionsTypes.CLOSE_FULLSCREEN_PREVIEW
    };
}

export function setCustomWidget(
    customWidget: CustomWidget
): actionsTypes.SetCustomWidget {
    return {
        type: actionsTypes.SET_CUSTOM_WIDGET,
        customWidget: customWidget
    };
}

export function triggerScrollToBottom(): actionsTypes.TriggerScrollToBottom {
    return {
        type: actionsTypes.TRIGGER_SCROLL_TO_BOTTOM
    };
}

export function setErrors(errors: string[]): actionsTypes.SetErrors {
    return {
        type: actionsTypes.SET_ERRORS,
        errors: errors
    };
}
