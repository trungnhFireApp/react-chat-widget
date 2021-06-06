import React, { Component, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Widget,
    addUserMessage,
    addResponseMessage,
    setQuickButtons,
    toggleMsgLoader,
    addLinkSnippet,
    toggleInputDisabled,
    toggleWidgetLoader,
    setBadgeCount,
    isWidgetOpened
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
import {
    getConversationInfo,
    getShopInfo,
    mappingMessgesWigetDTOFromApi,
    mappingMessgesWigetDTOFromSocket
} from './utils/common';

import './styles.scss';
import { GlobalState, Message, Conversation } from './types';
import {
    setConversationInfo,
    setLoadConversation,
    setLoadMessage,
    setUnreadCount,
    setUnreadMessages
} from './store/actions';

let socketClient: Socket;

const MESSAGE_SENDER = {
    CLIENT: 'audience',
    RESPONSE: 'shop'
};

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
        unreadMessages
    } = useSelector((state: GlobalState) => ({
        loadConversation: state.behavior.loadConversation,
        loadMessage: state.behavior.loadMessage,
        conversation: state.conversation.conversation,
        unreadCount: state.messages.unreadCount,
        unreadMessages: state.messages.unreadMessages
    }));

    useEffect(() => {
        checkConverstationInfo();
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
                        [...unreadMessages].concat(
                            mappingMessgesWigetDTOFromSocket(data as Message)
                        )
                    )
                );
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

    // const handleSubmit = msgText => {
    //     // if (msgText.length < 80) {
    //     //     addUserMessage('Uh oh, please write a bit more.');
    //     //     return false;
    //     // }
    //     // return true;
    // };

    // useEffect(() => {
    //     console.log('paginationMessage :>> ', paginationMessage);
    // }, [paginationMessage]);

    const handleScrollTop = async () => {
        // console.log('handleScrollTop', paginationMessage);
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
            //parse to message type in widget
            dispatch(
                setUnreadMessages(
                    data.docs.map(p => mappingMessgesWigetDTOFromApi(p))
                )
            );
            setBadgeCount(data.totalDocs > 100 ? 99 : data.totalDocs);
        }
    };

    const handleGetMessages = async (payload = {}) => {
        const data = await fetchGetMessages(payload);
        if (data?.docs && Array.isArray(data?.docs)) {
            for (let i = data?.docs.length - 1; i >= 0; i--) {
                const meg = data?.docs[i];
                if (meg.sender === MESSAGE_SENDER.CLIENT) {
                    addUserMessage(
                        meg.message,
                        meg._id,
                        new Date(meg.created_at)
                    );
                }
                if (meg.sender === MESSAGE_SENDER.RESPONSE) {
                    addResponseMessage(
                        meg.message,
                        meg._id,
                        false,
                        new Date(meg.created_at)
                    ); // default set unread for all messages from api
                }
            }
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
                    ...unreadMessages.filter(p => p.customId !== messageId)
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

    //tạo inbox giả phía shop
    // const [rsText, setRsText] = useState('');
    // const handleSendResponse = e => {
    //     const conversationInfo = getConversationInfo();
    //     const { shop_id } = getShopInfo();
    //     socketClient.emit(conversationInfo.id, {
    //         message: rsText,
    //         sender: MESSAGE_SENDER.RESPONSE,
    //         sender_id: shop_id
    //     });
    //     setRsText('');
    // };

    return (
        <div>
            {/* <div
                style={{
                    position: 'fixed',
                    bottom: 200,
                    right: 500,
                    background: '#fff'
                }}
            >
                <input
                    value={rsText}
                    onChange={e => setRsText(e.target.value)}
                ></input>
                <button onClick={handleSendResponse}>Submit response</button>
            </div> */}
            <Widget
                title="Welcome"
                subtitle="How can we help?"
                senderPlaceHolder="Write a response"
                // profileAvatar="https://app-stag.manysales.io/images/logo.png"
                titleAvatar="https://s3-ap-southeast-1.amazonaws.com/static.manysales.io/logo.svg"
                handleNewUserMessage={handleNewUserMessage}
                // handleQuickButtonClicked={handleQuickButtonClicked}
                imagePreview
                // handleSubmit={handleSubmit}
                handleToggle={handleToggle}
                handleMarkMessageAsRead={handleMarkMessageAsRead}
                unreadMessagesInBubble={unreadMessages}
                handleScrollTop={handleScrollTop}
            />
        </div>
    );
};

export default Layout;
