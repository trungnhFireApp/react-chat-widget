import React, { Component, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Widget,
    addUserMessage,
    addResponseMessage,
    unshiftUserMessage,
    unshiftResponseMessage,
    setQuickButtons,
    toggleMsgLoader,
    addLinkSnippet,
    toggleInputDisabled,
    toggleWidgetLoader,
    setBadgeCount,
    isWidgetOpened,
    setCustomWidget,
    setErrors,
    triggerScrollToBottom
} from '../index';
import socketService, { Socket } from './service/socket';
import {
    openConversation,
    getMessages,
    markAllAsRead,
    markMessageAsRead,
    getWidgetSetting
} from './service/conversion';
import { findAudience } from './service/audience';
import { requestCancel } from './utils/request';
import {
    getConversationInfoFromStorage,
    getShopInfoFromStorage,
    setConversationInfoToStorage,
    getAudienceIdFromStorage,
    setAudienceIdToStorage
} from './utils/common';

import './styles.scss';
import { GlobalState, Message, Conversation } from './types';
import {
    setConversationInfo,
    setLoadConversation,
    setLoadMessage,
    setUnreadCount,
    setUnreadMessages,
    setMessages
} from './store/actions';

import { MESSAGE_SENDER } from './constant';
// import defaultCustomWidget from './storage/defaultCustomWidget';
import { Nullable } from './utils/types';

// let socketClient: Socket;

const defaultPagingConfig = {
    limit: 5,
    page: 1
};

