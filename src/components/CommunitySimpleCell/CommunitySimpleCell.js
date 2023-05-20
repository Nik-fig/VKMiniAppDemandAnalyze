import PropTypes from 'prop-types'

import {
    Avatar,
} from "@vkontakte/vkui";
import {Icon28UsersOutline} from "@vkontakte/icons";

import styles from './CommunitySimpleCell.module.css';

import {CommunityFetchContainer} from '../../containers/CommunityFetchContainer';

function CommunitySimpleCellTemplate({onClick, community}) {
    const {
        photo_50: photo,
        name,
        activity,
        members_count: membersCount,
    } = community;

    let membersTitle;
    const remainderDivision = membersCount % 10;

    if (remainderDivision === 1 && remainderDivision !== 11) {
        membersTitle = 'участник';
    } else if (2 <= remainderDivision <= 4) {
        membersTitle = 'участника';
    } else {
        membersTitle = 'участников';
    }

    const description = `${activity}, ${membersCount} ${membersTitle}`

    return (
        <div
            className={styles.community}
            onClick={onClick}
        >
            <Avatar
                src={photo || '#'}
                fallbackIcon={<Icon28UsersOutline/>}
                className={styles.communityImg}
            />
            <div className={styles.communityName}>
                {name}
            </div>
            <div className={styles.communityDesc}>
                {description}
            </div>
        </div>
    )
}

const CommunitySimpleCell = CommunityFetchContainer({
    RenderElement: CommunitySimpleCellTemplate,
})

CommunitySimpleCell.propTypes = {
    id: PropTypes.number.isRequired, onClick: PropTypes.func
}

export {CommunitySimpleCell}
