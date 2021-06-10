import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import Header from './components/Header';
import Messages from './components/Messages';
import Sender from './components/Sender';
import QuickButtons from './components/QuickButtons';
import Welcome from './components/Welcome';
import AudienceForm from './components/AudienceForm';

import { AnyFunction } from '../../../../utils/types';

import './style.scss';
import { GlobalState } from '@types';

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
    hasConversation
}: Props) {
    const {
        customWidget: {
            behaviour: {
                visitor: { require_information }
            }
        }
    } = useSelector((state: GlobalState) => ({
        customWidget: state.behavior.customWidget
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
            <div className="rcw-conversation-body">
                {hasConversation ? (
                    <Messages
                        profileAvatar={profileAvatar}
                        showTimeStamp={showTimeStamp}
                        handleScrollTop={handleScrollTop}
                    />
                ) : (
                    <>
                        {require_information.enable ? (
                            <AudienceForm />
                        ) : (
                            <Welcome />
                        )}
                    </>
                )}
            </div>
            <QuickButtons onQuickButtonClicked={onQuickButtonClicked} />
            <Sender
                sendMessage={sendMessage}
                placeholder={senderPlaceHolder}
                disabledInput={disabledInput}
                autofocus={autofocus}
                onTextInputChange={onTextInputChange}
                buttonAlt={sendButtonAlt}
            />
        </div>
    );
}

export default Conversation;
