import {useDispatch, useSelector} from 'react-redux';

import {
    Tabs,
    TabsItem
} from '@vkontakte/vkui';
import {Icon28MarketOutline} from '@vkontakte/icons';
import {Icon28Users} from '@vkontakte/icons';

import {PRODUCT_SELECTION_PANEL_ID} from '../panels/ProductSelectionPanel';
import {COMMUNITY_SELECTION_PANEL_ID} from '../panels/CommunitySelectionPanel';

import {setUpPanel} from '../redux/slices/panelSlice'

export function MainViewTabs() {
    const dispatch = useDispatch()
    const {activePanel} = useSelector(state => state.panel);

    return (
        <Tabs>
            <TabsItem
                before={
                    <Icon28Users/>
                }
                selected={activePanel === COMMUNITY_SELECTION_PANEL_ID}
                onClick={() => {
                    dispatch(setUpPanel(COMMUNITY_SELECTION_PANEL_ID));
                }}
            >
                Сообщество
            </TabsItem>
            <TabsItem
                before={
                    <Icon28MarketOutline/>
                }
                selected={activePanel === PRODUCT_SELECTION_PANEL_ID}
                onClick={() => {
                    dispatch(setUpPanel(PRODUCT_SELECTION_PANEL_ID));
                }}
            >
                Товар
            </TabsItem>
        </Tabs>
    )
}