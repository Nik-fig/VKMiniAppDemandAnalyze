import {useDispatch, useSelector} from 'react-redux'

import {
    Group,
    Header,
    Panel,
    PanelHeader,
    Div,
    SplitLayout,
    SplitCol,
    Placeholder,
    Avatar,
    Separator
} from "@vkontakte/vkui";
import {Icon28UsersOutline, Icon56MarketOutline} from "@vkontakte/icons";

import {MainViewTabs} from '../containers/MainViewTabs'

import {Chart} from '../components/Chart/Chart'
import {ProductSimpleCell} from '../components/ProductSimpleCell/ProductSimpleCell'
import {CommunityAvatar} from "../components/CommunityAvatar/CommunityAvatar";

export const CHART_PANEL_ID = 'ChartPanel';

export function ChartPanel() {
    const {
        selectedProductId,
        selectedCommunityId,
    } = useSelector(state => state.demandQuery)

    return (
        <Panel id={CHART_PANEL_ID}>
            <PanelHeader>
                <MainViewTabs/>
            </PanelHeader>
            <SplitLayout>
                <SplitCol
                    maxWidth={'30%'}
                >
                    <Group>
                        <Header>Фильтры</Header>
                        <div
                            style={{
                                marginBottom: '20px'
                            }}
                        >
                            {
                                selectedCommunityId
                                    ? (
                                        <CommunityAvatar id={selectedCommunityId}/>
                                    )
                                    : (
                                        <Avatar
                                            src={'#'}
                                            fallbackIcon={<Icon28UsersOutline/>}
                                        />
                                    )
                            }
                        </div>
                        <Separator/>
                        <div
                            style={{
                                maxWidth: '60%',
                                margin: 'auto',
                                marginTop: '20px'
                            }}
                        >
                            {
                                selectedProductId
                                    ? (
                                        <ProductSimpleCell id={selectedProductId}/>
                                    )
                                    : (
                                        <Placeholder
                                            icon={<Icon56MarketOutline/>}
                                            style={{
                                                border: '3px dashed #5181B8',
                                            }}
                                        />
                                    )
                            }
                        </div>
                    </Group>
                </SplitCol>
                <SplitCol>
                    <Group>
                        <Header>График</Header>
                        <div>
                            <Chart/>
                        </div>
                    </Group>
                </SplitCol>
            </SplitLayout>


        </Panel>
    )
}