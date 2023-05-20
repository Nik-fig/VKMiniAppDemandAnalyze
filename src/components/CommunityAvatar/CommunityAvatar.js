import PropTypes from 'prop-types'

import {
    Avatar,
} from "@vkontakte/vkui";
import {Icon28UsersOutline} from "@vkontakte/icons";

import {CommunityFetchContainer} from '../../containers/CommunityFetchContainer';

function CommunityAvatarTemplate({onClick, community}) {
    const {
        photo_50: photo,
    } = community;

    return (
            <Avatar
                src={photo || '#'}
                fallbackIcon={<Icon28UsersOutline/>}
                onClick={onClick}
            />
    )
}

const CommunityAvatar = CommunityFetchContainer({
    RenderElement: CommunityAvatarTemplate,
})

CommunityAvatar.propTypes = {
    id: PropTypes.number.isRequired, onClick: PropTypes.func
}

export {CommunityAvatar}