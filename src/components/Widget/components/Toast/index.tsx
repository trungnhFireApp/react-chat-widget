import { GlobalState } from '@types';
import React from 'react';
import { useSelector } from 'react-redux';
import ToastList from './components/ToastList';
import './style.scss';

type Props = {
    position: string;
    autoDelete: boolean;
    dismissTime: number;
};

// {
//     id: 1,
//     title: 'Success',
//     description: 'This is a success toast component',
//     backgroundColor: '#5cb85c',
//     icon: ''
// }

function Toast({ position, autoDelete, dismissTime }: Props) {
    // const dispatch = useDispatch();
    const { messages } = useSelector((state: GlobalState) => ({
        messages: state.messages.messages,
        badgeCount: state.messages.badgeCount,
        showChat: state.behavior.showChat
    }));

    return (
        <ToastList
            toastList={messages.filter(message => message.unread)}
            position={position}
            autoDelete={autoDelete}
            dismissTime={dismissTime}
        ></ToastList>
    );
}

export default Toast;
