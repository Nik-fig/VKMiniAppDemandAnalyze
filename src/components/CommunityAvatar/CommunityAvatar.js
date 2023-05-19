import PropTypes from 'prop-types'

import {
    Avatar,
    Text,
    Tappable
} from "@vkontakte/vkui";
import {Icon28UsersOutline} from "@vkontakte/icons";

import {CommunityFetchContainer} from '../../containers/CommunityFetchContainer';

function CommunityAvatarTemplate({onClick, community}) {
    const {
        photo_50: photo,
        name,
    } = community;

    return (
        <Tappable>
            <Text
                style={{
                    textAlign: 'center',
                }}
            >
                {name}
            </Text>
            <Avatar
                src={photo || '#'}
                fallbackIcon={<Icon28UsersOutline/>}
                style={{
                    margin: '10px auto',

                }}
            />
        </Tappable>

    )
}

const CommunityAvatar = CommunityFetchContainer({
    RenderElement: CommunityAvatarTemplate,
})

CommunityAvatar.propTypes = {
    id: PropTypes.number.isRequired, onClick: PropTypes.func
}

export {CommunityAvatar}