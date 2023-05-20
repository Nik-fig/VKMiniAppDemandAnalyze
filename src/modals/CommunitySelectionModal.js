import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
    ModalPage,
    ModalPageHeader,
    PanelSpinner,
    Text,
    IconButton, Tappable,
} from "@vkontakte/vkui";
import {Icon28SwitchOutline} from '@vkontakte/icons';

import {useConstructor} from "../utils/hooks/useConstructor";

import {CommunitySimpleCell} from '../components/CommunitySimpleCell/CommunitySimpleCell';

import {getCommunities} from '../utils/api/vk/services/community'

import {setUpCommunity} from '../redux/slices/demandQuerySlice';
import {setUpModal} from '../redux/slices/modalSlice';
import {setUpProduct} from '../redux/slices/demandQuerySlice';

import {fetchUserToken} from "../redux/slices/userSlice";


export const COMMUNITY_SELECTION_MODAL_ID = 'CommunitySelectionModal'

export function CommunitySelectionModal() {
    const dispatch = useDispatch();

    const [communitiesFetch, setCommunitiesFetch] = useState({
        items: null,
        loadingStatus: 'idle',
        error: null,
    });
    const {
        items: communities,
        loadingStatus: communitiesLoadingStatus,
        error: communitiesError,
    } = communitiesFetch;

    const {
        accessToken: {
            value: accessToken,
            scope: accessTokenScope,
            fetchStatus: {
                loadingStatus: accessTokenLoadingStatus,
                error: accessTokenError,
            },
        },
        userId,
    } = useSelector(state => state.user);


    function getCommunitiesFetch() {
        getCommunities({accessToken: accessToken, userId: userId})
            .then(data => {
                setCommunitiesFetch({
                    items: data.response.items,
                    loadingStatus: 'success',
                    error: null,
                })
            }, error => {
                console.error(error);
                setCommunitiesFetch({
                    items: null,
                    loadingStatus: 'failed',
                    error: error
                })
            })
    }

    useConstructor(() => {
        if (accessToken && accessTokenScope.includes('groups'))
            return;

        dispatch(fetchUserToken({scope: 'groups'}))
    });

    useEffect(() => {
        if (!accessToken || !accessTokenScope.includes('groups'))
            return

        setCommunitiesFetch({
            loadingStatus: 'loading',
            error: null,
            items: null,
        });

        getCommunitiesFetch();

    }, [accessToken]);


    let template;
    let header;
    let modalHeaderAfter;

    switch (accessTokenLoadingStatus) {
        case 'loading':
            header = 'Получаю доступ к сообществам'
            template = (<PanelSpinner size='large'/>);
            break;
        case 'success':
            header = 'Успех'
            template = 'Доступ к сообществам получен';
            break;
        case 'failed':
            header = <Text>{accessTokenError.error_data.error_code}: {accessTokenError.error_type}</Text>
            template = <Text>{accessTokenError.error_data.error_msg}</Text>
            modalHeaderAfter = (
                <IconButton
                    onClick={() => {
                        dispatch(fetchUserToken({scope: 'groups'}))
                    }}
                >
                    <Icon28SwitchOutline/>
                </IconButton>
            )
            break;
    }

    switch (communitiesLoadingStatus) {
        case 'loading':
            header = 'Получаю ваши сообщества';
            template = (<PanelSpinner size='large'/>);
            break;

        case 'success':
            header = 'Ваши администрируемые сообщества';
            const communitiesBlocks = communities.map((value) => {
                return (
                    <Tappable
                        key={value}
                        style={{
                            minWidth: '300px',
                            margin: '5px 0',
                        }}
                    >
                        <CommunitySimpleCell
                            id={value}
                            onClick={() => {
                                dispatch(setUpModal(null));
                                dispatch(setUpCommunity(value));
                                dispatch(setUpProduct(null));
                            }}
                        />
                    </Tappable>
                )
            })

            template = (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {communitiesBlocks}
                </div>
            )
            break;

        case 'failed':
            header = <Text>{communitiesError.error_data.error_code}: {communitiesError.error_type}</Text>
            template = <Text>{communitiesError.error_data.error_msg}</Text>
            modalHeaderAfter = (
                <IconButton
                    onClick={() => {
                        getCommunitiesFetch();
                    }}
                >
                    <Icon28SwitchOutline/>
                </IconButton>
            )
            break;
    }

    return (
        <ModalPage
            id={COMMUNITY_SELECTION_MODAL_ID}
        >
            <ModalPageHeader
                after={modalHeaderAfter}
            >
                {header}
            </ModalPageHeader>
            {template}
        </ModalPage>
    )
}
