import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {
    Group,
    Header,
    Panel,
    PanelHeader,
    SplitLayout,
    SplitCol,
    PanelSpinner,
    Alert,
} from "@vkontakte/vkui";

import {MainViewTabs} from '../../containers/MainViewTabs';

import {ApiErrorBlock} from '../../components/ApiErrorBlock/ApiErrorBlock';

import {FiltersBlock} from './FiltersBlock';

import {useConstructor} from '../../utils/hooks/useConstructor';

import {fetchCommunityToken} from '../../redux/slices/communitySlice';
import {fetchUserToken} from '../../redux/slices/userSlice';

import {setUpPanel} from '../../redux/slices/panelSlice';

import {COMMUNITY_SELECTION_PANEL_ID} from "../CommunitySelectionPanel";
import {PRODUCT_SELECTION_PANEL_ID} from '../ProductSelectionPanel'

export const CHART_PANEL_ID = 'ChartPanel';


function LoadingBlock({title}) {
    return (
        <div>
            <span>
                {title}
            </span>
            <PanelSpinner size='large'/>
        </div>)
}

export function ChartPanel() {
    const dispatch = useDispatch();
    const [popout, setPopout] = useState(null);

    const {
        selectedProductId, selectedCommunityId,
    } = useSelector(state => state.demandQuery)

    const {
        accessToken: {
            value: communityAccessToken,

            fetchStatus: {
                loadingStatus: communityLoadingStatus, error: communityError,
            }
        }
    } = useSelector(state => state.community)

    const {
        accessToken: {
            value: userAccessToken,
            scope: userAccessTokenScope,
            fetchStatus: {
                loadingStatus: userAccessTokenLoadingStatus,
                error: userAccessTokenError,
            }
        },
    } = useSelector(state => state.user);


    useEffect(() => {
        if (!selectedCommunityId) {
            setPopout(
                <Alert
                    onClose={() => {
                        dispatch(setUpPanel(COMMUNITY_SELECTION_PANEL_ID));
                        setPopout(null);
                    }}
                    header={'Ошибка'}
                    text={'Выберите сообщество'}
                />
            )
            return;
        }
        if (!selectedProductId) {
            setPopout(
                <Alert
                    onClose={() => {
                        dispatch(setUpPanel(PRODUCT_SELECTION_PANEL_ID));
                        setPopout(null);
                    }}
                    header={'Ошибка'}
                    text={'Выберите товар'}
                />
            )
            return;
        }
    }, [])

    useConstructor(() => {
        if (userAccessToken)
            return;

        dispatch(fetchUserToken({scope: ''}))
    })

    useEffect(() => {
        if (!userAccessToken || !selectedCommunityId)
            return;

        dispatch(fetchCommunityToken({
            scope: 'messages',
            groupId: selectedCommunityId,
        }))
    }, [userAccessToken])


    let template;

    switch (userAccessTokenLoadingStatus) {
        case 'loading':
            template = <LoadingBlock title={'Получаю ваш токен доступа'}/>
            break;
        case 'success':
            template = 'Ваш токе доступа получен'
            break;
        case 'failed':
            template = <ApiErrorBlock error={userAccessTokenError}/>
            break;
    }

    switch (communityLoadingStatus) {
        case 'loading':
            template = <LoadingBlock title={'Получаю доступ к сообществу'}/>
            break;
        case 'success':
            template = 'Доступ к сообществу получен'
            break;
        case 'failed':
            template = <ApiErrorBlock error={userAccessTokenError}/>
            break;
    }

    return (
        <Panel id={CHART_PANEL_ID}>
            <PanelHeader>
                <MainViewTabs/>
            </PanelHeader>
            <SplitLayout
                popout={popout}
            >
                <SplitCol
                    maxWidth={'30%'}
                >
                    <FiltersBlock
                        selectedCommunityId={selectedCommunityId}
                        selectedProductId={selectedProductId}
                    />
                </SplitCol>
                <SplitCol>
                    <Group>
                        <Header>График</Header>
                        {template}
                    </Group>
                </SplitCol>
            </SplitLayout>
        </Panel>)
}