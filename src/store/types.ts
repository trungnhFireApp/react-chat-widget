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

export interface AudienceInfo {
    name?: string;
    email?: string;
    phone?: string;
}

export interface AudienceInfoError {
    name: {
        isValid: boolean;
        errMes: string[];
    };
    email: {
        isValid: boolean;
        errMes: string[];
    };
    phone: {
        isValid: boolean;
        errMes: string[];
    };
}

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

export interface AudienceState {
    audienceInfo: AudienceInfo;
    audienceInfoError: AudienceInfoError;
}

export interface GlobalState {
    messages: MessagesState;
    behavior: BehaviorState;
    quickButtons: QuickButtonsState;
    preview: FullscreenPreviewState;
    audience: AudienceState;
}
