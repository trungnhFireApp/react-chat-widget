import React, { Component, useEffect, useState } from 'react';

import {
    Widget,
    addUserMessage,
    addResponseMessage,
    setQuickButtons,
    toggleMsgLoader,
    addLinkSnippet,
    toggleInputDisabled,
    toggleWidgetLoader
} from '../index';
import socketService from './service/socket';
import {
    openConversation,
    getMessages,
    markAllAsRead
} from './service/conversion';
import { findAudience } from './service/audience';
import { requestCancel } from './utils/request';
import { getStorage, STORAGE_KEY, setStorage } from './storage';
import { getConversationInfo, getShopInfo } from './utils/common';
import './styles.scss';

let socketClient = null;

const MESSAGE_SENDER = {
    CLIENT: 'audience',
    RESPONSE: 'shop'
};

const App = () => {
    const rc = requestCancel();
    const cancelToken = rc.token;

    const [hasConversationInfo, setHasConversationInfo] = useState(false);
    const [loadingConversation, setLoadingConversation] = useState(false);
    const [unreadMessages, setUnreadMessages] = useState([]);

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
        if (loadingConversation) {
            handleToggleWidget();
        }
    }, [loadingConversation]);

    useEffect(() => {
        if (hasConversationInfo) {
            handleConnectToConversation();
            handleGetMessages();
            handleGetUnReadMessages();
        }
    }, [hasConversationInfo]);

    useEffect(() => {
        if (unreadMessages.length > 0) {
            for (let i = 0; i < unreadMessages.length; i++) {
                const meg = unreadMessages[i];
                if (meg.sender === MESSAGE_SENDER.RESPONSE) {
                    addResponseMessage(meg.message, meg._id);
                }
            }
        }
    }, [unreadMessages]);

    const checkConverstationInfo = () => {
        const conversationInfo = getConversationInfo();
        setHasConversationInfo(conversationInfo ? true : false);
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
        const socket = socketService(process.env.SOCKET_URL, {
            transport: ['websocket'],
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
            addResponseMessage(data.message);
        }
    };

    const handleNewUserMessage = newMessage => {
        // toggleMsgLoader();
        const conversationInfo = getConversationInfo();
        if (conversationInfo) {
            socketClient.emit(conversationInfo.id, {
                message: newMessage,
                sender: MESSAGE_SENDER.CLIENT
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

    // const handleSubmit = (msgText: string) => {
    //     if (msgText.length < 80) {
    //         addUserMessage('Uh oh, please write a bit more.');
    //         return false;
    //     }
    //     return true;
    // };

    const handleToggle = async toggleValue => {
        try {
            if ((toggleValue && unreadMessages, length > 0)) {
                await handleMarkAllAsRead();
            }
            if (toggleValue & !loadingConversation) {
                setLoadingConversation(true);
                await handleGetConversation();
                // handleConnectToConversation();
                setLoadingConversation(false);
            }
        } catch (error) {
            setLoadingConversation(false);
            handleToggleWidget();
        }
    };

    const handleGetUnReadMessages = async () => {
        const { shop_id } = getShopInfo();
        const data = await fetchGetMessages({
            is_seen: false,
            sender: 'shop',
            sender_id: shop_id,
            limit: -1
        });
        if (data?.docs && Array.isArray(data?.docs)) {
            console.log('req :>> ', req);
            setUnreadMessages(data.docs);
        }
    };

    const handleGetMessages = async payload => {
        const data = await fetchGetMessages();
        if (data?.docs && Array.isArray(data?.docs)) {
            console.log('req :>> ', data);
            for (let i = 0; i < data?.docs.length; i++) {
                const meg = data?.docs[i];
                if (meg.sender === MESSAGE_SENDER.CLIENT) {
                    addUserMessage(meg.message, meg._id);
                }
                if (meg.sender === MESSAGE_SENDER.RESPONSE) {
                    addResponseMessage(meg.message, meg._id);
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
        if (!hasConversationInfo) {
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
                    setStorage({
                        key: STORAGE_KEY.conversationInfo,
                        value: JSON.stringify(rep.data)
                    });
                    setHasConversationInfo(true);
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
            console.log('req :>> ', req?.data);
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
            shop_id
        });
    };

    return (
        <div>
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
            />
        </div>
    );
};

export default App;

// export default class App extends Component {
//   componentDidMount() {
//     addResponseMessage('Welcome to this awesome chat!');
//     addLinkSnippet({ link: 'https://google.com', title: 'Google' });
//     addResponseMessage('![](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)');
//     addResponseMessage('![vertical](https://d2sofvawe08yqg.cloudfront.net/reintroducing-react/hero2x?1556470143)');
//   }

//   handleNewUserMessage = (newMessage: any) => {
//     toggleMsgLoader();
//     setTimeout(() => {
//       toggleMsgLoader();
//       if (newMessage === 'fruits') {
//         setQuickButtons([ { label: 'Apple', value: 'apple' }, { label: 'Orange', value: 'orange' }, { label: 'Pear', value: 'pear' }, { label: 'Banana', value: 'banana' } ]);
//       } else {
//         addResponseMessage(newMessage);
//       }
//     }, 2000);
//   }

//   handleQuickButtonClicked = (e: any) => {
//     addResponseMessage('Selected ' + e);
//     setQuickButtons([]);
//   }

//   handleSubmit = (msgText: string) => {
//     if(msgText.length < 80) {
//       addUserMessage("Uh oh, please write a bit more.");
//       return false;
//     }
//     return true;
//   }

//   render() {
//     return (
//       <div>
//         <Widget
//           title="Bienvenido"
//           subtitle="Asistente virtual"
//           senderPlaceHolder="Escribe aquí ..."
//           handleNewUserMessage={this.handleNewUserMessage}
//           handleQuickButtonClicked={this.handleQuickButtonClicked}
//           imagePreview
//           handleSubmit={this.handleSubmit}
//         />
//       </div>
//     );
//   }
// }
