import {useDispatch} from 'react-redux'

import {
    Avatar,
    Group,
    Header,
    Placeholder,
    Separator,
    Tappable
} from "@vkontakte/vkui";
import {Icon28UsersOutline, Icon56MarketOutline} from "@vkontakte/icons";

import {CommunitySelectedSmall} from '../../components/CommunitySelectedSmall/CommunitySelectedSmall'
import {ProductSelectedSmall} from '../../components/ProductSelectedSmall/ProductSelectedSmall'

import {setUpPanel} from '../../redux/slices/panelSlice';

import {COMMUNITY_SELECTION_PANEL_ID} from "../CommunitySelectionPanel";
import {PRODUCT_SELECTION_PANEL_ID} from '../ProductSelectionPanel'

function CommunityBlock({selectedCommunityId}) {
    const dispatch = useDispatch();

    return (
        <Tappable>
            <div
                onClick={() => dispatch(setUpPanel(COMMUNITY_SELECTION_PANEL_ID))}
            >
                {
                    selectedCommunityId
                        ? (
                            <>
                                <CommunitySelectedSmall id={selectedCommunityId}/>
                            </>
                        )
                        : (
                            <Avatar
                                src={'#'}
                                fallbackIcon={<Icon28UsersOutline/>}
                            />
                        )
                }
            </div>
        </Tappable>
    )
}

function ProductBlock({selectedProductId}) {
    const dispatch = useDispatch();

    return (
        <Tappable>
            <div
                style={{
                    maxWidth: '60%',
                    margin: 'auto',
                }}
                onClick={() => dispatch(setUpPanel(PRODUCT_SELECTION_PANEL_ID))}
            >
                {
                    selectedProductId
                        ? <ProductSelectedSmall id={selectedProductId}/>
                        : <Placeholder
                            icon={<Icon56MarketOutline/>}
                            style={{
                                border: '3px dashed #5181B8',
                            }}
                        />
                }
            </div>
        </Tappable>
    )
}

export function FiltersBlock({selectedProductId, selectedCommunityId}) {
    return (
        <Group>
            <Header>Фильтры</Header>
            <CommunityBlock selectedCommunityId={selectedCommunityId}/>
            <Separator/>
            <ProductBlock selectedProductId={selectedProductId}/>
        </Group>
    )
}