import { getStorage, setStorage, STORAGE_KEY } from '../storage';
import { Conversation } from '../types';
import { Nullable } from './types';

export const getConversationInfoFromStorage = (): Nullable<Conversation> => {
    try {
        const result = getStorage(STORAGE_KEY.ms_conversationInfo);
        if (result) {
            return JSON.parse(result);
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const setConversationInfoToStorage = (value): void => {
    setStorage(STORAGE_KEY.ms_conversationInfo, value);
};

export const getShopInfoFromStorage = () => {
    try {
        return {
            ...window.MANY_SALES,
            shop_id: window.MANY_SALES?.shop_id || '',
            msUUID: getStorage(STORAGE_KEY.msUUID) || ''
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getAudienceIdFromStorage = () => {
    try {
        const id = getStorage(STORAGE_KEY.ms_audienceId);
        return {
            audienceId: id ? parseInt(id) : null
        };
    } catch (error) {
        console.log(error);
        return {};
    }
};

export const setAudienceIdToStorage = (value): void => {
    setStorage(STORAGE_KEY.ms_audienceId, value);
};
