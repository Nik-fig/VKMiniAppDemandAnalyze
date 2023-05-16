import {useSelector, useDispatch} from 'react-redux';

import {
    View,
    SplitLayout,
    SplitCol,
    ModalRoot
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css';

import {useConstructor} from '../utils/hooks/useConstructor'

import {COMMUNITY_SELECTION_PANEL_ID, CommunitySelectionPanel} from '../panels/CommunitySelectionPanel';
import {COMMUNITY_SELECTION_MODAL_ID, CommunitySelectionModal} from "../modals/CommunitySelectionModal";
import {PRODUCT_SELECTION_PANEL_ID, ProductSelectionPanel} from '../panels/ProductSelectionPanel';
import {PRODUCT_SELECTION_MODAL_ID, ProductSelectionModal} from '../modals/ProductSelectionModal'

import {setUpModal} from '../redux/slices/modalSlice';
import {setUpPanel} from "../redux/slices/panelSlice";

export const MAIN_VIEW_ID = 'MainView'

function ViewModalRoot() {
    const dispatch = useDispatch();
    const {activeModal} = useSelector(state => state.modal);

    return (
        <ModalRoot
            activeModal={activeModal}
            onClose={() => dispatch(setUpModal(null))}
        >
            <CommunitySelectionModal id={COMMUNITY_SELECTION_MODAL_ID}/>
            <ProductSelectionModal id={PRODUCT_SELECTION_MODAL_ID}/>
        </ModalRoot>
    )
}

export function MainView() {
    const dispatch = useDispatch();
    const {activePanel} = useSelector(state => state.panel);

    useConstructor(() => {
        dispatch(setUpPanel(COMMUNITY_SELECTION_PANEL_ID));
    })

    return (
        <SplitLayout
            modal={<ViewModalRoot/>}
        >
            <SplitCol>
                <View
                    id={MAIN_VIEW_ID}
                    activePanel={activePanel}
                >
                    <CommunitySelectionPanel id={COMMUNITY_SELECTION_PANEL_ID}/>
                    <ProductSelectionPanel id={PRODUCT_SELECTION_PANEL_ID}/>
                </View>
            </SplitCol>
        </SplitLayout>)
}