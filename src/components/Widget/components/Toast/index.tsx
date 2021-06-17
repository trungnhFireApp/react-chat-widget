import { Message } from './../../../../../livechat/types';
import React from 'react';
// import { useSelector } from 'react-redux';
import { AnyFunction } from './../../../../utils/types';
import ToastList from './components/ToastList';
import './style.scss';

type Props = {
    position: string;
    autoDelete: boolean;
    dismissTime?: number;
    handleMarkMessageAsRead?: AnyFunction;
    unreadMessagesInBubble?: Array<Message>;
    markMessageRead?: AnyFunction;
    handleMarkAllMessageAsRead?: AnyFunction;
    toggleChat: () => void;
    handleClickToastMessage?: AnyFunction;
    handleClearAll?: AnyFunction;
};

function Toast({
    position,
    autoDelete,
    dismissTime,
    handleMarkMessageAsRead,
    unreadMessagesInBubble,
    markMessageRead,
    handleMarkAllMessageAsRead,
    toggleChat,
    handleClickToastMessage,
    handleClearAll
}: Props) {
    // const { messages } = useSelector((state: GlobalState) => ({
    //     messages: state.messages.messages
    // }));
    return (
        <ToastList
            toastList={unreadMessagesInBubble as Array<Message>}
            position={position}
            autoDelete={autoDelete}
            dismissTime={dismissTime}
            handleMarkMessageAsRead={handleMarkMessageAsRead}
            markMessageRead={markMessageRead}
            handleMarkAllMessageAsRead={handleMarkAllMessageAsRead}
            toggleChat={toggleChat}
            handleClickToastMessage={handleClickToastMessage}
            handleClearAll={handleClearAll}
        ></ToastList>
    );
}

export default Toast;
