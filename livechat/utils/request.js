import axios from 'axios';

/**
 * HTTP request
 * import request from '@shared/utils/request';
 */
// prettier-ignore
export default async function request(payload = {}) {
    try {
        const {
            url = "",
            method = "GET",
            v = "v1",
            options = {},
            headers = {},
            cancelToken = undefined,
            token = undefined,
            formData = undefined,
            ...params
        } = payload || {};

        const URI_API = process.env.REACT_APP_MANYSALES_API + '/' + v;
        const URI_TYPE = '';

        // GET
        const urlTmp = new URL(`${URI_API + URI_TYPE}/${url}`);
        if (method === "GET") {
            Object.entries(params).forEach(([key, value]) => urlTmp.searchParams.set(key, value));
        }

        // config default
        const configTmp = {
            url: urlTmp,
            cancelToken,
            method: method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            ...options,
        }

        if (token) {
            configTmp.headers['Authorization'] = 'Bearer ' + token;
        }

        // POST PUT DELETE
        if (["POST", "PUT", "DELETE"].includes(method.toUpperCase())) {
            if (formData) {
                Object.assign(configTmp, { data: formData })
            } else {
                Object.assign(configTmp, { data: JSON.stringify(params) })
            }
        }

        const response = await axios(configTmp);
        if (response.status !== 200) throw response;
        const result = response.data;

        return result;
    } catch (error) {
        if (axios.isCancel(error)) {
            // Request canceled
        } 

        throw error;
    }
}

/**
 * Abort HTTP request
 * Use:
 *   import { requestCancel } from '@shared/utils/request';
 *
 *   const rc = requestCancel();
 *   const cancelToken = rc.token;
 *
 *   await GetList({ cancelToken, ...payload }) // Add token to request
 *   rc.cancel() //Abort request
 */
export function requestCancel() {
    const source = axios.CancelToken.source();
    return {
        cancel: source.cancel,
        token: source.token
    };
}

export function isCancel(thrown) {
    return axios.isCancel(thrown);
}
