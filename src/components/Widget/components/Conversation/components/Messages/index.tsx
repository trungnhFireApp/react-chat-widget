import React, {
    useEffect,
    useRef,
    useState,
    ElementRef,
    ImgHTMLAttributes,
    MouseEvent
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import format from 'date-fns/format';

import { scrollToBottom } from '../../../../../../utils/messages';
import {
    Message,
    Link,
    CustomCompMessage,
    GlobalState
} from '../../../../../../store/types';
import { setBadgeCount, markAllMessagesRead } from '@actions';

import Loader from './components/Loader';
import { AnyFunction } from '../../../../../../utils/types';

import './styles.scss';

type Props = {
    showTimeStamp: boolean;
    profileAvatar?: string;
    handleScrollTop?: AnyFunction;
};

function Messages({ profileAvatar, showTimeStamp, handleScrollTop }: Props) {
    const dispatch = useDispatch();
    const {
        messages,
        typing,
        showChat,
        badgeCount,
        scrollToBottomRandomString
    } = useSelector((state: GlobalState) => ({
        messages: state.messages.messages,
        badgeCount: state.messages.badgeCount,
        typing: state.behavior.messageLoader,
        showChat: state.behavior.showChat,
        scrollToBottomRandomString: state.behavior.scrollToBottomRandomString
    }));

    const messageRef = useRef<HTMLDivElement | null>(null);
    // scroll top = 0 sẽ call api,  biến này dùng để chặn lần scroll đầu tiên khi widget mở ra
    const isNotFirstScrollRef = useRef(false);

    useEffect(() => {
        // @ts-ignore
        // scrollToBottom(messageRef.current);
        if (showChat && badgeCount) dispatch(markAllMessagesRead());
        else
            dispatch(
                setBadgeCount(messages.filter(message => message.unread).length)
            );
    }, [messages, badgeCount, showChat]);

    useEffect(() => {
        const messagesContainer = document.querySelector(
            '.rcw-messages-container'
        );
        messagesContainer?.addEventListener('scroll', onScrollTop);
        return () =>
            messagesContainer?.removeEventListener('scroll', onScrollTop);
    }, [messages]);

    useEffect(() => {
        if (scrollToBottomRandomString) {
            scrollToBottom(messageRef.current);
        }
    }, [scrollToBottomRandomString]);

    useEffect(() => {
        if (showChat) {
            // @ts-ignore
            scrollToBottom(messageRef.current);
        }
        if (!isNotFirstScrollRef.current && showChat) {
            //TODO: tìm solution khác thay vì dùng setTimeout
            setTimeout(() => {
                isNotFirstScrollRef.current = true;
            }, 500);
        }
    }, [showChat]);

    const handleScrollToLastMessage = () => {
        const lastMesId =
            messages[0].customId ||
            `0-${format(messages[0].timestamp, 'hh:mm')}`;
        const firstMes = document.getElementById(lastMesId);
        if (firstMes) {
            firstMes.scrollIntoView();
        }
    };

    const onScrollTop = async e => {
        if (e.target.scrollTop === 0 && isNotFirstScrollRef.current) {
            await handleScrollTop?.();
            //cần scroll đến message cuối cùng trước đó để cải thiện UX
            handleScrollToLastMessage();
        }
    };

    const getComponentToRender = (
        message: Message | Link | CustomCompMessage
    ) => {
        const ComponentToRender = message.component;
        if (message.type === 'component') {
            return <ComponentToRender {...message.props} />;
        }
        return (
            <ComponentToRender
                message={message}
                showTimeStamp={showTimeStamp}
            />
        );
    };

    // TODO: Fix this function or change to move the avatar to last message from response
    // const shouldRenderAvatar = (message: Message, index: number) => {
    //   const previousMessage = messages[index - 1];
    //   if (message.showAvatar && previousMessage.showAvatar) {
    //     dispatch(hideAvatar(index));
    //   }
    // }

    return (
        <div id="messages" className="rcw-messages-container" ref={messageRef}>
            {messages?.map((message, index) => {
                const id = `${message.customId ||
                    `${index}-${format(message.timestamp, 'hh:mm')}`}`;
                return (
                    <div className="rcw-message" id={id} key={id}>
                        {profileAvatar && message.showAvatar && (
                            <img
                                src={profileAvatar}
                                className="rcw-avatar"
                                alt="profile"
                            />
                        )}
                        {getComponentToRender(message)}
                    </div>
                );
            })}
            <Loader typing={typing} />
        </div>
    );
}

export default Messages;
