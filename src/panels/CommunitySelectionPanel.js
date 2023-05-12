import {useSelector, useDispatch} from 'react-redux';

import {
    Group,
    Header,
    Panel,
    PanelHeader,
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css';

import {CommunitySimpleCell} from '../components/CommunitySimpleCell';

import {setUpModal} from '../redux/slices/modalSlice';

import {COMMUNITY_SELECTION_MODAL_ID} from '../modals/CommunitySelectionModal';

export const COMMUNITY_SELECTION_PANEL_ID = 'CommunitySelectionPanel'

export function CommunitySelectionPanel() {
    const dispatch = useDispatch();
    const {selectedCommunity} = useSelector(state => state.demandQuery);

    return (
        <Panel id={COMMUNITY_SELECTION_PANEL_ID}>
            <PanelHeader>Сообщество</PanelHeader>
            <Group>
                <Header>Выбранное сообщество</Header>
                <CommunitySimpleCell
                    id={selectedCommunity.id}
                    name={selectedCommunity.name}
                    photo={selectedCommunity.photo}
                    onClick={() => dispatch(setUpModal(COMMUNITY_SELECTION_MODAL_ID))}
                />
            </Group>
        </Panel>
    )
}