import React, { Component, useEffect, useState } from 'react';

import {
    Widget,
    addResponseMessage,
    setQuickButtons,
    toggleMsgLoader,
    addLinkSnippet
} from '../index';
import { addUserMessage } from '..';
import socketService from './service/socket';
import { socketChanel } from './service/socketChanel';

let socketClient = null;

const App = () => {
    useEffect(() => {
        handleInitSocket();
        // addResponseMessage('Welcome to this awesome chat!');
        // addLinkSnippet({ link: 'https://google.com', title: 'Google' });
        // addResponseMessage(
        //     '![](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)'
        // );
        // addResponseMessage(
        //     '![vertical](https://d2sofvawe08yqg.cloudfront.net/reintroducing-react/hero2x?1556470143)'
        // );
        return () => {
            handleDestroySocket();
        };
    }, []);

    const handleInitSocket = () => {
        const socket = socketService(process.env.SOCKET_URL);
        socketClient = socket.getClient();
        socketClient.connect();
        //receive messages
        socketClient.on(socketChanel.CHAT, handleReceiveMessage);
    };

    const handleDestroySocket = () => {
        socketClient && socketClient.close();
    };

    const handleReceiveMessage = data => {
        addResponseMessage(data.message);
    };

    const handleNewUserMessage = newMessage => {
        // toggleMsgLoader();
        socketClient.emit(socketChanel.CHAT, newMessage);
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

    return (
        <div>
            <Widget
                title="Bienvenido"
                subtitle="Asistente virtual"
                senderPlaceHolder="Escribe aquí ..."
                handleNewUserMessage={handleNewUserMessage}
                // handleQuickButtonClicked={handleQuickButtonClicked}
                imagePreview
                // handleSubmit={handleSubmit}
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
