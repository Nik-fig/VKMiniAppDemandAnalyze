import {useSelector, useDispatch} from 'react-redux';

import {
    Root,
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css';

import {useConstructor} from './utils/hooks/useConstructor'

import {MAIN_VIEW_ID, MainView} from './views/MainView';

import {setUpView} from './redux/slices/viewSlice'
import {fetchUserToken} from './redux/slices/userSlice';


export function App() {
    const dispatch = useDispatch();
    const {activeView} = useSelector(state => state.view);

    useConstructor(() => {
        dispatch(fetchUserToken({
            scope: 'groups'
        }))
        dispatch(setUpView(MAIN_VIEW_ID));
    })


    return (
        <Root activeView={activeView}>
            <MainView id={MAIN_VIEW_ID}/>
        </Root>
    )
}