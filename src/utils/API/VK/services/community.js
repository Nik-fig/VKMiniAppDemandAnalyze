import bridge from "@vkontakte/vk-bridge";

export const communityObject = {
    id: null,
    name: null,
    screen_name: null,
    is_closed: null,
    deactivated: null,
    is_admin: null,
    admin_level: null,
    is_member: null,
    is_advertiser: null,
    invited_by: null,
    type: null,
    photo_50: null,
    photo_100: null,
    photo_200: null,
    // Опциональные поля A-K
    activity: null,
    addresses: null,
    age_limits: null,
    ban_info: null,
    can_create_topic: null,
    can_message: null,
    can_post: null,
    can_suggest: null,
    can_see_all_posts: null,
    can_upload_doc: null,
    can_upload_story: null,
    can_upload_video: null,
    city: null,
    contacts: null,
    counters: null,
    country: null,
    cover: null,
    crop_photo: null,
    description: null,
    fixed_post: null,
    has_photo: null,
    is_favorite: null,
    is_hidden_from_feed: null,
    is_messages_blocked: null,
    // Опциональные поля L-W
    links: null,
    main_album_id: null,
    main_section: null,
    market: null,
    member_status: null,
    members_count: null,
    place: null,
    public_date_label: null,
    site: null,
    start_date: null,
    finish_date: null,
    status: null,
    trending: null,
    verified: null,
    wall: null,
    wiki_page: null,
}

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