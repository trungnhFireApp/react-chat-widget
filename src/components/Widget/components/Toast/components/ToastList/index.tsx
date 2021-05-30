import { CustomCompMessage, Link, Message } from '@types';
import React, { useEffect, useState } from 'react';

import './style.scss';

type Props = {
    toastList: (Link | CustomCompMessage | Message)[];
    position: string;
    autoDelete: boolean;
    dismissTime: number;
};

function ToastList({ position, autoDelete, dismissTime, toastList }: Props) {
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
        const listItemIndex = list.findIndex(e => e.customId === id);
        const toastListItem = toastList.findIndex(e => e.customId === id);
        list.splice(listItemIndex, 1);
        toastList.splice(toastListItem, 1);
        setList([...list]);
    };
    return (
        <>
            <div className={`notification-container ${position}`}>
                {list.map((toast, i) => (
                    <div
                        key={i}
                        className={`notification toast ${position}`}
                        // style={{ backgroundColor: toast.backgroundColor }}
                    >
                        <button onClick={() => deleteToast(toast.customId)}>
                            X
                        </button>
                        {/* <div className="notification-image">
                            <img src={toast.icon} alt="" />
                        </div> */}
                        <div>
                            {/* <p className="notification-title">{toast.}</p> */}
                            <p className="notification-message">{toast}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ToastList;
