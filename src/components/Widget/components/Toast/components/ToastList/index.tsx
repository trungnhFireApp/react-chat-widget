import { CustomCompMessage, Link, Message } from '@types';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ToastItem from './components/ToastItem';
import { markMessageRead } from '../../../../../../store/actions';
import { AnyFunction } from 'src/utils/types';

type Props = {
    toastList: (Link | CustomCompMessage | Message)[];
    position: string;
    autoDelete: boolean;
    dismissTime?: number;
    handleMarkMessageAsRead?: AnyFunction;
};

function ToastList({
    position,
    autoDelete,
    dismissTime,
    toastList,
    handleMarkMessageAsRead
}: Props) {
    const dispatch = useDispatch();
    const [list, setList] = useState(toastList);
    useEffect(() => {
        setList([...toastList]);
    }, [toastList]);
    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length && list.length) {
                deleteToast(toastList[0].customId);
            }
        }, dismissTime);
        return () => {
            clearInterval(interval);
        };
    }, [toastList, autoDelete, dismissTime, list]);
    const deleteToast = id => {
        if (id) {
            dispatch(markMessageRead(id));
            handleMarkMessageAsRead?.(id);
            // const listItemIndex = list.findIndex(e => e.customId === id);
            // const toastListItem = toastList.findIndex(e => e.customId === id);
            // list.splice(listItemIndex, 1);
            // toastList.splice(toastListItem, 1);
            // console.log('list', list);
            // setList([...list]);
        }
    };
    return (
        <>
            <div className={`ms-notification-container ms-${position}`}>
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
