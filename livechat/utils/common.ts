import { getStorage, STORAGE_KEY } from '../storage';
import { WidgetMessage, Message, Conversation } from '../types';

export const getConversationInfo = (): Conversation =>
    JSON.parse(getStorage(STORAGE_KEY.conversationInfo));

export const getShopInfo = () => {
    return {
        ...window.MANY_SALES,
        shop_id: window.MANY_SALES?.shop_id || '',
        msUUID: getStorage(STORAGE_KEY.msUUID) || ''
    };
};

export const mappingMessgesWigetDTOFromApi = (p: Message): WidgetMessage => ({
    type: 'text',
    text: p.message,
    sender: p.sender,
    timestamp: p.created_at,
    showAvatar: false,
    customId: p.id,
    unread: true
});

export const mappingMessgesWigetDTOFromSocket = (
    p: Message
): WidgetMessage => ({
    type: 'text',
    text: p.message,
    sender: p.sender,
    timestamp: p.created_at,
    showAvatar: false,
    customId: p.id,
    unread: true
});

// export const mappingMessgesDTOFromApi = (
//     p: WidgetMessage
// ): Message => ({
//     type: 'text',
//     text: p.message,
//     sender: p.sender,
//     timestamp: p.created_at,
//     showAvatar: false,
//     customId: p.id,
//     unread: true
// });
