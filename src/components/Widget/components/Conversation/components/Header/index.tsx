import { GlobalState } from '@types';
import React from 'react';
import { useSelector } from 'react-redux';
import TeammateComponent from './components/TeammateComponent';

// const close = require('../../../../../../../assets/clear-button.svg') as string;

import './style.scss';

//define default data để nếu api lỗi hay die thì cũng có data default hiển thị
const defaultData = {
    teammate: [
        {
            name: 'ManySales - Pop-up, Email, SMS',
            avatar:
                'https://cdn.shopify.com/s/files/1/0269/3490/2873/files/Webp.net-resizeimage_32x32.png?v=1585904252',
            status: 'online'
        }
    ],
    welcome_message: 'Welcome'
};

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
    const {
        customWidget: {
            style: {
                active: {
                    teammate = defaultData.teammate,
                    default_content: {
                        welcome_message = defaultData.welcome_message
                    }
                }
            }
        }
    } = useSelector((state: GlobalState) => ({
        customWidget: state.behavior.customWidget
    }));
    return (
        <div className="rcw-header">
            <TeammateComponent
                teammate={teammate}
                welcome_message={welcome_message}
            />
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
