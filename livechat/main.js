import React, { Component, useEffect, useState } from 'react';

import {
    Widget,
    addResponseMessage,
    setQuickButtons,
    toggleMsgLoader,
    addLinkSnippet,
    toggleInputDisabled,
    toggleWidgetLoader
} from '../index';
import { addUserMessage } from '..';
import socketService, { socketChanel } from './service/socket';
import { openConversation } from './service/conversion';
import { findAudience } from './service/audience';
import { requestCancel } from './utils/request';
import { getStorage, STORAGE_KEY, setStorage } from './storage';
import { getConversationInfo, getShopInfo } from './utils/common';
import './styles.scss';

let socketClient = null;

const App = () => {
    const rc = requestCancel();
    const cancelToken = rc.token;

    const [hasConversationInfo, setHasConversationInfo] = useState(false);
    const [loadingConversation, setLoadingConversation] = useState(false);

    useEffect(() => {
        // checkConverstationInfo();

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
        // hasConversationInfo && handleConnectToConversation();
    }, [hasConversationInfo]);

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
            // console.log(
            //     'conversationInfo :>> ',
            //     conversationInfo,
            //     shop_id,
            //     msUUID
            // );
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
        addResponseMessage(data.message);
    };

    const handleNewUserMessage = newMessage => {
        // toggleMsgLoader();
        const { id } = getConversationInfo();
        socketClient.emit(id, newMessage);
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
        if (toggleValue & !loadingConversation) {
            setLoadingConversation(true);
            await handleGetConversation();
            // handleConnectToConversation();
            setLoadingConversation(false);
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
            const { id = '' } = await handleGetAudience({ shop_id, msUUID });
            if (shop_id && id) {
                const rep = await openConversation({
                    cancelToken,
                    shop_id: `${shop_id}`,
                    audience_id: `${id}`
                });
                if (rep.code === 1000) {
                    stic;
                    setStorage({
                        key: STORAGE_KEY.conversationInfo,
                        value: JSON.stringify(rep.data)
                    });
                    setHasConversationInfo(true);
                }
            }
        }
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
