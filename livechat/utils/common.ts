import { getStorage, STORAGE_KEY } from '../storage';
import { Conversation } from '../types';

export const getConversationInfo = (): Conversation =>
    JSON.parse(getStorage(STORAGE_KEY.conversationInfo));

export const getShopInfo = () => {
    return {
        ...window.MANY_SALES,
        shop_id: window.MANY_SALES?.shop_id || '',
        msUUID: getStorage(STORAGE_KEY.msUUID) || ''
    };
};
