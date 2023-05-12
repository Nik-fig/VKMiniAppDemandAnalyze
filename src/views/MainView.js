import {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';

import {
    View,
    SplitLayout,
    SplitCol,
    ScreenSpinner,
    ModalRoot
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css';

import {useConstructor} from '../utils/hooks/useConstructor'

import {COMMUNITY_SELECTION_PANEL_ID, CommunitySelectionPanel} from '../panels/CommunitySelectionPanel';
import {COMMUNITY_SELECTION_MODAL_ID, CommunitySelectionModal} from "../modals/CommunitySelectionModal";

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
        </ModalRoot>
    )
}

export function MainView() {
    const dispatch = useDispatch();
    const {activePanel} = useSelector(state => state.panel);
    const [popout, setPopout] = useState(null);

    const {
        accessToken: {
            fetchStatus: {
                loadingStatus,
            }
        }
    } = useSelector(state => state.user);

    useConstructor(() => {
        dispatch(setUpPanel(COMMUNITY_SELECTION_PANEL_ID));
    })

    useEffect(() => {
        switch (loadingStatus) {
            case 'loading':
                setPopout(<ScreenSpinner state='loading'/>);
                break;
            case 'success':
                setPopout(<ScreenSpinner state='done'/>);
                setTimeout(() => setPopout(null), 1000);
                break;
            case 'failed':
                setPopout(<ScreenSpinner state='error'/>);
                setTimeout(() => setPopout(null), 1000);
                break;
        }
    }, [loadingStatus])


    return (
        <SplitLayout
            popout={popout}
            modal={<ViewModalRoot/>}
        >
            <SplitCol>
                <View
                    id={MAIN_VIEW_ID}
                    activePanel={activePanel}
                >
                    <CommunitySelectionPanel id={COMMUNITY_SELECTION_PANEL_ID}/>
                </View>
            </SplitCol>
        </SplitLayout>)
}