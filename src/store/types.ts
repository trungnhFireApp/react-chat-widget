import { ElementType } from 'react';
import { CustomWidget } from './customTypes';

type BaseMessage = {
    type: string;
    component: ElementType;
    sender: string;
    showAvatar: boolean;
    timestamp: Date;
    unread: boolean;
    customId?: string;
    props?: any;
};

export type MessageLink = {
    origin: string;
    shorten: string;
};

export interface Message extends BaseMessage {
    text: string;
}

export type QuickButton = {
    label: string;
    value: string | number;
    component: ElementType;
};

export interface Link extends BaseMessage {
    title: string;
    link: string;
    target: string;
}

export interface LinkParams {
    link: string;
    title: string;
    target?: string;
}

export interface CustomCompMessage extends BaseMessage {
    props: any;
}

export interface BehaviorState {
    showChat: boolean;
    disabledInput: boolean;
    messageLoader: boolean;
    widgetLoader: boolean;
    customWidget: CustomWidget;
    scrollToBottomRandomString: string;
}

export interface MessagesState {
    messages: (Message | Link | CustomCompMessage)[];
    badgeCount: number;
}

export interface QuickButtonsState {
    quickButtons: QuickButton[];
}

export interface ImageState {
    src: string;
    alt?: string;
    width: number;
    height: number;
}

export interface FullscreenPreviewState extends ImageState {
    visible?: boolean;
}

export interface ErrorState {
    errors: string[];
}

export interface GlobalState {
    messages: MessagesState;
    behavior: BehaviorState;
    quickButtons: QuickButtonsState;
    preview: FullscreenPreviewState;
    error: ErrorState;
}
