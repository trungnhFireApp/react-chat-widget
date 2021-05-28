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
