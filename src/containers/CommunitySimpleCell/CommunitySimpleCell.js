import {useState} from 'react'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types'

import {
    Avatar,
    PanelSpinner,
    Div,
    Tappable,
} from "@vkontakte/vkui";
import {Icon28UsersOutline} from "@vkontakte/icons";
import {Icon28CancelCircleFillRed} from '@vkontakte/icons';

import styles from './CommunitySimpleCell.module.css'

import {useConstructor} from '../../utils/hooks/useConstructor'

import {getCommunityById} from '../../utils/API/VK/getCommunityById'

function CommunitySuccessFetch(props) {
    const {name, onClick, description, photo} = props;
    return (
        <Tappable>
            <Div
                className={styles.communitySuccess}
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
            </Div>
        </Tappable>
    )
}

function CommunityLoadingFetch() {
    return (
        <PanelSpinner size='large'/>
    )
}

function CommunityFailedFetch(props) {
    const {error} = props;
    return (
        <Div className={styles.communityFailed}>
            <Avatar
                src={'#'}
                fallbackIcon={<Icon28CancelCircleFillRed/>}
                className={styles.errorImg}
            />
            <div className={styles.errorType}>
                {error.error_type}
            </div>
            <div className={styles.errorDesc}>
                {error.error_data.error_msg}
            </div>
        </Div>
    )
}

function CommunitySimpleCell(props) {
    const {id, onClick} = props;

    const {
        accessToken: {
            value: accessToken
        }
    } = useSelector(state => state.user)

    const [communityFetch, setCommunityFetch] = useState({
        item: {
            name: null,
            photo_50: null,
            activity: null,
            members_count: null,
        },
        loadingStatus: 'idle',
        error: null,
    })

    const {
        loadingStatus, error,
    } = communityFetch

    const {
        name,
        photo_50: photo50,
        activity,
        members_count: membersCount,
    } = communityFetch.item;

    useConstructor(() => {
        setCommunityFetch({
            ...communityFetch, loadingStatus: 'loading', error: null,
        })

        getCommunityById({
                id: id,
                fields: ['activity', 'members_count'],
                accessToken: accessToken
            }
        )
            .then(data => {
                const item = data.response.length ? data.response[0] : null;
                setCommunityFetch({
                    ...communityFetch, item: item, loadingStatus: 'success', error: null,
                })
            }, error => {
                console.error(error);
                setCommunityFetch({
                    ...communityFetch, loadingStatus: 'failed', error: error
                })
            })
    })

    let template;

    switch (loadingStatus) {
        case 'loading':
            template = (<CommunityLoadingFetch/>)
            break;
        case 'success':
            const membersCountTemplate =
                Number.isInteger(membersCount)
                    ? (membersCount).toLocaleString('ru') + ' участников'
                    : null;

            const description = `${activity}, ${membersCountTemplate}`
            template = (
                <CommunitySuccessFetch
                    name={name}
                    onClick={onClick}
                    description={description}
                    photo={photo50}
                />
            )
            break;
        case 'failed':
            template = (
                <CommunityFailedFetch error={error}/>
            )
            break;
    }

    return (
        <>
            {template}
        </>
    )
}

CommunitySimpleCell.propTypes = {
    id: PropTypes.number.isRequired,
    onClick: PropTypes.func
}

export {CommunitySimpleCell}