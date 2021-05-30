import React, { useEffect, useState } from 'react';

import './style.scss';

type Props = {
    toastList: any;
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

function Toast({ position, autoDelete, dismissTime, toastList }: Props) {
    // const { toastList, position, autoDelete, dismissTime } = props;
    const [list, setList] = useState(toastList);
    useEffect(() => {
        setList([...toastList]);
    }, [toastList]);
    useEffect(() => {
        const interval = setInterval(() => {
            if (autoDelete && toastList.length && list.length) {
                deleteToast(toastList[0].id);
            }
        }, dismissTime);
        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line
    }, [toastList, autoDelete, dismissTime, list]);
    const deleteToast = id => {
        const listItemIndex = list.findIndex(e => e.id === id);
        const toastListItem = toastList.findIndex(e => e.id === id);
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
                        style={{ backgroundColor: toast.backgroundColor }}
                    >
                        <button onClick={() => deleteToast(toast.id)}>X</button>
                        <div className="notification-image">
                            <img src={toast.icon} alt="" />
                        </div>
                        <div>
                            <p className="notification-title">{toast.title}</p>
                            <p className="notification-message">
                                {toast.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Toast;
