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
