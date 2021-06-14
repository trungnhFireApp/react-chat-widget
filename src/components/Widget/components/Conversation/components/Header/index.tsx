import { GlobalState } from '@types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    DEFAULT_HEADER_CSS,
    BACKGROUND_TYPE
} from './../../../../../../constants';
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
                    },
                    background
                }
            }
        }
    } = useSelector((state: GlobalState) => ({
        customWidget: state.behavior.customWidget
    }));

    const [headerStyle, setHeaderStyle] = useState({ ...DEFAULT_HEADER_CSS });

    useEffect(() => {
        let tmpHeaderStyle = { ...headerStyle };
        if (background.background_type === BACKGROUND_TYPE.COLOR) {
            tmpHeaderStyle.backgroundColor = background.color;
        } else {
            tmpHeaderStyle.backgroundImage = `url(${background.image})`;
        }
        setHeaderStyle(tmpHeaderStyle);
    }, [background]);

    return (
        <div className="rcw-header" style={headerStyle}>
            <TeammateComponent
                teammate={teammate}
                welcome_message={welcome_message}
            />
            <div className="rcw-header-action">
                {showCloseButton && (
                    <button className="rcw-close-button" onClick={toggleChat}>
                        {/* <img src={close} className="rcw-close" alt="close" /> */}
                        <svg
                            width="32"
                            height="33"
                            viewBox="0 0 32 33"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M24.4 8.11329C23.88 7.59329 23.04 7.59329 22.52 8.11329L16 14.62L9.47999 8.09996C8.95999 7.57996 8.11999 7.57996 7.59999 8.09996C7.07999 8.61996 7.07999 9.45996 7.59999 9.97996L14.12 16.5L7.59999 23.02C7.07999 23.54 7.07999 24.38 7.59999 24.9C8.11999 25.42 8.95999 25.42 9.47999 24.9L16 18.38L22.52 24.9C23.04 25.42 23.88 25.42 24.4 24.9C24.92 24.38 24.92 23.54 24.4 23.02L17.88 16.5L24.4 9.97996C24.9067 9.47329 24.9067 8.61996 24.4 8.11329Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}

export default Header;
