import { BubbleMessage, GlobalState } from '@types';
import React from 'react';
import { useSelector } from 'react-redux';
import { AnyFunction } from 'src/utils/types';
import ToastList from './components/ToastList';
import './style.scss';

type Props = {
    position: string;
    autoDelete: boolean;
    dismissTime?: number;
    handleMarkMessageAsRead?: AnyFunction;
    unreadMessagesInBubble?: Array<any>;
};

function Toast({
    position,
    autoDelete,
    dismissTime,
    handleMarkMessageAsRead,
    unreadMessagesInBubble
}: Props) {
    // const { messages } = useSelector((state: GlobalState) => ({
    //     messages: state.messages.messages
    // }));
    return (
        <ToastList
            // toastList={messages.filter(message => message.unread)}
            toastList={unreadMessagesInBubble as Array<BubbleMessage>}
            position={position}
            autoDelete={autoDelete}
            dismissTime={dismissTime}
            handleMarkMessageAsRead={handleMarkMessageAsRead}
        ></ToastList>
    );
}

export default Toast;
