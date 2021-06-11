import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { GlobalState } from 'src/store/types';

import './style.scss';

function Welcome() {
    const {
        customWidget: {
            style: {
                active: {
                    default_content: { notice_message }
                }
            }
        }
    } = useSelector((state: GlobalState) => ({
        customWidget: state.behavior.customWidget
    }));

    return <div className="rcw-welcome">{notice_message.default}</div>;
}

export default Welcome;
