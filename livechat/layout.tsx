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
    markMessageRead as WidgetMarkMessageRead
} from '../index';
import socketService, { Socket } from './service/socket';
import {
    openConversation,
    getMessages,
    markAllAsRead,
    markMessageAsRead
} from './service/conversion';
import { findAudience } from './service/audience';
import { requestCancel } from './utils/request';
import { STORAGE_KEY, setStorage } from './storage';
import { getConversationInfo, getShopInfo } from './utils/common';

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

import Toast from './components/Toast';
import { MESSAGE_SENDER } from './constant';
import defaultCustomWidget from './storage/defaultCustomWidget';

let socketClient: Socket;

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

    useEffect(() => {
        checkConverstationInfo();
        // const customWidget: CustomWidgetType = {
        //     ...defaultCustomWidget
        // };
        setCustomWidget(defaultCustomWidget);
        // toggleInputDisabled()
        // handleInitSocket();
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
            handleDestroySocket();
        };
    }, []);

    useEffect(() => {
        if (loadConversation) {
            handleToggleWidget();
        }
    }, [loadConversation]);

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
                        new Date(meg.created_at)
                    );
                }
                if (meg.sender === MESSAGE_SENDER.RESPONSE) {
                    unshiftResponseMessage(
                        meg.message,
                        meg._id,
                        false,
                        new Date(meg.created_at)
                    ); // default set unread for all messages from api
                }
            }
        }
    }, [messages]);

    const checkConverstationInfo = () => {
        const conversationInfo = getConversationInfo();
        dispatch(setConversationInfo(conversationInfo));
    };

    const handleToggleWidget = () => {
        toggleInputDisabled();
        toggleWidgetLoader();
    };

    const handleConnectToConversation = () => {
        if (!socketClient) {
            const conversationInfo = getConversationInfo();
            const { shop_id } = getShopInfo();
            if (conversationInfo && shop_id) {
                handleInitSocket(
                    {
                        conversation_id: conversationInfo.id,
                        shop_id: shop_id
                    },
                    {
                        timestamp: conversationInfo.timestamp,
                        hmac: conversationInfo.hmac
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
        socketClient = socket.getClient();
        socketClient.connect();
        //receive messages
        const { id } = getConversationInfo();
        socketClient.on(id, handleReceiveMessage);
    };

    const handleDestroySocket = () => {
        socketClient && socketClient.close();
    };

    const handleReceiveMessage = data => {
        //do not show response message with audience sender
        if (data?.sender !== MESSAGE_SENDER.CLIENT) {
            addResponseMessage(data.message, data.id);
            if (!isWidgetOpened()) {
                dispatch(setUnreadCount(unreadCount + 1));
                dispatch(
                    setUnreadMessages(
                        [...unreadMessages].concat(data as Message)
                    )
                );
            } else {
                // đánh dấu message đã đọc nếu widget đang mở
                socketClient.emit('messageId_action', { _id: data.id });
            }
        }
    };

    const handleNewUserMessage = newMessage => {
        // toggleMsgLoader();
        const conversationInfo = getConversationInfo();
        if (conversationInfo) {
            socketClient.emit(conversationInfo.id, {
                message: newMessage,
                sender: MESSAGE_SENDER.CLIENT,
                sender_id: conversationInfo.audience_id
            });
        }
        // setTimeout(() => {
        //     toggleMsgLoader();
        //     if (newMessage === 'fruits') {
        //         setQuickButtons([
        //             { label: 'Apple', value: 'apple' },
        //             { label: 'Orange', value: 'orange' },
        //             { label: 'Pear', value: 'pear' },
        //             { label: 'Banana', value: 'banana' }
        //         ]);
        //     } else {
        //         addResponseMessage(newMessage);
        //     }
        // }, 2000);
    };

    // const handleQuickButtonClicked = (e: any) => {
    //     addResponseMessage('Selected ' + e);
    //     setQuickButtons([]);
    // };

    const handleScrollTop = async () => {
        if (!loadMessage) {
            dispatch(setLoadMessage(true));
            defaultPagingConfig.page += 1;
            await handleGetMessages(defaultPagingConfig);
            dispatch(setLoadMessage(false));
        }
    };

    const handleToggle = async toggleValue => {
        try {
            if (toggleValue) {
                //mark all messages as read
                if (unreadCount > 0) {
                    dispatch(setUnreadCount(0));
                    dispatch(setUnreadMessages([]));
                    setBadgeCount(0);
                    await handleMarkAllAsRead();
                }
                //get conversation
                if (!loadConversation) {
                    dispatch(setLoadConversation(true));
                    await handleGetConversation();
                    dispatch(setLoadConversation(false));
                    handleToggleWidget();
                }
            }
        } catch (error) {
            dispatch(setLoadConversation(false));
            handleToggleWidget();
        }
    };

    const handleGetUnReadMessages = async () => {
        const { shop_id } = getShopInfo();
        const data = await fetchGetMessages({
            is_seen: false,
            sender: 'shop',
            sender_id: shop_id,
            limit: 5
        });
        if (data?.docs && Array.isArray(data?.docs) && !isWidgetOpened()) {
            dispatch(setUnreadCount(data.totalDocs));
            dispatch(setUnreadMessages(data.docs.map(p => p as Message)));
            setBadgeCount(data.totalDocs > 100 ? 99 : data.totalDocs);
        }
    };

    const handleGetMessages = async (payload = {}) => {
        const data = await fetchGetMessages(payload);
        if (data?.docs && Array.isArray(data?.docs)) {
            dispatch(
                setMessages(
                    [...data?.docs].map(
                        p =>
                            ({
                                _id: p._id,
                                created_at: p.created_at,
                                is_seen: p.is_seen,
                                message: p.message,
                                sender: p.sender,
                                sender_id: p.sender_id,
                                status: p.status,
                                conversation_id: p.conversation_id
                            } as Message)
                    )
                )
            );
        }
    };

    const handleGetAudience = async payload => {
        const { shop_id, msUUID } = payload;
        if (msUUID && shop_id) {
            const req = await findAudience({ uuid: msUUID, shop_id });
            if (req.code === 1000) {
                return req.data;
            }
        }
        return {};
    };

    const handleGetConversation = async () => {
        if (!conversation) {
            const { shop_id, msUUID } = getShopInfo();
            const { id = '' } = await handleGetAudience({
                shop_id,
                msUUID
            });
            if (shop_id && id) {
                const rep = await openConversation({
                    cancelToken,
                    shop_id: `${shop_id}`,
                    audience_id: `${id}`
                });
                if (rep.code === 1000) {
                    setStorage(
                        STORAGE_KEY.conversationInfo,
                        JSON.stringify({
                            ...rep.data,
                            audience_id: id
                        })
                    );
                    const conversationInfo = {
                        id: shop_id,
                        audience_id: id,
                        hmac: rep.hmac,
                        timestamp: rep.hmac
                    } as Conversation;
                    dispatch(setConversationInfo(conversationInfo));
                }
            }
        }
    };

    const fetchGetMessages = async (payload = {}) => {
        const conversationInfo = getConversationInfo();
        const { shop_id } = getShopInfo();
        const req = await getMessages({
            id: conversationInfo.id,
            shop_id: `${shop_id}`,
            ...payload
        });
        if (req?.code === 1000 && req?.data) {
            return req.data;
        }
        return null;
    };

    const handleMarkAllAsRead = async (payload = {}) => {
        const conversationInfo = getConversationInfo();
        const { shop_id } = getShopInfo();
        const req = await markAllAsRead({
            ...payload,
            id: conversationInfo.id,
            audience_id: conversationInfo.audience_id,
            shop_id
        });
    };

    const handleMarkMessageAsRead = async messageId => {
        const conversationInfo = getConversationInfo();
        const { shop_id } = getShopInfo();
        if (messageId) {
            dispatch(
                setUnreadMessages([
                    ...unreadMessages.filter(p => p._id !== messageId)
                ])
            );
            const req = await markMessageAsRead({
                conversation_id: conversationInfo.id,
                // reader_id: messageId,
                messageId,
                shop_id
            });
        }
    };

    return (
        <div>
            <Toast
                unreadMessagesInBubble={unreadMessages}
                position="bottom-right"
                autoDelete={false}
                handleMarkMessageAsRead={handleMarkMessageAsRead}
                markMessageRead={WidgetMarkMessageRead}
            />
            <Widget
                title="Welcome"
                subtitle="How can we help?"
                senderPlaceHolder="Write a response"
                // profileAvatar="https://app-stag.manysales.io/images/logo.png"
                titleAvatar="https://s3-ap-southeast-1.amazonaws.com/static.manysales.io/logo.svg"
                showCloseButton={true}
                handleNewUserMessage={handleNewUserMessage}
                // handleQuickButtonClicked={handleQuickButtonClicked}
                imagePreview
                // handleSubmit={handleSubmit}
                handleToggle={handleToggle}
                // handleMarkMessageAsRead={handleMarkMessageAsRead}
                // unreadMessagesInBubble={unreadMessages}
                handleScrollTop={handleScrollTop}
            />
        </div>
    );
};

export default Layout;
