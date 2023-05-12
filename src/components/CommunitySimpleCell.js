import PropTypes from 'prop-types'

import {
    Avatar,
    SimpleCell
} from "@vkontakte/vkui";
import {Icon28UsersOutline} from "@vkontakte/icons";


function CommunitySimpleCell(props) {
    const {photo, name, onClick} = props;

    return (
        <SimpleCell
            before={
                <Avatar
                    size={50}
                    fallbackIcon={<Icon28UsersOutline/>}
                    src={photo || '#'}
                />
            }
            onClick={onClick}
        >
            {name}
        </SimpleCell>

    )
}

CommunitySimpleCell.propTypes = {
    id: PropTypes.number,
    photo: PropTypes.string,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

export {CommunitySimpleCell}