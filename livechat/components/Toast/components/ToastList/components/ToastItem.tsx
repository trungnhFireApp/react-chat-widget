import { Message } from './../../../../../types';
import React from 'react';

type Props = {
    message: Message;
    position: string;
    deleteToast: (id?: string) => void;
};

function ToastItem({ message, position, deleteToast }: Props) {
    return (
        <div
            className={`ms-notification ms-toast ms-${position}`}
            // style={{ backgroundColor: toast.backgroundColor }}
        >
            <button onClick={() => deleteToast(message._id)}>X</button>
            {/* <div className="notification-image">
            <img src={toast.icon} alt="" />
        </div> */}
            <div>
                {/* <p className="notification-title">{toast.}</p> */}
                <p className="ms-notification-message">{message.message}</p>
            </div>
        </div>
    );
}

export default ToastItem;
