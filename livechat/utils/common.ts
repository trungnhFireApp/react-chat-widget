import { getStorage, setStorage, STORAGE_KEY } from '../storage';
import { Conversation, Message } from '../types';
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

export function uid() {
    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substr(2)
    );
}

export const createMessage = ({
    _id = uid(),
    created_at = new Date(),
    is_seen = false,
    message,
    sender,
    sender_id,
    conversation_id = '',
    status = 'open',
    message_links = [],
    isCampaignMessage = false
}): Message => {
    return {
        _id: _id,
        created_at: created_at,
        is_seen: is_seen,
        message: message,
        sender: sender,
        sender_id: sender_id,
        status: status,
        conversation_id: conversation_id,
        message_links: message_links,
        isCampaignMessage: isCampaignMessage
    };
};
