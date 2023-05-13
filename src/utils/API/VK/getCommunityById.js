import bridge from "@vkontakte/vk-bridge";

export function getCommunityById({id, fields, accessToken}) {
    return bridge.send('VKWebAppCallAPIMethod', {
        method: 'groups.getById', params: {
            access_token: accessToken,
            v: '5.131',
            group_id: id,
            fields: fields.join(',')
        }
    })
}