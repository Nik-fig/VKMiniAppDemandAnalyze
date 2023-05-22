import bridge from '@vkontakte/vk-bridge'

import {ApiError} from './errors/ApiError'

import {VK_API_VERSION} from './constants'


async function _getChats({communityAccessToken, communityId}) {
    try {
        const {response} = await bridge.send('VKWebAppCallAPIMethod', {
            method: 'messages.getConversations',
            params: {
                access_token: communityAccessToken,
                v: VK_API_VERSION,
                group_id: communityId,
            }
        });
        return response.items;
    } catch (err) {
        throw ApiError(err)
    }
}

async function _getChatMessages({communityAccessToken, peerId}) {
    try {
        const {response} = await bridge.send('VKWebAppCallAPIMethod', {
            method: 'messages.getHistory',
            params: {
                access_token: communityAccessToken,
                peer_id: peerId,
                v: VK_API_VERSION,
            }
        });
        return response.items;
    } catch (err) {
        throw ApiError(err)
    }
}


export async function getProductMentionsChats({
                                                  product_id,
                                                  communityAccessToken,
                                                  communityId
                                              }) {
    const productMentions = [];

    let chats;
    let chatsAndLastMessages;

    chatsAndLastMessages = await _getChats({
        communityAccessToken: communityAccessToken,
        communityId: communityId,
    })


    // console.log(chatsAndLastMessages);

    // Тут может быт фильтр по дате последнего сообщения

    if (chatsAndLastMessages.length) {
        chats = chatsAndLastMessages.map(item => item.conversation);
        chats = chats.filter(item => item.peer.type === 'user');
    } else
        return productMentions;

    // console.log(chats)

    for (const chat of chats) {
        let messages = [];


        messages = await _getChatMessages({
            communityAccessToken: communityAccessToken,
            peerId: chat.peer.id,
        })


        // console.log(messages);

        if (!messages.length)
            continue;

        for (const message of messages) {
            // console.log(message);

            if (message.from_id === communityId)
                continue;

            if (!message.attachments.length)
                continue;

            for (const attachment of message.attachments) {
                if (attachment.type !== 'market')
                    continue;

                if (attachment.market.id !== product_id)
                    continue;

                productMentions.push({
                    date: message.date * 1000,
                    customerId: message.peer_id,
                })
            }
        }
    }

    // console.log(productMentions);
    return new Promise(resolve => resolve(productMentions));
}