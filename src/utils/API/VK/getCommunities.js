import bridge from "@vkontakte/vk-bridge";

export function getCommunities({accessToken, userId}) {
    return bridge.send('VKWebAppCallAPIMethod', {
        method: 'groups.get', params: {
            access_token: accessToken,
            user_ids: userId,
            v: '5.131',
            filter: 'admin',
        }
    })
}