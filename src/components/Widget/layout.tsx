import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { GlobalState } from 'src/store/types';
import { AnyFunction } from 'src/utils/types';
import { openFullscreenPreview, markMessageRead } from '@actions';

import Conversation from './components/Conversation';
import Launcher from './components/Launcher';
import FullScreenPreview from './components/FullScreenPreview';
import Toast from './components/Toast';

import './style.scss';
import {
    DEFAULT_TOAST_POSITION_CSS,
    DEFAULT_WIDGET_POSITION_CSS,
    WIDGET_POSITION
} from './../../constants';
import { getCssValue } from './../../utils/helper';

type Props = {
    title: string;
    titleAvatar?: string;
    subtitle: string;
    onSendMessage: AnyFunction;
    onToggleConversation: AnyFunction;
    senderPlaceHolder: string;
    onQuickButtonClicked: AnyFunction;
    profileAvatar?: string;
    showCloseButton: boolean;
    fullScreenMode: boolean;
    autofocus: boolean;
    customLauncher?: AnyFunction;
    onTextInputChange?: (event: any) => void;
    chatId: string;
    launcherOpenLabel: string;
    launcherCloseLabel: string;
    launcherCloseImg: string;
    launcherOpenImg: string;
    sendButtonAlt: string;
    showTimeStamp: boolean;
    imagePreview?: boolean;
    zoomStep?: number;
    handleScrollTop?: AnyFunction;
    hasConversation: boolean;
    audienceId: number;
    handleGetAudience: AnyFunction;
    unreadMessagesInBubble?: Array<any>;
    handleMarkMessageAsRead?: AnyFunction;
};

