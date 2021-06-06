import io, { Socket } from 'socket.io-client';
import { socketChanel } from './socketChanel';

let client: Socket;

const socketService = (socketUrl: string, socketOptions?: any) => {
    function init() {
        client = io(socketUrl, {
            autoConnect: false,
            reconnection: true,
            reconnectionDelay: 500,
            reconnectionAttempts: Infinity,
            ...socketOptions
        });

        client.on('connect', () => {
            console.log('connect');
        });

        client.on('disconnect', () => {
            console.log('disconnect');
        });

        client.on('reconnect_attempt', () => {
            console.log('reconnect_attempt');
        });

        client.on('reconnect', () => {
            console.log('reconnect');
        });

        client.on('connect_error', err => {
            console.log('connect_error', err);
        });
    }

    init();

    return {
        close: () => client && client.disconnect(),
        getClient: (): Socket => client
    };
};

export { socketChanel, Socket };

export default socketService;
