import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';

import {
    Group,
    Header,
    Panel,
    PanelHeader,
    SplitCol,
    SplitLayout,
    Alert,
    SimpleCell,
    Placeholder,
    Text,
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css';
import {Icon56MarketOutline} from "@vkontakte/icons";

import {MainViewTabs} from '../containers/MainViewTabs';
import {ProductSelected} from '../components/ProductSelected/ProductSelected';

import {setUpPanel} from '../redux/slices/panelSlice';
import {setUpModal} from '../redux/slices/modalSlice';

import {COMMUNITY_SELECTION_PANEL_ID} from './CommunitySelectionPanel'
import {PRODUCT_SELECTION_MODAL_ID} from '../modals/ProductSelectionModal';

export const PRODUCT_SELECTION_PANEL_ID = 'ProductSelectionPanel';

function EmptyProductSimpleCell({onClick}) {
    return (
        <SimpleCell
            before={
                <Placeholder
                    icon={<Icon56MarketOutline/>}
                    style={{
                        border: '3px dashed #5181B8',
                    }}
                />
            }
            onClick={onClick}
        >
            <Text style={{
                fontSize: '18px',
                fontWeight: '400',
                paddingLeft: '10px',
            }}>
                Выберите товар
            </Text>
        </SimpleCell>
    )
}

export function ProductSelectionPanel() {
    const dispatch = useDispatch();

    const {
        selectedProductId,
        selectedCommunityId
    } = useSelector(state => state.demandQuery)

    const [popout, setPopout] = useState(null);

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
        }
    }, [])

    const template = (
        selectedProductId
            ? <ProductSelected
                key={selectedProductId}
                id={selectedProductId}
                onClick={
                    () => dispatch(setUpModal(PRODUCT_SELECTION_MODAL_ID))
                }
            />
            : <EmptyProductSimpleCell onClick={
                () => dispatch(setUpModal(PRODUCT_SELECTION_MODAL_ID))
            }/>
    )

    return (
        <SplitLayout
            popout={popout}
        >
            <SplitCol>
                <Panel id={PRODUCT_SELECTION_PANEL_ID}>
                    <PanelHeader>
                        <MainViewTabs/>
                    </PanelHeader>
                    <Group>
                        <Header>Выбранный товар</Header>
                        {template}
                    </Group>
                </Panel>
            </SplitCol>
        </SplitLayout>
    )
}