function WidgetLayout({
    title,
    titleAvatar,
    subtitle,
    onSendMessage,
    onToggleConversation,
    senderPlaceHolder,
    onQuickButtonClicked,
    profileAvatar,
    showCloseButton,
    fullScreenMode,
    autofocus,
    customLauncher,
    onTextInputChange,
    chatId,
    launcherOpenLabel,
    launcherCloseLabel,
    launcherCloseImg,
    launcherOpenImg,
    sendButtonAlt,
    showTimeStamp,
    imagePreview,
    zoomStep,
    handleScrollTop,
    hasConversation,
    audienceId,
    handleGetAudience,
    unreadMessagesInBubble,
    handleMarkMessageAsRead
}: Props) {
    const dispatch = useDispatch();
    const {
        customWidgetBehavior,
        customWidgetStyle: {
            standby: { position },
            active
        },
        dissableInput,
        showChat,
        visible
    } = useSelector((state: GlobalState) => ({
        showChat: state.behavior.showChat,
        dissableInput: state.behavior.disabledInput,
        customWidgetBehavior: state.behavior.customWidget.behaviour,
        customWidgetStyle: state.behavior.customWidget.style,
        visible: state.preview.visible
    }));

    const [showWidget, setShowWidget] = useState<boolean>(false);
    const [widgetPosition, setWidgetPosition] = useState<any>({
        ...DEFAULT_WIDGET_POSITION_CSS
    });
    const [toastPosition, setToastPosition] = useState<any>({
        ...DEFAULT_TOAST_POSITION_CSS
    });

    const messageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (showChat) {
            messageRef.current = document.getElementById(
                'messages'
            ) as HTMLDivElement;
        }
        return () => {
            messageRef.current = null;
        };
    }, [showChat]);

    const eventHandle = evt => {
        if (evt.target && evt.target.className === 'rcw-message-img') {
            const {
                src,
                alt,
                naturalWidth,
                naturalHeight
            } = evt.target as HTMLImageElement;
            const obj = {
                src: src,
                alt: alt,
                width: naturalWidth,
                height: naturalHeight
            };
            dispatch(openFullscreenPreview(obj));
        }
    };

    /**
     * Previewer needs to prevent body scroll behavior when fullScreenMode is true
     */
    useEffect(() => {
        const target = messageRef?.current;
        if (imagePreview && showChat) {
            target?.addEventListener('click', eventHandle, false);
        }

        return () => {
            target?.removeEventListener('click', eventHandle);
        };
    }, [imagePreview, showChat]);

    useEffect(() => {
        document.body.setAttribute(
            'style',
            `overflow: ${visible || fullScreenMode ? 'hidden' : 'auto'}`
        );
    }, [fullScreenMode, visible]);

    //set position for widet, toast
    useEffect(() => {
        try {
            let tmpWidgetPosition = { ...DEFAULT_WIDGET_POSITION_CSS };
            let tmpToastPosition = {
                ...DEFAULT_TOAST_POSITION_CSS,
                bottom: `${getCssValue(position.botton_spacing) + 70}px`
            };
            if (position.position === WIDGET_POSITION.LEFT_BOTTOM) {
                //widget
                tmpWidgetPosition.left = '0px';
                tmpWidgetPosition.right = 'auto';
                tmpWidgetPosition.alignItems = 'flex-start';
                tmpWidgetPosition.margin = `0 0 ${position.botton_spacing} ${position.side_spacing}`;
                //toast
                tmpToastPosition.left = `${position.side_spacing}`;
                tmpToastPosition.right = 'auto';
            } else {
                tmpWidgetPosition.margin = `0 ${position.side_spacing} ${position.botton_spacing} 0`;
                //toast
                tmpToastPosition.left = 'auto';
                tmpToastPosition.right = `${position.side_spacing}`;
            }
            setToastPosition(tmpToastPosition);
            setWidgetPosition(tmpWidgetPosition);
        } catch (error) {
            console.log('error :>> ', error);
        }
    }, [position]);

    useEffect(() => {
        setShowWidget(customWidgetBehavior.visitor.show_launcher.enable);
    }, [customWidgetBehavior]);

    //append fonts
    useEffect(() => {
        //ms-live-chat
        const containerEl = document.getElementById('ms-widget');
        if (containerEl) {
            containerEl.insertAdjacentHTML('afterbegin', active.font_url);
            containerEl.style.fontFamily = active.font_family;
        }
    }, [active]);

    return (
        <div id="ms-widget">
            {showWidget && (
                <>
                    <Toast
                        unreadMessagesInBubble={unreadMessagesInBubble}
                        position={`${
                            position.position === WIDGET_POSITION.LEFT_BOTTOM
                                ? 'bottom-left'
                                : 'bottom-right'
                        }`}
                        autoDelete={false}
                        handleMarkMessageAsRead={handleMarkMessageAsRead}
                        markMessageRead={markMessageRead}
                        style={toastPosition}
                    />
                    <div
                        className={cn('rcw-widget-container', {
                            'rcw-full-screen': fullScreenMode,
                            'rcw-previewer': imagePreview
                        })}
                        style={widgetPosition}
                    >
                        {showChat && (
                            <Conversation
                                title={title}
                                subtitle={subtitle}
                                sendMessage={onSendMessage}
                                senderPlaceHolder={senderPlaceHolder}
                                profileAvatar={profileAvatar}
                                toggleChat={onToggleConversation}
                                showCloseButton={showCloseButton}
                                disabledInput={dissableInput}
                                autofocus={autofocus}
                                titleAvatar={titleAvatar}
                                className={showChat ? 'active' : 'hidden'}
                                onQuickButtonClicked={onQuickButtonClicked}
                                onTextInputChange={onTextInputChange}
                                sendButtonAlt={sendButtonAlt}
                                showTimeStamp={showTimeStamp}
                                handleScrollTop={handleScrollTop}
                                hasConversation={hasConversation}
                                audienceId={audienceId}
                                handleGetAudience={handleGetAudience}
                            />
                        )}
                        {customLauncher
                            ? customLauncher(onToggleConversation)
                            : !fullScreenMode && (
                                  <>
                                      <Launcher
                                          toggle={onToggleConversation}
                                          chatId={chatId}
                                          openLabel={launcherOpenLabel}
                                          closeLabel={launcherCloseLabel}
                                          closeImg={launcherCloseImg}
                                          openImg={launcherOpenImg}
                                      />
                                  </>
                              )}
                        {imagePreview && (
                            <FullScreenPreview
                                fullScreenMode={fullScreenMode}
                                zoomStep={zoomStep}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default WidgetLayout;
