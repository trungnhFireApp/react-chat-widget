import { Message } from './../../../../../../../../livechat/types';
import React from 'react';
import { Teammate } from './../../../../../../../store/customTypes';
import { DEFAULT_AVATAR_URL } from '../../../../../../../constants';
import { AnyFunction } from './../../../../../../../utils/types';

type Props = {
    message: Message;
    position: string;
    deleteToast: (id?: string) => void;
    teammate?: Teammate;
    handleClickMessage: AnyFunction;
};

function ToastItem({
    message,
    position,
    deleteToast,
    teammate,
    handleClickMessage
}: Props) {
    return (
        <div className="ms-notification-item">
            {teammate && (
                <div className="ms-notification-avatar">
                    <img src={teammate.avatar || DEFAULT_AVATAR_URL} />
                </div>
            )}
            <div
                className={`ms-notification ms-toast`}
                // style={{ backgroundColor: toast.backgroundColor }}
            >
                <div
                    onClick={e => handleClickMessage(e, message._id)}
                    className="ms-notification-message"
                    dangerouslySetInnerHTML={{ __html: message.message }}
                ></div>
                <button
                    onClick={() => deleteToast(message._id)}
                    className="ms-notification-close-btn"
                >
                    <svg
                        width="32"
                        height="33"
                        viewBox="0 0 32 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M24.4 8.11329C23.88 7.59329 23.04 7.59329 22.52 8.11329L16 14.62L9.47996 8.09996C8.95996 7.57996 8.11996 7.57996 7.59996 8.09996C7.07996 8.61996 7.07996 9.45996 7.59996 9.97996L14.12 16.5L7.59996 23.02C7.07996 23.54 7.07996 24.38 7.59996 24.9C8.11996 25.42 8.95996 25.42 9.47996 24.9L16 18.38L22.52 24.9C23.04 25.42 23.88 25.42 24.4 24.9C24.92 24.38 24.92 23.54 24.4 23.02L17.88 16.5L24.4 9.97996C24.9066 9.47329 24.9066 8.61996 24.4 8.11329Z"
                            fill="#1C82FF"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default ToastItem;
