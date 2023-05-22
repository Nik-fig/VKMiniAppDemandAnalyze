import bridge from '@vkontakte/vk-bridge';

import {VK_API_VERSION} from '../../../constants'
export const productObject = {
    id: null,
    owner_id: null,
    title: null,
    description: null,
    price: null,
    dimensions: null,
    weight: null,
    category: null,
    thumb_photo: null,
    date: null,
    availability: null,
    is_favorite: null,
    sku: null,
    reject_info: null,
    // Опциональные поля
    photos: null,
    can_comment: null,
    can_repost: null,
    likes: null,
    url: null,
    button_title: null,
}

export function getProductById({
                                    accessToken,
                                    productCommunityId,
                                    id,
                                }) {
    const communityId = '-' + productCommunityId;
    return bridge.send('VKWebAppCallAPIMethod', {
        method: 'market.getById', params: {
            access_token: accessToken,
            v: VK_API_VERSION,
            item_ids: `${communityId}_${id}`
        }
    })
}

export function getProductsByCommunityId({accessToken, communityId}) {
    return bridge.send('VKWebAppCallAPIMethod', {
        method: 'market.get', params: {
            access_token: accessToken,
            owner_id: '-' + communityId,
            v: VK_API_VERSION,
        }
    })
}