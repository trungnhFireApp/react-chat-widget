import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { GlobalState } from 'src/store/types';
import { AnyFunction } from 'src/utils/types';
const send = require('../../../../../../../assets/send_button.svg') as string;

import './style.scss';

type Props = {
    placeholder: string;
    disabledInput: boolean;
    autofocus: boolean;
    sendMessage: (event: any) => void;
    buttonAlt: string;
    onTextInputChange?: (event: any) => void;
};

function Sender({
    sendMessage,
    placeholder,
    disabledInput,
    autofocus,
    onTextInputChange,
    buttonAlt
}: Props) {
    const { showChat } = useSelector((state: GlobalState) => ({
        showChat: state.behavior.showChat
    }));
    const [text, setText] = useState('');
    const inputRef = useRef<any>(null);
    // @ts-ignore
    useEffect(() => {
        if (showChat && autofocus) inputRef.current?.focus();
    }, [showChat]);

    const handleInputChange = e => {
        setText(e.target.value);
        onTextInputChange?.(e);
    };

    return (
        <form className="rcw-sender" onSubmit={sendMessage}>
            <input
                type="text"
                className="rcw-new-message"
                name="message"
                ref={inputRef}
                placeholder={placeholder}
                disabled={disabledInput}
                autoFocus={autofocus}
                autoComplete="off"
                onChange={handleInputChange}
            />
            <button type="submit" className={`rcw-send ${text && 'has-value'}`}>
                <svg
                    className="rcw-send-icon"
                    width="33"
                    height="32"
                    viewBox="0 0 33 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5.03366 27.2L28.3003 17.2267C29.3803 16.76 29.3803 15.24 28.3003 14.7733L5.03366 4.8C4.15366 4.41334 3.18033 5.06667 3.18033 6.01334L3.16699 12.16C3.16699 12.8267 3.66033 13.4 4.32699 13.48L23.167 16L4.32699 18.5067C3.66033 18.6 3.16699 19.1733 3.16699 19.84L3.18033 25.9867C3.18033 26.9333 4.15366 27.5867 5.03366 27.2Z"
                        fill="#919EAB"
                    />
                </svg>
            </button>
        </form>
    );
}

export default Sender;
