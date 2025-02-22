import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import Badge from './components/Badge';
import { GlobalState } from '../../../../store/types';
import { setBadgeCount } from '../../../../store/actions';

import './style.scss';

const openLauncher = require('../../../../../assets/launcher_button.svg') as string;
const close = require('../../../../../assets/clear-button.svg') as string;

type Props = {
    toggle: () => void;
    chatId: string;
    openLabel: string;
    closeLabel: string;
    closeImg: string;
    openImg: string;
};

function Launcher({
    toggle,
    chatId,
    openImg,
    closeImg,
    openLabel,
    closeLabel
}: Props) {
    const dispatch = useDispatch();
    const {
        customWidget: {
            style: { standby }
        },
        showChat,
        badgeCount
    } = useSelector((state: GlobalState) => ({
        showChat: state.behavior.showChat,
        badgeCount: state.messages.badgeCount,
        customWidget: state.behavior.customWidget
    }));

    const toggleChat = () => {
        toggle();
        if (!showChat) dispatch(setBadgeCount(0));
    };

    return (
        <>
            <button
                type="button"
                className={cn('rcw-launcher', { 'rcw-hide-sm': showChat })}
                onClick={toggleChat}
                aria-controls={chatId}
                style={{ background: standby.background }}
            >
                {!showChat && <Badge badge={badgeCount} />}
                {showChat ? (
                    <img
                        // src={closeImg || close}
                        src={standby.icon.upload_url || standby.icon.icon_url}
                        className="rcw-close-launcher"
                        alt={openLabel}
                    />
                ) : (
                    <img
                        // src={openImg || openLauncher}
                        src={standby.icon.upload_url || standby.icon.icon_url}
                        className="rcw-open-launcher"
                        alt={closeLabel}
                    />
                )}
            </button>
        </>
    );
}

export default Launcher;
