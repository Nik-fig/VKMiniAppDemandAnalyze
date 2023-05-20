import PropTypes from 'prop-types'

import {
    Avatar,
} from "@vkontakte/vkui";
import {Icon28UsersOutline} from "@vkontakte/icons";

import {CommunityFetchContainer} from '../../containers/CommunityFetchContainer';

import style from './CommunitySelectedSmall.module.css';

function CommunitySelectedSmallTemplate({onClick, community}) {
    const {
        photo_50: photo,
        name,
    } = community;

    return (
        <div
            onClick={onClick}
            className={style.community}
        >
            <span
                className={style.communityTitle}
            >{name}</span>
            <Avatar
                src={photo || '#'}
                fallbackIcon={<Icon28UsersOutline/>}
                className={style.communityImage}
            />
        </div>
    )
}

const CommunitySelectedSmall = CommunityFetchContainer({
    RenderElement: CommunitySelectedSmallTemplate,
})

CommunitySelectedSmall.propTypes = {
    id: PropTypes.number.isRequired,
    onClick: PropTypes.func
}

export {CommunitySelectedSmall}