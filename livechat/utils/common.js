import { getStorage, STORAGE_KEY } from '../storage';

export const getConversationInfo = () =>
    JSON.parse(
        getStorage({
            key: STORAGE_KEY.conversationInfo
        })
    );

export const getShopInfo = () => {
    return {
        ...window.MANY_SALES,
        shop_id: window.MANY_SALES?.shop_id || '',
        msUUID: getStorage({ key: STORAGE_KEY.msUUID }) || ''
    };
};

export const mappingMessgesWigetDTOFromApi = p => ({
    type: 'text',
    text: p.message,
    sender: p.sender,
    timestamp: p.created_at,
    showAvatar: false,
    customId: p._id,
    unread: true
});

export const mappingMessgesWigetDTOFromSocket = p => ({
    type: 'text',
    text: p.message,
    sender: p.sender,
    timestamp: p.created_at,
    showAvatar: false,
    customId: p.id,
    unread: true
});
