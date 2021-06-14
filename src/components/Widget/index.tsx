import React from 'react';
import { useDispatch } from 'react-redux';

import {
    toggleChat,
    addUserMessage,
    triggerScrollToBottom
} from '../../store/actions';
import { isWidgetOpened } from '../../store/dispatcher';
import { AnyFunction } from '../../utils/types';

import WidgetLayout from './layout';

type Props = {
    title: string;
    titleAvatar?: string;
    subtitle: string;
    senderPlaceHolder: string;
    profileAvatar?: string;
    showCloseButton: boolean;
    fullScreenMode: boolean;
    autofocus: boolean;
    customLauncher?: AnyFunction;
    handleNewUserMessage: AnyFunction;
    handleQuickButtonClicked?: AnyFunction;
    handleTextInputChange?: (event: any) => void;
    chatId: string;
    handleToggle?: AnyFunction;
    launcherOpenLabel: string;
    launcherCloseLabel: string;
    launcherOpenImg: string;
    launcherCloseImg: string;
    sendButtonAlt: string;
    showTimeStamp: boolean;
    imagePreview?: boolean;
    zoomStep?: number;
    handleSubmit?: AnyFunction;
    handleScrollTop?: AnyFunction;
    hasConversation: boolean;
    audienceId: number;
    handleGetAudience: AnyFunction;
    unreadMessagesInBubble?: Array<any>;
    handleMarkMessageAsRead?: AnyFunction;
};

function Widget({
    title,
    titleAvatar,
    subtitle,
    senderPlaceHolder,
    profileAvatar,
    showCloseButton,
    fullScreenMode,
    autofocus,
    customLauncher,
    handleNewUserMessage,
    handleQuickButtonClicked,
    handleTextInputChange,
    chatId,
    handleToggle,
    launcherOpenLabel,
    launcherCloseLabel,
    launcherCloseImg,
    launcherOpenImg,
    sendButtonAlt,
    showTimeStamp,
    imagePreview,
    zoomStep,
    handleSubmit,
    handleScrollTop,
    hasConversation,
    audienceId,
    handleGetAudience,
    unreadMessagesInBubble,
    handleMarkMessageAsRead
}: Props) {
    const dispatch = useDispatch();

    const toggleConversation = () => {
        dispatch(toggleChat());
        handleToggle ? handleToggle(isWidgetOpened()) : null;
    };

    const handleMessageSubmit = event => {
        event.preventDefault();
        event.persist(); // https://reactjs.org/docs/legacy-event-pooling.html
        const userInput = event.target.message.value;

        if (!userInput.trim()) {
            return;
        }

        handleSubmit?.(event, userInput, (event, userInput) => {
            // dispatch(addUserMessage(userInput));
            handleNewUserMessage(userInput);
            event.target.message.value = '';
            dispatch(triggerScrollToBottom());
        });
    };

    const onQuickButtonClicked = (event, value) => {
        event.preventDefault();
        handleQuickButtonClicked?.(value);
    };

    return (
        <WidgetLayout
            onToggleConversation={toggleConversation}
            onSendMessage={handleMessageSubmit}
            onQuickButtonClicked={onQuickButtonClicked}
            title={title}
            titleAvatar={titleAvatar}
            subtitle={subtitle}
            senderPlaceHolder={senderPlaceHolder}
            profileAvatar={profileAvatar}
            showCloseButton={showCloseButton}
            fullScreenMode={fullScreenMode}
            autofocus={autofocus}
            customLauncher={customLauncher}
            onTextInputChange={handleTextInputChange}
            chatId={chatId}
            launcherOpenLabel={launcherOpenLabel}
            launcherCloseLabel={launcherCloseLabel}
            launcherCloseImg={launcherCloseImg}
            launcherOpenImg={launcherOpenImg}
            sendButtonAlt={sendButtonAlt}
            showTimeStamp={showTimeStamp}
            imagePreview={imagePreview}
            zoomStep={zoomStep}
            handleScrollTop={handleScrollTop}
            hasConversation={hasConversation}
            audienceId={audienceId}
            handleGetAudience={handleGetAudience}
            unreadMessagesInBubble={unreadMessagesInBubble}
            handleMarkMessageAsRead={handleMarkMessageAsRead}
        />
    );
}

export default Widget;
