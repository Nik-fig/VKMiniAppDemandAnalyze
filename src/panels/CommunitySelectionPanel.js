import {useSelector, useDispatch} from 'react-redux';

import {
    Avatar,
    Group,
    Header,
    Panel,
    PanelHeader,
    SimpleCell,
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css';
import {Icon28UsersOutline} from "@vkontakte/icons";

import {MainViewTabs} from '../containers/MainViewTabs'

import {CommunitySimpleCell} from '../components/CommunitySimpleCell/CommunitySimpleCell';

import {setUpModal} from '../redux/slices/modalSlice';

import {COMMUNITY_SELECTION_MODAL_ID} from '../modals/CommunitySelectionModal';

export const COMMUNITY_SELECTION_PANEL_ID = 'CommunitySelectionPanel'

function EmptyCommunitySimpleCell({onClick}) {
    return (
        <SimpleCell
            before={
                <Avatar
                    src={'#'}
                    fallbackIcon={<Icon28UsersOutline/>}
                />
            }
            onClick={onClick}
        >
            Выберите сообщество
        </SimpleCell>
    )
}

export function CommunitySelectionPanel() {
    const dispatch = useDispatch();
    const {selectedCommunityId} = useSelector(state => state.demandQuery);

    const template = (
        selectedCommunityId
            ? <CommunitySimpleCell
                key={selectedCommunityId}
                id={selectedCommunityId}
                onClick={() => dispatch(setUpModal(COMMUNITY_SELECTION_MODAL_ID))}
            />
            : <EmptyCommunitySimpleCell onClick={
                () => dispatch(setUpModal(COMMUNITY_SELECTION_MODAL_ID))
            }/>
    )


    return (
        <Panel id={COMMUNITY_SELECTION_PANEL_ID}>
            <PanelHeader>
                <MainViewTabs/>
            </PanelHeader>
            <Group>
                <Header>Выбранное сообщество</Header>
                {template}
            </Group>
        </Panel>)
}