const Layout = () => {
    const dispatch = useDispatch();
    const rc = requestCancel();
    const cancelToken = rc.token;

    const {
        conversation,
        loadConversation,
        loadMessage,
        unreadCount,
        unreadMessages,
        messages
    } = useSelector((state: GlobalState) => ({
        loadConversation: state.behavior.loadConversation,
        loadMessage: state.behavior.loadMessage,
        conversation: state.conversation.conversation,
        unreadCount: state.messages.unreadCount,
        unreadMessages: state.messages.unreadMessages,
        messages: state.messages.messages
    }));

    const [socketClient, setSocketClient] = useState<Nullable<Socket>>();
    const [unSendMessages, setUnSendMessages] = useState<string[]>([]);

    const [customWidgetSetting, setCustomWidgetSetting] = useState<any>();
    const [audienceId, setAudienceId] = useState<Nullable<number>>();
    const [showWidget, setShowWidget] = useState<boolean>(false);

    useEffect(() => {
        onload();
        // addResponseMessage('Welcome to this awesome chat!');
        // setTimeout(() => {
        //     addLinkSnippet({ link: 'https://google.com', title: 'Google' });
        // }, 1000);
        // addResponseMessage(
        //     '![](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)'
        // );
        // addResponseMessage(
        //     '![vertical](https://d2sofvawe08yqg.cloudfront.net/reintroducing-react/hero2x?1556470143)'
        // );
        return () => {
            rc.cancel();
        };
    }, []);

    const onload = async () => {
        setShowWidget(false);

        //lấy widget setting
        const widgetSetting = await fetchGetWidgetSetting();
        if (widgetSetting) {
            setCustomWidgetSetting(widgetSetting);
        }

        // kiểm tra converstion info để connect socket
        checkConverstationInfo();

        //lấy audienceId trong storage nếu có
        const tmpAudience = getAudienceIdFromStorage();
        if (tmpAudience?.audienceId) {
            setAudienceId(tmpAudience?.audienceId);
        }

        setShowWidget(true);
    };

    // ===========SOCKET PROGRESS=======
    // =================================

    useEffect(() => {
        if (socketClient && conversation) {
            socketClient.connect();
            //receive messages
            const { id } = conversation;
            socketClient.on(id, handleReceiveMessage);
        }
        return () => {
            handleDestroySocket();
        };
    }, [socketClient]);

    useEffect(() => {
        if (socketClient?.connected && unSendMessages.length) {
            for (let i = 0; i < unSendMessages.length; i++) {
                emitMessage(unSendMessages[i]);
            }
        }
    }, [socketClient?.connected, unSendMessages]);

    const handleConnectToConversation = () => {
        if (!socketClient) {
            const { shop_id } = getShopInfoFromStorage();
            if (conversation && shop_id) {
                handleInitSocket(
                    {
                        conversation_id: conversation.id,
                        shop_id: shop_id
                    },
                    {
                        timestamp: conversation.timestamp,
                        hmac: conversation.hmac
                    }
                );
            }
        }
    };

    const handleInitSocket = (query = {}, auth = {}) => {
        const socket = socketService(process.env.SOCKET_URL as string, {
            transports: ['websocket'],
            query: { ...query },
            auth: { ...auth }
        });
        setSocketClient(socket.getClient());
    };

    const handleDestroySocket = () => {
        socketClient?.close();
    };

    const emitMessage = (newMes: string) => {
        if (conversation) {
            socketClient?.emit(conversation.id, {
                message: newMes,
                sender: MESSAGE_SENDER.CLIENT,
                sender_id: audienceId
            });
        }
    };

    const handleReceiveMessage = data => {
        //do not show response message with audience sender
        if (data?.sender === MESSAGE_SENDER.RESPONSE) {
            addResponseMessage(
                data.message,
                data._id,
                undefined,
                undefined,
                data.message_links
            );
            triggerScrollToBottom();
            if (!isWidgetOpened()) {
                dispatch(setUnreadCount(unreadCount + 1));
                dispatch(setUnreadMessages([data as Message], true));
            } else {
                // đánh dấu message đã đọc nếu widget đang mở
                const { shop_id } = getShopInfoFromStorage();
                if (data?._id && conversation && shop_id) {
                    markMessageAsRead({
                        conversation_id: conversation.id,
                        messageId: data._id,
                        shop_id
                    });
                }
                // socketClient.emit('messageId_action', { _id: data.id });
            }
        }
        if (data?.sender === MESSAGE_SENDER.CLIENT) {
            addUserMessage(
                data.message,
                data._id,
                undefined,
                data.message_links
            );
            triggerScrollToBottom();
        }
    };

    // ===========API PROGRESS=======
    // =================================

    useEffect(() => {
        if (conversation) {
            handleConnectToConversation();
            handleGetMessages(defaultPagingConfig);
            handleGetUnReadMessages();
        }
    }, [conversation]);

    useEffect(() => {
        if (messages.length > 0) {
            for (let i = 0; i < messages.length; i++) {
                const meg = messages[i];
                if (meg.sender === MESSAGE_SENDER.CLIENT) {
                    unshiftUserMessage(
                        meg.message,
                        meg._id,
                        new Date(meg.created_at),
                        meg.message_links
                    );
                }
                if (meg.sender === MESSAGE_SENDER.RESPONSE) {
                    unshiftResponseMessage(
                        meg.message,
                        meg._id,
                        false,
                        new Date(meg.created_at),
                        meg.message_links
                    ); // default set unread for all messages from api
                }
            }
        }
    }, [messages]);

    useEffect(() => {
        if (customWidgetSetting) {
            setCustomWidget(customWidgetSetting);
        }
    }, [customWidgetSetting]);

    const checkConverstationInfo = () => {
        const conversationInfo = getConversationInfoFromStorage();
        if (conversationInfo) {
            dispatch(setConversationInfo(conversationInfo));
        }
    };

    const handleGetUnReadMessages = async () => {
        const { shop_id } = getShopInfoFromStorage();
        const data = await fetchGetMessages({
            is_seen: false,
            sender: 'shop',
            sender_id: shop_id,
            limit: 5
        });
        if (data?.docs && Array.isArray(data?.docs) && !isWidgetOpened()) {
            dispatch(setUnreadCount(data.totalDocs));
            dispatch(
                setUnreadMessages(data.docs.reverse().map(p => p as Message))
            );
            setBadgeCount(data.totalDocs > 100 ? 99 : data.totalDocs);
        }
    };

    const handleGetMessages = async (payload = {}) => {
        const data = await fetchGetMessages(payload);
        if (data?.docs && Array.isArray(data?.docs)) {
            dispatch(setMessages([...data?.docs]));
        }
    };

    const handleGetAudience = async (payload?: any) => {
        const { shop_id, msUUID } = getShopInfoFromStorage();
        if (msUUID && shop_id) {
            toggleWidgetLoader();
            const req = await findAudience({
                uuid: msUUID,
                shop_id,
                ...payload
            });
            if (req.code === 1000) {
                setAudienceIdToStorage(req.data.id);
                setAudienceId(req.data.id);
                setErrors([]);
            } else {
                let errors = [];

                if (req.data?.details) {
                    for (let key in req.data?.details) {
                        errors = errors.concat(req.data?.details[key]);
                    }
                }

                if (errors.length) {
                    setErrors(errors);
                }
            }
            toggleWidgetLoader();
        }
    };

    const handleGetConversation = async () => {
        if (!conversation) {
            const { shop_id } = getShopInfoFromStorage();
            if (shop_id && audienceId) {
                const rep = await openConversation({
                    cancelToken,
                    shop_id: `${shop_id}`,
                    audience_id: `${audienceId}`
                });
                if (rep.code === 1000) {
                    setConversationInfoToStorage(
                        JSON.stringify({
                            ...rep.data
                        })
                    );
                    const conversationInfo = {
                        id: rep.data.id,
                        hmac: rep.data.hmac,
                        timestamp: rep.data.timestamp
                    } as Conversation;
                    dispatch(setConversationInfo(conversationInfo));
                }
            }
        }
    };

    // ===========WIDGET COMPONENT HANDLER=======
    // =================================

    const handleSendMessage = (newMessage: string) => {
        if (socketClient?.connected && conversation) {
            emitMessage(newMessage);
        } else {
            setUnSendMessages(state => {
                return [...state, newMessage];
            });
        }
    };

    const handleSubmit = async (event, userInput, callback?: Function) => {
        if (audienceId && !conversation) {
            toggleInputDisabled();
            await handleGetConversation();
            toggleInputDisabled();
        }
        callback?.(event, userInput);
    };

    const handleMarkAllMessageAsRead = async () => {
        dispatch(setUnreadCount(0));
        dispatch(setUnreadMessages([]));
        setBadgeCount(0);
        await postMarkAllAsRead();
    };

    const handleToggle = async (toggleValue, isRequireAudienceInfo) => {
        try {
            if (toggleValue) {
                //mark all messages as read
                if (unreadCount > 0) {
                    await handleMarkAllMessageAsRead();
                }
                //nếu không yêu cầu audience info thì tìm audience bằng msUUID
                if (!isRequireAudienceInfo && !audienceId) {
                    await handleGetAudience();
                }
            }
        } catch (error) {
            dispatch(setLoadConversation(false));
        }
    };

    const handleScrollTop = async () => {
        if (!loadMessage) {
            dispatch(setLoadMessage(true));
            defaultPagingConfig.page += 1;
            await handleGetMessages(defaultPagingConfig);
            dispatch(setLoadMessage(false));
        }
    };

    // ===========FETCH API=======
    // =================================

    const fetchGetMessages = async (payload = {}) => {
        if (conversation) {
            const { shop_id } = getShopInfoFromStorage();
            const req = await getMessages({
                id: conversation.id,
                shop_id: `${shop_id}`,
                ...payload
            });
            if (req?.code === 1000 && req?.data) {
                return req.data;
            }
            return null;
        }
    };

    const postMarkAllAsRead = async (payload = {}) => {
        if (conversation) {
            const { shop_id } = getShopInfoFromStorage();
            const req = await markAllAsRead({
                ...payload,
                id: conversation.id,
                audience_id: audienceId,
                shop_id
            });
        }
    };

    const fetchGetWidgetSetting = async () => {
        const { shop_id } = getShopInfoFromStorage();
        const req = await getWidgetSetting({ shop_id });
        if (req.code === 1000) {
            return req.data.settings;
        }
        return null;
    };

    const handleMarkMessageAsRead = async messageId => {
        if (conversation) {
            const { shop_id } = getShopInfoFromStorage();
            if (messageId && shop_id) {
                dispatch(
                    setUnreadMessages([
                        ...unreadMessages.filter(p => p._id !== messageId)
                    ])
                );
                const req = await markMessageAsRead({
                    conversation_id: conversation.id,
                    // reader_id: messageId,
                    messageId,
                    shop_id
                });
            }
        }
    };

    return (
        <div>
            {showWidget && (
                <>
                    <Widget
                        title="Welcome"
                        subtitle="How can we help?"
                        senderPlaceHolder="Write a response"
                        // profileAvatar="https://app-stag.manysales.io/images/logo.png"
                        titleAvatar="https://s3-ap-southeast-1.amazonaws.com/static.manysales.io/logo.svg"
                        showCloseButton={true}
                        handleNewUserMessage={handleSendMessage}
                        hasConversation={conversation ? true : false}
                        audienceId={audienceId}
                        // handleQuickButtonClicked={handleQuickButtonClicked}
                        imagePreview
                        handleSubmit={handleSubmit}
                        handleToggle={handleToggle}
                        handleMarkMessageAsRead={handleMarkMessageAsRead}
                        handleScrollTop={handleScrollTop}
                        handleGetAudience={handleGetAudience}
                        unreadMessagesInBubble={unreadMessages}
                        handleMarkAllMessageAsRead={handleMarkAllMessageAsRead}
                    />
                </>
            )}
        </div>
    );
};

export default Layout;
