import request from '../utils/request';
import { URI_API } from './apiUrl';

export const openConversation = async payload => {
    const url = `${URI_API}/livechat/conversations/open`;
    const result = await request({
        url: url,
        method: 'POST',
        ...payload
    });
    return result;
};

export const markAllAsRead = async payload => {
    const { id } = payload;
    const url = `api/UE_CHAT_LIST_MESSAGES/${id}?page=1&limit=10`;
    const result = await request({
        url: url,
        method: 'GET',
        ...payload
    });
    return result;
};

export const getMessages = async payload => {
    const { id } = payload;
    const url = `${URI_API}/livechat/conversations/${id}/messages`;
    const result = await request({
        url: url,
        method: 'POST',
        ...payload
    });
    return result;
};
