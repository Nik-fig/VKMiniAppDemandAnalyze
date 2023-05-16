import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
    Group,
    ModalPage,
    ModalPageHeader,
    PanelSpinner,
    SplitLayout,
    SplitCol, Text,
} from "@vkontakte/vkui";

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


    useConstructor(() => {
        if (accessTokenScope.indexOf('groups') !== -1 && accessToken)
            return;
        dispatch(fetchUserToken({
            scope: 'groups'
        }))
    });

    let template;
    let header;

    switch (accessTokenLoadingStatus) {
        case 'loading':
            header = 'Получаю доступ к сообществам'
            template = (<PanelSpinner size='large'/>);
            break;
        case 'success':
            header='Успех'
            template = 'Доступ к сообществам получен';
            break;
        case 'failed':
            header = <Text>{accessTokenError.error_data.error_code}: {accessTokenError.error_type}</Text>
            template = <Text>{accessTokenError.error_data.error_msg}</Text>
            break;
    }

    useEffect(() => {
        if (!accessToken)
            return

        setCommunitiesFetch({
            ...communitiesFetch, loadingStatus: 'loading',
        });

        getCommunities({accessToken: accessToken, userId: userId})
            .then(data => {
                setCommunitiesFetch({
                    ...communitiesFetch, items: data.response.items, loadingStatus: 'success',
                })
            }, error => {
                console.error(error);
                setCommunitiesFetch({
                    ...communitiesFetch, loadingStatus: 'failed', error: error
                })
            })
    }, [accessToken]);

    switch (communitiesLoadingStatus) {
        case 'loading':
            header = 'Получаю ваши сообщества';
            template = (<PanelSpinner size='large'/>);
            break;

        case 'success':
            header = 'Ваши администрируемые сообщества';
            template = communities.map((value, index) => {
                return (
                    <CommunitySimpleCell
                        key={value}
                        id={value}
                        onClick={() => {
                            dispatch(setUpModal(null));
                            dispatch(setUpCommunity(value));
                            dispatch(setUpProduct(null));
                        }}
                    />
                )
            })
            break;

        case 'failed':
            header = <Text>{communitiesError.error_data.error_code}: {communitiesError.error_type}</Text>
            template = <Text>{communitiesError.error_data.error_msg}</Text>
            break;
    }

    return (
        <SplitLayout>
            <SplitCol>
                <ModalPage
                    id={COMMUNITY_SELECTION_MODAL_ID}
                >
                    <ModalPageHeader>{header}</ModalPageHeader>
                    <Group style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        {template}
                    </Group>
                </ModalPage>
            </SplitCol>
        </SplitLayout>
    )
}
