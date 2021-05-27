import request from '../utils/request';

export const getGroupInfoAU = async payload => {
    const { id = undefined, ...params } = payload;
    const url = `api/UE_AU_GROUP_INFO/${id}`;
    const result = await request({
        url: url,
        method: 'GET',
        token: getShopAccessToken(),
        ...params
    });
    return result;
};
