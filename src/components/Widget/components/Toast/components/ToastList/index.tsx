import { Message } from './../../../../../../../livechat/types';
import React, { useEffect, useState } from 'react';
import ToastItem from './components/ToastItem';
import { AnyFunction } from './../../../../../../utils/types';

type Props = {
    toastList: Message[];
    position: string;
    autoDelete: boolean;
    dismissTime?: number;
    handleMarkMessageAsRead?: AnyFunction;
    markMessageRead?: AnyFunction;
    style?: any;
};

function ToastList({
    position,
    autoDelete,
    dismissTime,
    toastList,
    handleMarkMessageAsRead,
    markMessageRead,
    style
}: Props) {
    const [list, setList] = useState(toastList);
    useEffect(() => {
        setList([...toastList]);
    }, [toastList]);
    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length && list.length) {
                deleteToast(toastList[0]._id);
            }
        }, dismissTime);
        return () => {
            clearInterval(interval);
        };
    }, [toastList, autoDelete, dismissTime, list]);
    const deleteToast = id => {
        if (id) {
            markMessageRead?.(id);
            handleMarkMessageAsRead?.(id);
        }
    };
    return (
        <>
            <div
                style={style}
                className={`ms-notification-container ms-${position}`}
            >
                {list.map((toast, i) => (
                    <ToastItem
                        key={i}
                        position={position}
                        deleteToast={deleteToast}
                        message={toast as Message}
                    />
                ))}
            </div>
        </>
    );
}

export default ToastList;
