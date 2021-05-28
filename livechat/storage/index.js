import { STORAGE_KEY } from './storageKey';

/**
 * Get data from storage driver by key
 * @memberof Utils/common
 * @param {Object} storage - Storage data
 * @param {String} storage.key - key which you want get from driver
 * @param {('local_storage'|'session_storage'|'cookie'|'global_variable')} storage.driver - driver which you want access
 * @return {String|Null|undefined} - data you got from storage
 * @example
 * import getStorage from '@shared/utils/common';
 * const accessToken = getStorage({
 *      key: 'accessToken',
 *      driver: 'local_storage'
 * });
 */
export function getStorage({ key, driver = undefined, ...params }) {
    if (driver === undefined) {
        driver = process.env.STORAGE_DRIVER
            ? process.env.STORAGE_DRIVER
            : 'local_storage';
    }
    switch (driver) {
        case 'local_storage':
            return localStorage.getItem(key);
        case 'session_storage':
            return sessionStorage.getItem(key);
        case 'cookie':
            var value = '; ' + document.cookie;
            var parts = value.split('; ' + key + '=');
            if (parts.length === 2)
                return parts
                    .pop()
                    .split(';')
                    .shift();
            return undefined;
        case 'global_variable':
            if (
                window.ManySalesGlobalParams === undefined ||
                window.ManySalesGlobalParams[key] === undefined
            ) {
                return undefined;
            }
            return window.ManySalesGlobalParams[key];
        default:
            break;
    }
    return undefined;
}

/**
 * Get data from storage driver by key
 * @memberof Utils/common
 * @param {Object} storage - Storage data
 * @param {String} storage.key - key which you want remove
 * @param {('local_storage'|'session_storage'|'cookie'|'global_variable')} storage.driver - driver which you want access
 * @example
 * import removeStorage from '@shared/utils/common';
 * removeStorage({
 *      key: 'accessToken',
 *      driver: 'local_storage'
 * });
 */
export function removeStorage({ key, driver = undefined, ...params }) {
    if (driver === undefined) {
        driver = process.env.STORAGE_DRIVER
            ? process.env.STORAGE_DRIVER
            : 'local_storage';
    }
    switch (driver) {
        case 'local_storage':
            localStorage.removeItem(key);
            break;
        case 'session_storage':
            sessionStorage.removeItem(key);
            break;
        case 'cookie':
            setStorage({ key, value: '', driver, ...params });
            break;
        case 'global_variable':
            if (window.ManySalesGlobalParams !== undefined) {
                delete window.ManySalesGlobalParams.key;
            }
            break;
        default:
            break;
    }
    return undefined;
}

/**
 * Set data into storage driver by key
 * @memberof Utils/common
 * @param {Object} storage - Storage data
 * @param {String} storage.key - key you want set into driver
 * @param {String} storage.value - value you want set into driver
 * @param {('local_storage'|'session_storage'|'cookie'|'global_variable')} storage.driver - driver which you want access
 * @example
 * import setStorage from '@shared/utils/common';
 * setStorage({
 *      key: 'accessToken',
 *      driver: 'local_storage',
 *      value: 'PdTLXzLfOx'
 * });
 */
export function setStorage({ key, value, driver = undefined, ...params }) {
    if (driver === undefined) {
        driver = process.env.STORAGE_DRIVER
            ? process.env.STORAGE_DRIVER
            : 'local_storage';
    }
    switch (driver) {
        case 'local_storage':
            localStorage.setItem(key, value);
            break;
        case 'session_storage':
            sessionStorage.setItem(key, value);
            break;
        case 'cookie':
            let cookieValue = `${key}=${value}`;
            let expires = 1 * 24 * 60 * 60 * 1000;
            if (params.expires && !isNaN(params.expires)) {
                expires = new Date(Date.now() + params.expires).toUTCString();
            }
            cookieValue += '; expires=' + expires;
            if (params.path) {
                cookieValue += '; path=' + params.path;
            }
            document.cookie = cookieValue;
            break;
        case 'global_variable':
            if (window.ManySalesGlobalParams === undefined) {
                window.ManySalesGlobalParams = {};
            }
            window.ManySalesGlobalParams[key] = value;
            break;
        default:
            break;
    }
}

export { STORAGE_KEY };
