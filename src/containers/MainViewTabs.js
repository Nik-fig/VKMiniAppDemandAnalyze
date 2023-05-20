import {useDispatch, useSelector} from 'react-redux';

import {
    Tabs,
    TabsItem
} from '@vkontakte/vkui';
import {
    Icon28MarketOutline,
    Icon28Users,
    Icon28StatisticsOutline
} from '@vkontakte/icons';

import {PRODUCT_SELECTION_PANEL_ID} from '../panels/ProductSelectionPanel';
import {COMMUNITY_SELECTION_PANEL_ID} from '../panels/CommunitySelectionPanel';
import {CHART_PANEL_ID} from '../panels/ChartPanel/ChartPanel';

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
            <TabsItem
                before={
                    <Icon28StatisticsOutline/>
                }
                selected={activePanel === CHART_PANEL_ID}
                onClick={() => {
                    dispatch(setUpPanel(CHART_PANEL_ID));
                }}
            >
                График
            </TabsItem>
        </Tabs>
    )
}