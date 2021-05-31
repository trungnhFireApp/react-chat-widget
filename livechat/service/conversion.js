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
    const url = `${URI_API}/livechat/conversations/${id}/messages/read-all`;
    const result = await request({
        url: url,
        method: 'POST',
        ...payload
    });
    return result;
};

export const getMessages = async payload => {
    const { id } = payload;
    const url = `${URI_API}/livechat/conversations/${id}/messages`;
    delete payload.id;
    const result = await request({
        url: url,
        method: 'POST',
        ...payload
    });
    return result;
};
