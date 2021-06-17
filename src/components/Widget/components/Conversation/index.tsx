import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import Header from './components/Header';
import Messages from './components/Messages';
import Sender from './components/Sender';
import QuickButtons from './components/QuickButtons';
import WelcomeScreen from './components/WelcomeScreen';

import { AnyFunction } from '../../../../utils/types';

import './style.scss';
import { GlobalState } from '@types';
import ErrorMessages from './components/ErrorMessages';
import Spinner from './components/Spinner';

type Props = {
    title: string;
    subtitle: string;
    senderPlaceHolder: string;
    showCloseButton: boolean;
    disabledInput: boolean;
    autofocus: boolean;
    className: string;
    sendMessage: AnyFunction;
    toggleChat: AnyFunction;
    profileAvatar?: string;
    titleAvatar?: string;
    onQuickButtonClicked?: AnyFunction;
    onTextInputChange?: (event: any) => void;
    sendButtonAlt: string;
    showTimeStamp: boolean;
    handleScrollTop?: AnyFunction;
    hasConversation: boolean;
    audienceId: number;
    handleGetAudience: AnyFunction;
};

function Conversation({
    title,
    subtitle,
    senderPlaceHolder,
    showCloseButton,
    disabledInput,
    autofocus,
    className,
    sendMessage,
    toggleChat,
    profileAvatar,
    titleAvatar,
    onQuickButtonClicked,
    onTextInputChange,
    sendButtonAlt,
    showTimeStamp,
    handleScrollTop,
    hasConversation,
    audienceId,
    handleGetAudience
}: Props) {
    const {
        customWidget: {
            behaviour: {
                visitor: {
                    require_information: { enable }
                }
            }
        },
        widgetLoader,
        messages
    } = useSelector((state: GlobalState) => ({
        customWidget: state.behavior.customWidget,
        widgetLoader: state.behavior.widgetLoader,
        messages: state.messages.messages
    }));

    return (
        <div
            className={cn('rcw-conversation-container', className)}
            aria-live="polite"
        >
            <Header
                title={title}
                subtitle={subtitle}
                toggleChat={toggleChat}
                showCloseButton={showCloseButton}
                titleAvatar={titleAvatar}
            />
            <div className="rcw-conversation-wrapper">
                <Spinner loading={widgetLoader} />
                <div className="rcw-conversation-body">
                    {hasConversation ? (
                        //khi có connect socket thì show
                        <Messages
                            profileAvatar={profileAvatar}
                            showTimeStamp={showTimeStamp}
                            handleScrollTop={handleScrollTop}
                        />
                    ) : (
                        <>
                            {audienceId && messages.length ? ( //khi chưa có connect socket mà có audience id và có message(khi click từ campaign message) thì show
                                <Messages
                                    profileAvatar={profileAvatar}
                                    showTimeStamp={showTimeStamp}
                                    handleScrollTop={handleScrollTop}
                                />
                            ) : (
                                <WelcomeScreen
                                    handleGetAudience={handleGetAudience}
                                    audienceId={audienceId}
                                />
                            )}
                        </>
                    )}
                    <ErrorMessages />
                </div>
                <QuickButtons onQuickButtonClicked={onQuickButtonClicked} />
                {audienceId && (
                    <Sender
                        sendMessage={sendMessage}
                        placeholder={senderPlaceHolder}
                        disabledInput={disabledInput}
                        autofocus={autofocus}
                        onTextInputChange={onTextInputChange}
                        buttonAlt={sendButtonAlt}
                    />
                )}
            </div>
        </div>
    );
}

export default Conversation;
