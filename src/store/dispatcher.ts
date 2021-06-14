import { ElementType } from 'react';

import store from '.';
import * as actions from './actions';
import { CustomWidget } from './customTypes';
import { LinkParams, ImageState, MessageLink } from './types';

export function addUserMessage(
    text: string,
    id?: string,
    timestamp?: Date,
    message_links?: MessageLink[]
) {
    store.dispatch(actions.addUserMessage(text, id, timestamp, message_links));
}

export function addResponseMessage(
    text: string,
    id?: string,
    unread?: boolean,
    timestamp?: Date,
    message_links?: MessageLink[]
) {
    store.dispatch(
        actions.addResponseMessage(text, id, unread, timestamp, message_links)
    );
}

export function unshiftUserMessage(
    text: string,
    id?: string,
    timestamp?: Date,
    message_links?: MessageLink[]
) {
    store.dispatch(
        actions.unshiftUserMessage(text, id, timestamp, message_links)
    );
}

export function unshiftResponseMessage(
    text: string,
    id?: string,
    unread?: boolean,
    timestamp?: Date,
    message_links?: MessageLink[]
) {
    store.dispatch(
        actions.unshiftResponseMessage(
            text,
            id,
            unread,
            timestamp,
            message_links
        )
    );
}

export function addLinkSnippet(link: LinkParams, id?: string) {
    store.dispatch(actions.addLinkSnippet(link, id));
}

export function toggleMsgLoader() {
    store.dispatch(actions.toggleMsgLoader());
}

export function renderCustomComponent(
    component: ElementType,
    props: any,
    showAvatar = false,
    id?: string
) {
    store.dispatch(
        actions.renderCustomComponent(component, props, showAvatar, id)
    );
}

export function toggleWidget() {
    store.dispatch(actions.toggleChat());
}

export function toggleInputDisabled() {
    store.dispatch(actions.toggleInputDisabled());
}

export function toggleWidgetLoader() {
    store.dispatch(actions.toggleWidgetLoader());
}

export function dropMessages() {
    store.dispatch(actions.dropMessages());
}

export function isWidgetOpened(): boolean {
    return store.getState().behavior.showChat;
}

export function setQuickButtons(
    buttons: Array<{ label: string; value: string | number }>
) {
    store.dispatch(actions.setQuickButtons(buttons));
}

export function deleteMessages(count: number, id?: string) {
    store.dispatch(actions.deleteMessages(count, id));
}

export function markAllAsRead() {
    store.dispatch(actions.markAllMessagesRead());
}

export function markMessageRead(id?: string) {
    store.dispatch(actions.markMessageRead(id));
}

export function setBadgeCount(count: number) {
    store.dispatch(actions.setBadgeCount(count));
}

export function openFullscreenPreview(payload: ImageState) {
    store.dispatch(actions.openFullscreenPreview(payload));
}

export function closeFullscreenPreview() {
    store.dispatch(actions.closeFullscreenPreview());
}

export function setCustomWidget(customWidget: CustomWidget) {
    store.dispatch(actions.setCustomWidget(customWidget));
}

export function setErrors(errors: string[]) {
    store.dispatch(actions.setErrors(errors));
}

export function triggerScrollToBottom() {
    store.dispatch(actions.triggerScrollToBottom());
}
