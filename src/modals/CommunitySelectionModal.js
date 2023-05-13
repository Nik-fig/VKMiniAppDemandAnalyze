import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
    Group,
    ModalPage,
    ModalPageHeader,
    PanelSpinner,
    SplitLayout,
    SplitCol,
    Alert,
} from "@vkontakte/vkui";

import {useConstructor} from "../utils/hooks/useConstructor";

import {CommunitySimpleCell} from '../containers/CommunitySimpleCell/CommunitySimpleCell';

import {getCommunities} from '../utils/API/VK/getCommunities'

import {setUpCommunity} from '../redux/slices/demandQuerySlice';
import {setUpModal} from '../redux/slices/modalSlice'
import {fetchUserToken} from "../redux/slices/userSlice";


export const COMMUNITY_SELECTION_MODAL_ID = 'CommunitySelectionModal'

export function CommunitySelectionModal() {
    const dispatch = useDispatch();

    const [popout, setPopout] = useState(null);

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
            template = 'Токен получен';
            break;
        case 'failed':
            if (popout)
                break;

            setPopout(
                <Alert
                    onClose={() => setPopout(null)}
                    header={accessTokenError.error_type}
                    text={
                        `Code ${accessTokenError.error_data.error_type}: ${accessTokenError.error_data.error_msg}`
                    }
                />
            );
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
                        }}/>
                )
            })
            break;

        case 'failed':
            if (popout)
                break;
            setPopout(
                <Alert
                    onClose={() => setPopout(null)}
                    header={communitiesError.error_type}
                    text={
                        `Code ${communitiesError.error_data.error_type}: ${communitiesError.error_data.error_msg}`
                    }
                />
            )
            break;
    }

    return (
        <SplitLayout
            popout={popout}
        >
            <SplitCol>
                <ModalPage
                    id={COMMUNITY_SELECTION_MODAL_ID}
                >
                    <ModalPageHeader>{header}</ModalPageHeader>
                    <Group>
                        {template}
                    </Group>
                </ModalPage>
            </SplitCol>
        </SplitLayout>
    )
}
