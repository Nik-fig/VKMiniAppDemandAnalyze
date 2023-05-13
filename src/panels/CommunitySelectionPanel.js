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

import {CommunitySimpleCell} from '../containers/CommunitySimpleCell/CommunitySimpleCell';

import {setUpModal} from '../redux/slices/modalSlice';

import {COMMUNITY_SELECTION_MODAL_ID} from '../modals/CommunitySelectionModal';

export const COMMUNITY_SELECTION_PANEL_ID = 'CommunitySelectionPanel'

export function CommunitySelectionPanel() {
    const dispatch = useDispatch();
    const {selectedCommunityId} = useSelector(state => state.demandQuery);

    let template;


    if (selectedCommunityId) {
        template = (
            <CommunitySimpleCell
                key={selectedCommunityId}
                id={selectedCommunityId}
                onClick={() => dispatch(setUpModal(COMMUNITY_SELECTION_MODAL_ID))}
            />
        );

    } else {
        template = (
            <SimpleCell
                before={
                    <Avatar
                        src={'#'}
                        fallbackIcon={<Icon28UsersOutline/>}
                    />
                }
                onClick={() => dispatch(setUpModal(COMMUNITY_SELECTION_MODAL_ID))}
            >
                Выберите сообщество
            </SimpleCell>
        )
    }

    return (
        <Panel id={COMMUNITY_SELECTION_PANEL_ID}>
            <PanelHeader>Сообщество</PanelHeader>
            <Group>
                <Header>Выбранное сообщество</Header>
                {template}
            </Group>
        </Panel>)
}