import { ElementType } from 'react';

import store from '.';
import * as actions from './actions';
import { LinkParams, ImageState } from './types';

export function addUserMessage(text: string, id?: string, timestamp?: Date) {
    store.dispatch(actions.addUserMessage(text, id, timestamp));
}

export function addResponseMessage(
    text: string,
    id?: string,
    unread?: boolean,
    timestamp?: Date
) {
    store.dispatch(actions.addResponseMessage(text, id, unread, timestamp));
}

export function unshiftUserMessage(
    text: string,
    id?: string,
    timestamp?: Date
) {
    store.dispatch(actions.unshiftUserMessage(text, id, timestamp));
}

export function unshiftResponseMessage(
    text: string,
    id?: string,
    unread?: boolean,
    timestamp?: Date
) {
    store.dispatch(actions.unshiftResponseMessage(text, id, unread, timestamp));
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
