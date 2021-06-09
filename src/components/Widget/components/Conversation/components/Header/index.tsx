import { GlobalState } from '@types';
import React from 'react';
import { useSelector } from 'react-redux';

// const close = require('../../../../../../../assets/clear-button.svg') as string;

import './style.scss';

type Props = {
    title: string;
    subtitle: string;
    toggleChat: () => void;
    showCloseButton: boolean;
    titleAvatar?: string;
};

function Header({
    title,
    subtitle,
    toggleChat,
    showCloseButton,
    titleAvatar
}: Props) {
    const { customWidget } = useSelector((state: GlobalState) => ({
        customWidget: state.behavior.customWidget
    }));
    return (
        <div className="rcw-header">
            <div className="rcw-teammate">
                <div className="rcw-teammate-avatar">
                    {titleAvatar && (
                        <img
                            src={titleAvatar}
                            className="avatar"
                            alt="profile"
                        />
                    )}
                    <span className="rcw-teammate-status"></span>
                </div>
                <h4 className="rcw-title">{title}</h4>
                <span className="rcw-sub-title">{subtitle}</span>
            </div>
            <div className="rcw-header-action">
                {showCloseButton && (
                    <button className="rcw-close-button" onClick={toggleChat}>
                        {/* <img src={close} className="rcw-close" alt="close" /> */}
                        <svg
                            width="16"
                            height="2"
                            viewBox="0 0 16 2"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                width="16"
                                height="1.99998"
                                transform="matrix(1 -2.71008e-06 -8.46908e-08 1 0 0)"
                                fill="#454F5B"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}

export default Header;
