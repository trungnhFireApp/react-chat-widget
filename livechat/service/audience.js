import request from '../utils/request';
import { URI_API } from './apiUrl';

export const findAudience = async payload => {
    const url = `${URI_API}/audience/find`;
    const result = await request({
        url: url,
        method: 'POST',
        ...payload
    });
    return result;
};
